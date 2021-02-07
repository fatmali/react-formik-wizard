import React from 'react'
import Wizard from './components/Wizard'
// eslint-disable-next-line no-unused-vars
import { IWizard } from './types/wizard.types'
import './styles.module.css'

interface LibProps {
  wizard: IWizard
  onComplete: (values: any) => any
  customFields?: any
}

const Lib = ({ wizard, onComplete, customFields = {} }: LibProps) => {
  return (
    <Wizard
      wizard={wizard}
      onComplete={onComplete}
      customFields={customFields}
    />
  )
}

export default Lib
