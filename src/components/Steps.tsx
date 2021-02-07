import { useFormikContext } from 'formik'
import React from 'react'

const Steps = ({ currentStep, children }: any) => {
  const { submitCount, errors } = useFormikContext()
  return (
    <div>
      <div>{children[currentStep]}</div>
      {submitCount > 0 && errors && (
        <div className='notification is-danger m-4'>
          The form has errors, Please correct them and retry submitting.
        </div>
      )}
    </div>
  )
}

export default Steps
