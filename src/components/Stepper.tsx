/* eslint-disable no-unused-vars */
import React from 'react'
import { IStep } from '../types/wizard.types'

interface StepperProps {
  steps: IStep[]
  currentStep: number
  completedSteps: any
  setCurrentStep: (index: number) => void
}

const Stepper = ({ steps, currentStep, setCurrentStep }: StepperProps) => {
  const isCurrentStep = (stepIndex: number) => currentStep === stepIndex

  return (
    <div className='tabs'>
      <ul>
        {steps.map((step, i) => (
          <li key={step.name} className={isCurrentStep(i) ? 'is-active' : ''}>
            <a onClick={() => setCurrentStep(i)}>{step.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Stepper
