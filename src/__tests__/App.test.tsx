import { render } from '@testing-library/react'
import React from 'react'
import Wizard from '../components/Wizard'

const wizard = {
  name: 'JSON Wizard',
  settings: {
    disableNextUntilValid: true,
    disableSubmitUntilValid: true,
    useSections: true
  },
  steps: [
    {
      name: 'Personal Info',
      id: 'personal_info',
      sections: [
        {
          name: 'Biodata',
          fields: [
            {
              label: 'First Name',
              id: 'personal_info.first_name',
              type: 'text'
            },
            {
              label: 'Last Name',
              id: 'personal_info.last_name',
              type: 'text',
              required: true
            },
            {
              label: 'Date of Birth',
              id: 'personal_info.dob',
              type: 'date',
              required: true
            }
          ]
        }
      ]
    },
    {
      name: 'Education',
      id: 'education',
      sections: [
        {
          name: 'High School',
          fields: [
            {
              label: 'Name',
              id: 'education.highschool_name',
              type: 'text',
              required: true
            },
            {
              label: 'GPA',
              id: 'education.highschool_gpa',
              type: 'number',
              required: true
            }
          ]
        }
      ]
    },
    {
      name: 'Medical',
      id: 'medical',
      sections: [
        {
          name: 'Current conditions',
          fields: [
            {
              label: 'Do you have any current conditions?',
              id: 'education.current_conditions_available',
              type: 'select',
              options: [
                { id: '1', label: 'Yes' },
                { id: '2', label: 'No' }
              ],
              required: true
            },
            {
              label: 'If yes, list all conditions you have',
              id: 'education.all_conditions',
              type: 'combobox',
              options: [
                { id: '1', label: 'Diabetes' },
                { id: '2', label: 'HBP' }
              ],
              required: true
            }
          ]
        }
      ]
    }
  ],
  validation: [
    ['yup.object'],
    [
      'yup.shape',
      {
        personal_info: [
          ['yup.object'],
          [
            'yup.shape',
            {
              first_name: [
                ['yup.string'],
                ['yup.required', 'first name is required']
              ]
            }
          ]
        ]
      }
    ]
  ]
}

it('renders without crashing', () => {
  render(<Wizard wizard={wizard} onComplete={() => null} />)
})
