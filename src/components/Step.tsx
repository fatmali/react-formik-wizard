import React from 'react'
// eslint-disable-next-line no-unused-vars
import { Step as IStep } from '../types/wizard.types'
import FieldRenderer from './FieldRenderer'

interface StepProps {
  step: IStep
}

const Step = ({ step }: StepProps) => {
  return (
    <div>
      <h2>{step.name}</h2>
      <div>
        {step.sections.map((section) => {
          return (
            <div key={step.id}>
              <h3>{section.name}</h3>
              {section.fields.map((field) => (
                <FieldRenderer field={field} step={step} key={field.id} />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Step
