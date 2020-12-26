import React from 'react'
import { FormControl } from 'baseui/form-control'
import { StatefulInput } from 'baseui/input'
import { Combobox } from 'baseui/combobox'
import { DatePicker } from 'baseui/datepicker'
import { StatefulTextarea } from 'baseui/textarea'
import { Field, useFormikContext } from 'formik'
// eslint-disable-next-line no-unused-vars
import { Field as IField, Step } from '../types/wizard.types'
import { Select } from 'baseui/select'
import { colors } from 'baseui/tokens'
import { useStyletron } from 'styletron-react'

interface FieldRendererProps {
  step: Step
  field: IField
}

const FieldRenderer = ({ field }: FieldRendererProps) => {
  const [css] = useStyletron()
  const { setFieldValue, errors } = useFormikContext()
  const renderField = (field: any) => {
    switch (field.type) {
      case 'text' || 'number':
        return (
          <StatefulInput
            {...field}
            initialState={{ value: field.value }}
            error={errors && errors[field.name]}
          />
        )
      case 'textarea':
        return (
          <StatefulTextarea
            {...field}
            initialState={{ value: field.value }}
            error={errors && errors[field.name]}
          />
        )
      case 'combobox':
        return (
          <Combobox
            options={field.options}
            mapOptionToString={(option) => option.label}
            onChange={(value) => setFieldValue(field.name, value)}
            value={field.value}
            id={field.id}
          />
        )
      case 'date':
        return (
          <DatePicker
            value={field.value}
            onChange={({ date }) => setFieldValue(field.name, date)}
            error={errors && errors[field.name]}
            aria-role='date-picker'
          />
        )
      case 'select':
        return (
          <Select
            options={field.options}
            value={field.value}
            placeholder={field.placeholder}
            onChange={(value) => setFieldValue(field.name, value)}
            error={errors && errors[field.name]}
            id={field.id}
          />
        )
      default:
        return <StatefulInput {...field} />
    }
  }
  return (
    <FormControl label={() => field.label} htmlFor={field.id}>
      <Field name={field.id}>
        {({ field: formikField }: any) => (
          <div>
            {renderField({ ...field, ...formikField })}
            <p
              className={css({
                color: colors.red500
              })}
            >
              {formikField.touched &&
                errors[formikField.name] &&
                errors[formikField.name]}
            </p>
          </div>
        )}
      </Field>
    </FormControl>
  )
}

export default FieldRenderer
