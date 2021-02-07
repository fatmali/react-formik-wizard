import React from 'react'
import Wizard from './components/Wizard'
// eslint-disable-next-line no-unused-vars
import { IWizard } from './types/wizard.types'
import './styles.module.css'

interface LibProps {
  wizard: IWizard
  onComplete: (values: any) => any
}

const Lib = ({ wizard, onComplete }: LibProps) => {
  return <Wizard wizard={wizard} onComplete={onComplete} />
}

export default Lib
