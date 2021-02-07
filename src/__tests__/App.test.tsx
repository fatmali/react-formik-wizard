import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import Wizard from '../components/Wizard'
// eslint-disable-next-line no-unused-vars
import { IWizard } from '../types/wizard.types'

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
                { value: '1', label: 'Yes' },
                { value: '2', label: 'No' }
              ],
              required: true
            },
            {
              label: 'If yes, list all conditions you have',
              id: 'education.all_conditions',
              type: 'combobox',
              options: [
                { value: '1', label: 'Diabetes' },
                { value: '2', label: 'HBP' }
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

const renderWizard = (schema: IWizard) =>
  render(<Wizard wizard={schema} onComplete={() => null} />)

it('renders without crashing', () => {
  renderWizard(wizard)
})

it('renders <input/> field as specified', () => {
  const wizard: IWizard = {
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
  const wizard: IWizard = {
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
                  { label: 'Male', value: 'm' },
                  { label: 'Female', value: 'f' }
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
  const select = screen.getByLabelText('Gender')
  fireEvent.change(select, {
    target: {
      value: 'm'
    }
  })
})

it('renders <combobox/> as specified', () => {})

it('renders date field as specified', () => {
  const wizard: IWizard = {
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

it('next and previous buttons work correctly', () => {
  const wizard: IWizard = {
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
      },
      {
        name: 'Educational Info',
        id: 'educational_info',
        sections: [
          {
            name: 'Education History',
            fields: [
              {
                label: 'University',
                id: 'educational_history.university',
                type: 'text'
              }
            ]
          }
        ]
      },
      {
        name: 'Family Info',
        id: 'family_info',
        sections: [
          {
            name: 'Family History',
            fields: [
              {
                label: 'Surname',
                id: 'family_history.surname',
                type: 'text'
              }
            ]
          }
        ]
      }
    ]
  }
  renderWizard(wizard)
  const nextButton = screen.queryByText(/next/i)
  const prevButton = screen.queryByText(/previous/i)
  expect(nextButton).not.toBeNull()
  expect(prevButton).toBeNull()
  expect(screen.queryByText(/educational info/i)).toBeNull()
  expect(screen.queryByText(/personal info/i)).not.toBeNull()
  nextButton && fireEvent.click(nextButton)
  expect(screen.queryByText(/next/i)).not.toBeNull()
  expect(screen.queryByText(/previous/i)).not.toBeNull()
  expect(screen.queryByText(/educational info/i)).not.toBeNull()
  expect(screen.queryByText(/personal info/i)).toBeNull()
  nextButton && fireEvent.click(nextButton)
  expect(screen.queryByText(/next/i)).toBeNull()
  expect(screen.queryByText(/previous/i)).not.toBeNull()
  expect(screen.queryByText(/save/i)).not.toBeNull()
  expect(screen.queryByText(/family history/i)).not.toBeNull()
  expect(screen.queryByText(/educational info/i)).toBeNull()
})

it('stepper buttons work correctly', () => {
  const wizard: IWizard = {
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
      },
      {
        name: 'Educational Info',
        id: 'educational_info',
        sections: [
          {
            name: 'Education History',
            fields: [
              {
                label: 'University',
                id: 'educational_history.university',
                type: 'text'
              }
            ]
          }
        ]
      },
      {
        name: 'Family Info',
        id: 'family_info',
        sections: [
          {
            name: 'Family History',
            fields: [
              {
                label: 'Surname',
                id: 'family_history.surname',
                type: 'text'
              }
            ]
          }
        ]
      }
    ]
  }
  renderWizard(wizard)
  const stepperButton1 = screen.queryByText('1')
  const stepperButton2 = screen.queryByText('2')
  const stepperButton3 = screen.queryByText('3')
  expect(stepperButton1).not.toBeNull()
  expect(stepperButton2).not.toBeNull()
  expect(stepperButton3).not.toBeNull()
  expect(screen.queryByText(/educational info/i)).toBeNull()
  expect(screen.queryByText(/personal info/i)).not.toBeNull()
  stepperButton2 && fireEvent.click(stepperButton2)
  expect(screen.queryByText(/next/i)).not.toBeNull()
  expect(screen.queryByText(/previous/i)).not.toBeNull()
  expect(screen.queryByText(/educational info/i)).not.toBeNull()
  expect(screen.queryByText(/personal info/i)).toBeNull()
  stepperButton3 && fireEvent.click(stepperButton3)
  expect(screen.queryByText(/next/i)).toBeNull()
  expect(screen.queryByText(/previous/i)).not.toBeNull()
  expect(screen.queryByText(/save/i)).not.toBeNull()
  expect(screen.queryByText(/family history/i)).not.toBeNull()
  expect(screen.queryByText(/educational info/i)).toBeNull()
})

it('validations are parsed and work correctly', () => {})

it('displays errors when the validations schema is incorrect', () => {})

it('successfully calls onComplete function', () => {})
