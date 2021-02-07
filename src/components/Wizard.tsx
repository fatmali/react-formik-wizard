import React from 'react'
import Stepper from './Stepper'
import Steps from './Steps'
import Step from './Step'
import { Form, Formik } from 'formik'
// eslint-disable-next-line no-unused-vars
import { IWizard as WizardType } from '../types/wizard.types'
import { transformAll } from '@demvsystems/yup-ast'

interface WizardProps {
  wizard: WizardType
  onComplete: (values: any) => any
  customFields?: any
}
export default function App(props: WizardProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [completedSteps] = React.useState({})
  const [validations, setValidations] = React.useState()
  const { wizard } = props

  React.useEffect(() => {
    if (wizard.validation) {
      const serializedValidations = transformAll(wizard.validation)
      setValidations(serializedValidations)
    }
  }, [wizard.validation])

  const getInitialValues = () => {
    const initialValues = {}
    wizard.steps.forEach((step) => {
      return step.sections.forEach((section) => {
        section.fields.forEach((field) => {
          initialValues[field.id] = field.initialValue || ''
        })
      })
    })
    return initialValues
  }
  return (
    <div>
      <Stepper
        currentStep={currentStep}
        steps={wizard.steps}
        completedSteps={completedSteps}
        setCurrentStep={setCurrentStep}
      />
      <Formik
        initialValues={getInitialValues()}
        onSubmit={(values) => props.onComplete(values)}
        validationSchema={validations}
      >
        <Form>
          <div className='mb-4'>
            <Steps currentStep={currentStep}>
              {wizard.steps.map((step, i) => (
                <Step step={step} key={i} customFields={props.customFields} />
              ))}
            </Steps>
          </div>
          <div className='is-flex is-justify-content-flex-end'>
            {currentStep !== 0 && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentStep(currentStep === 0 ? 0 : currentStep - 1)
                }}
                className='button mr-2'
              >
                Previous
              </button>
            )}
            {currentStep === wizard.steps.length - 1 ? (
              <button type='submit' className='button'>
                Save
              </button>
            ) : (
              <button
                className='button'
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentStep(
                    currentStep === wizard.steps.length - 1
                      ? 0
                      : currentStep + 1
                  )
                }}
              >
                Next
              </button>
            )}
          </div>
        </Form>
      </Formik>
    </div>
  )
}
