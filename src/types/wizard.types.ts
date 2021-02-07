// eslint-disable-next-line no-unused-vars

export interface IField {
  label: string
  type: string
  id: string
  calculated?: string
  calculatedFormula?: string
  value?: string
  placeholder?: string
  required?: boolean
  options?: { label: string; value: string }[]
  initialValue?: Promise<string> | string
  show?: {
    when: string
    is?: string
    contains?: string
    gt?: string
    lt?: string
    gte?: string
    lte?: string
  }
}

export interface ISection {
  name: string
  id?: string
  fields: IField[]
}

export interface IStep {
  name: string
  id?: string
  sections: ISection[]
}

export interface IWizard {
  name: string
  steps: IStep[]
  settings?: any
  validation?: any[]
}

export default IWizard
