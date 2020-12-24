/* eslint-disable no-unused-vars */
import React from 'react'
import { Step } from '../types/wizard.types'

interface StepperProps {
  steps: Step[]
  currentStep: number
  completedSteps: any
  setCurrentStep: (index: number) => void
}

const Stepper = ({
  steps,
  currentStep,
  completedSteps,
  setCurrentStep
}: StepperProps) => {
  const isCurrentStep = (stepIndex: number) => currentStep === stepIndex

  const isCompletedStep = (stepIndex: number) => completedSteps[stepIndex]

  const toggleBackgroundColor = (stepIndex: number) => {
    if (isCompletedStep(stepIndex)) {
      return 'green'
    }
    if (isCurrentStep(stepIndex) || currentStep > stepIndex) {
      return 'black'
    }
    return 'lightgrey'
  }

  return (
    <div style={{ display: 'flex', height: '40px' }}>
      {steps.map((step, i) => (
        <div key={step.name} style={{ display: 'flex', alignItems: 'center' }}>
          {!!i && (
            <div
              style={{
                width: '120px',
                height: '1px',
                borderRight: 0,
                borderLeft: 0,
                backgroundColor: toggleBackgroundColor(i),
                transition: '0.3s linear background-color'
              }}
            />
          )}
          <button
            style={{
              borderRadius: '50%',
              backgroundColor:
                isCurrentStep(i) || currentStep > i ? 'black' : 'white',
              width: isCurrentStep(i) ? '60px' : '40px',
              height: isCurrentStep(i) ? '60px' : '40px',
              borderWidth: isCurrentStep(i) ? '3px' : '1px',
              borderColor: 'white',
              outline: 'none',
              color: isCurrentStep(i) || currentStep > i ? 'white' : 'black',
              transition: '.1s ease height'
            }}
            onClick={() => setCurrentStep(i)}
          >
            {i + 1}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Stepper
