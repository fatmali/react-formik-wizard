import React from 'react'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider } from 'baseui'
import Wizard from './components/Wizard'
// eslint-disable-next-line no-unused-vars
import IWizard from './types/wizard.types'

interface LibProps {
  wizard: IWizard
  onComplete: (values: any) => any
}

const Lib = ({ wizard, onComplete }: LibProps) => {
  const engine = new Styletron()
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Wizard wizard={wizard} onComplete={onComplete} />
      </BaseProvider>
    </StyletronProvider>
  )
}

export default Lib
