import React from 'react'
import { Step } from '../types/wizard.types'
import FieldRenderer from './FieldRenderer'

interface StepProps {
  step: Step
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
