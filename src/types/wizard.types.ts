// eslint-disable-next-line no-unused-vars

export interface Field {
  label: string
  type: string
  id: string
  calculated?: string
  value?: string
  placeholder?: string
  required?: boolean
  options?: { label: string; id: string }[]
}

export interface Section {
  name: string
  id?: string
  fields: Field[]
}

export interface Step {
  name: string
  id: string
  sections: Section[]
}

export interface Wizard {
  name: string
  steps: Step[]
  settings?: any
  validation?: any[]
}

export default {
  Field,
  Section,
  Step,
  Wizard
