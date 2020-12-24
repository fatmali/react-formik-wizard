import React from 'react'
import Stepper from './Stepper'
import Steps from './Steps'
import Step from './Step'
import { Button, SHAPE } from 'baseui/button'
import { Grid, Cell } from 'baseui/layout-grid'
import { Form, Formik } from 'formik'
// eslint-disable-next-line no-unused-vars
import Wizard from '../types/wizard.types'

interface WizardProps {
  wizard: Wizard
  onComplete: (values: any) => any
}
export default function App(props: WizardProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [completedSteps] = React.useState({})
  const { wizard } = props
  return (
    <div>
      <h1>{wizard.name}</h1>
      <Stepper
        currentStep={currentStep}
        steps={wizard.steps}
        completedSteps={completedSteps}
        setCurrentStep={setCurrentStep}
      />
      <Formik
        initialValues={{
          personal_info: {
            first_name: 'hello'
          }
        }}
        onSubmit={(values) => props.onComplete(values)}
      >
        <Form>
          <Steps currentStep={currentStep}>
            {wizard.steps.map((step, i) => (
              <Step step={step} key={i} />
            ))}
          </Steps>
          <Grid>
            <Cell span={[3, 3, 3]}>
              {currentStep !== 0 && (
                <Button
                  onClick={() =>
                    setCurrentStep(currentStep === 0 ? 0 : currentStep - 1)
                  }
                  shape={SHAPE.pill}
                >
                  Previous
                </Button>
              )}
            </Cell>
            <Cell span={[1, 4, 3]}>
              {currentStep === wizard.steps.length - 1 ? (
                <Button shape={SHAPE.pill} type='submit'>
                  Save
                </Button>
              ) : (
                <Button
                  shape={SHAPE.pill}
                  onClick={() =>
                    setCurrentStep(
                      currentStep === wizard.steps.length - 1
                        ? 0
                        : currentStep + 1
                    )
                  }
                >
                  Next
                </Button>
              )}
            </Cell>
          </Grid>
        </Form>
      </Formik>
    </div>
  )
}
