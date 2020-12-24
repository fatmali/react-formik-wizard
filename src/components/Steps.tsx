import React from 'react'

const Steps = ({ currentStep, children }: any) => {
  return <div>{children[currentStep]}</div>
}

export default Steps
