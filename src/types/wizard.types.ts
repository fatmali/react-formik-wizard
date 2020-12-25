// eslint-disable-next-line no-unused-vars
import { CSSProperties } from 'react'

export interface Field {
  label: string
  type: string
  id: string
  calculated?: string
  value?: string
  validations?: any[]
  styles?: CSSProperties
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

export default interface Wizard {
  name: string
  steps: Step[]
  settings: any
  validation: any[]
}
