import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import Wizard from 'react-formik-wizard'
import 'react-formik-wizard/dist/index.css'
import 'react-day-picker/lib/style.css'

const CustomDateInput = ({ form, field }: any) => {
  return (
    <div>
      <DayPickerInput onDayChange={(e) => form.setFieldValue(field.name, e)} />
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
                id: 'highschool_name',
                type: 'text',
                required: true
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
            fields: [
              {
                label: 'Do you have any current conditions?',
                id: 'current_conditions_available',
                type: 'select',
                options: [
                  { value: '1', label: 'Yes' },
                  { value: '2', label: 'No' }
                ],
                required: true
              },
              {
                label: 'If yes, list all conditions you have',
                id: 'all_conditions',
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
                  ['yup.required', 'first name is required'],
                  ['yup.max', '5', 'only 5 chars allowed']
                ]
              }
            ]
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
