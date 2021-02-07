import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import Wizard from 'react-formik-wizard'
import 'react-formik-wizard/dist/index.css'
import 'react-day-picker/lib/style.css'

const CustomDateInput = ({ form, field }: any) => {
  return (
    <div>
      <DayPickerInput
        onDayChange={(e) => form.setFieldValue(field.name, e)}
        value={field.value}
      />
    </div>
  )
}

const App = () => {
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
            id: 'biodata',
            fields: [
              {
                label: 'First Name',
                id: 'first_name',
                type: 'text',
                initialValue: 'Zeinab'
              },
              {
                label: 'Last Name',
                id: 'last_name',
                type: 'text',
                required: true
              },
              {
                label: 'Date of Birth',
                id: 'dob',
                type: 'date',
                initialValue: '2020-01-01',
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
            id: 'education',
            fields: [
              {
                label: 'Highest level of education',
                id: 'highest_education',
                type: 'select',
                options: [
                  {
                    label: 'University',
                    value: 'university'
                  },
                  {
                    label: 'High school',
                    value: 'highschool'
                  }
                ]
              },
              {
                label: 'Name',
                id: 'highschool_name',
                type: 'text',
                required: true,
                show: {
                  when: 'highest_education',
                  is: 'highschool'
                }
              },
              {
                label: 'GPA',
                id: 'highschool_gpa',
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
            id: 'current_conditions',
            fields: [
              {
                label: 'Do you have any current conditions?',
                id: 'current_conditions_available',
                type: 'select',
                options: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ],
                required: true
              },
              {
                label: 'If yes, list all conditions you have',
                id: 'all_conditions',
                type: 'select',
                options: [
                  { value: '1', label: 'Diabetes' },
                  { value: '2', label: 'HBP' }
                ],
                required: true,
                show: {
                  when: 'current_conditions_available',
                  is: 'yes'
                }
              },
              {
                label: 'Glucose reading',
                id: 'glucose',
                type: 'number',
                required: true,
                show: {
                  when: 'all_conditions',
                  is: '1'
                }
              },
              {
                label: 'Blood pressure reading',
                id: 'bp',
                type: 'number',
                required: true,
                show: {
                  when: 'glucose',
                  gte: '7'
                }
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
          first_name: [
            ['yup.string'],
            ['yup.required', 'first name is required'],
            ['yup.max', '5', 'only 5 chars allowed']
          ]
        }
      ]
    ]
  }

  const onComplete = (values: any) => {
    console.log(values)
  }

  return (
    <Wizard
      wizard={wizard}
      onComplete={onComplete}
      customFields={{
        date: {
          component: CustomDateInput
        }
      }}
    />
  )
}

export default App
