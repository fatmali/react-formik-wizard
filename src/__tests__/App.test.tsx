import { render, screen } from '@testing-library/react'
import React from 'react'
import Wizard from '../components/Wizard'
// eslint-disable-next-line no-unused-vars
import { Wizard as WizardType } from '../types/wizard.types'

const wizard = {
  name: 'JSON Wizard',
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

const renderWizard = (schema: WizardType) =>
  render(<Wizard wizard={schema} onComplete={() => null} />)

it('renders without crashing', () => {
  renderWizard(wizard)
})

it('renders <input/> field as specified', () => {
  const wizard: WizardType = {
    name: 'JSON Wizard',
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
              }
            ]
          }
        ]
      }
    ]
  }
  renderWizard(wizard)
  screen.getByText('First Name')
  screen.getByLabelText('First Name')
})

it('renders <select/> fields as specified', () => {
  const wizard: WizardType = {
    name: 'JSON Wizard',
    steps: [
      {
        name: 'Personal Info',
        id: 'personal_info',
        sections: [
          {
            name: 'Biodata',
            fields: [
              {
                label: 'Gender',
                id: 'personal_info.gender',
                type: 'select',
                options: [
                  { label: 'Male', id: 'm' },
                  { label: 'Female', id: 'f' }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
  renderWizard(wizard)
  screen.getByText('Gender')
  screen.getByLabelText('Gender')
})

it('renders <combobox/> as specified', () => {})

it('renders date field as specified', () => {
  const wizard: WizardType = {
    name: 'JSON Wizard',
    steps: [
      {
        name: 'Personal Info',
        id: 'personal_info',
        sections: [
          {
            name: 'Biodata',
            fields: [
              {
                label: 'DOB',
                id: 'personal_info.dob',
                type: 'date'
              }
            ]
          }
        ]
      }
    ]
  }
  renderWizard(wizard)
  screen.getByText('DOB')
})

it('validates and displays errors when form schema is incorrect', () => {})

it('next and previous buttons work correctly', () => {})

it('stepper buttons work correctly', () => {})

it('validations are parsed and work correctly', () => {})

it('displays errors when the validations schema is incorrect', () => {})

it('successfully calls onComplete function', () => {})
