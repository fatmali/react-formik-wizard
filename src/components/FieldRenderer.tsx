import React from 'react'
import { FormControl } from 'baseui/form-control'
import { StatefulInput } from 'baseui/input'
import { Combobox } from 'baseui/combobox'
import { DatePicker } from 'baseui/datepicker'
import { Field, useFormikContext } from 'formik'
// eslint-disable-next-line no-unused-vars
import { Field as IField, Step } from '../types/wizard.types'

interface FieldRendererProps {
  step: Step
  field: IField
}

const FieldRenderer = ({ step, field }: FieldRendererProps) => {
  const { setFieldValue } = useFormikContext()
  const renderField = (field: any) => {
    switch (field.type) {
      case 'text':
        return (
          <StatefulInput {...field} initialState={{ value: field.value }} />
        )
      case 'number':
        return <StatefulInput type='number' {...field} />
      case 'combobox':
        return (
          <Combobox
            options={field.options}
            mapOptionToString={(option) => option.label}
            {...field}
          />
        )
      case 'date':
        return (
          <DatePicker
            value={field.value}
            onChange={({ date }) => setFieldValue(field.name, date)}
          />
        )
      default:
        return <StatefulInput {...field} />
    }
  }
  return (
    <FormControl label={() => field.label}>
      <Field name={`${step.id}.${field.id}`}>
        {({ field: formikField }: any) =>
          renderField({ ...field, ...formikField })
        }
      </Field>
    </FormControl>
  )
}

export default FieldRenderer
