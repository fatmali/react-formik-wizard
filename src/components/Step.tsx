import React from 'react'
// eslint-disable-next-line no-unused-vars
import { IStep } from '../types/wizard.types'
import FieldRenderer from './FieldRenderer'

interface StepProps {
  step: IStep
  customFields: any
}

const Step = ({ step, customFields }: StepProps) => {
  return (
    <div>
      {step.sections.map((section) => {
        return (
          <div key={step.id} className='panel'>
            <p className='panel-heading'>{section.name}</p>
            <div className='p-2'>
              {section.fields.map((field) => (
                <FieldRenderer
                  field={field}
                  step={step}
                  section={section}
                  key={field.id}
                  customFields={customFields}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Step
