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
        initialValues[step.id] = {}
        section.fields.forEach((field) => {
          initialValues[step.id][field.id] = field.initialValue || ''
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
          <Steps currentStep={currentStep}>
            {wizard.steps.map((step, i) => (
              <Step step={step} key={i} />
            ))}
          </Steps>
          {currentStep !== 0 && (
            <button
              onClick={() =>
                setCurrentStep(currentStep === 0 ? 0 : currentStep - 1)
              }
              className='button'
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
              onClick={() =>
                setCurrentStep(
                  currentStep === wizard.steps.length - 1 ? 0 : currentStep + 1
                )
              }
            >
              Next
            </button>
          )}
        </Form>
      </Formik>
    </div>
  )
}
