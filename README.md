# 🧙 React Formik Wizard

> A simple opinionated library for creating wizards with React using JSON

[![NPM](https://img.shields.io/npm/v/react-formik-wizard.svg)](https://www.npmjs.com/package/react-formik-wizard) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Intro

Building forms is hectic. Building wizards, even more so! I built this library to enable me to create quick wizards and forms using plain json for my own use. Having a form defined in a structure like JSON has a lot of advantages, to name a few:

1. Lose coupling between your components and your forms, you can have your forms stored as json anywhere in your architecture
2. Easy to build and deploy tools that would help in form creation

## Install

```bash
npm install --save react-formik-wizard
```

## Usage

```tsx
import React from 'react'
import Wizard from 'react-formik-wizard'

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
                required: true
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
        name: 'Medical',
        id: 'medical',
        sections: [
          {
            name: 'Current conditions',
            fields: [
              {
                label: 'If yes, list all conditions you have',
                id: 'all_conditions',
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
    validations: {}
  }

  const onComplete = (values: any) => {
    console.log(values)
  }

  return <Wizard wizard={wizard} onComplete={onComplete} />
}

export default App
```

## License

MIT © [fatmali](https://github.com/fatmali)
