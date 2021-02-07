import React from 'react'
import { Field, useFormikContext } from 'formik'
// eslint-disable-next-line no-unused-vars
import { IField, IStep } from '../types/wizard.types'

interface FieldRendererProps {
  step: IStep
  field: IField
  customFields?: any
}

const FieldRenderer = ({
  field: _field,
  step,
  customFields
}: FieldRendererProps) => {
  const { errors } = useFormikContext()

  const renderField = (
    type: string,
    id: string,
    options: { label: string; value: string }[] = [],
    { field, form }: any
  ) => {
    const customField = customFields[type]

    if (customField) {
      return <customField.component field={field} form={form} />
    }

    switch (type) {
      case 'number':
      case 'date':
      case 'text':
        return (
          <input
            {...field}
            onChange={(e) => form.setFieldValue(field.name, e.target.value)}
            className={
              errors && errors[step.id] && errors[step.id][id]
                ? 'input is-danger'
                : 'input'
            }
          />
        )
      case 'textarea':
        return (
          <textarea
            {...field}
            className={
              errors && errors[step.id] && errors[step.id][id]
                ? 'textarea is-danger'
                : 'textarea'
            }
          />
        )
      case 'select':
        return (
          <select
            value={field.value}
            placeholder={field.placeholder}
            onChange={(value) => form.setFieldValue(field.name, value)}
            id={field.id}
            className={
              errors && errors[step.id] && errors[step.id][id]
                ? 'select is-danger'
                : 'select'
            }
          >
            {options.map((option: any) => (
              <option key={option.label}>{option.label}</option>
            ))}
          </select>
        )
      default:
        return (
          <p>
            No field defined {field.type} for this control {field.name}
          </p>
        )
    }
  }
  return (
    <Field name={`${step.id}.${_field.id}`}>
      {({ field, form }: any) => (
        <div className='field'>
          <label className='label'>{_field.label}</label>
          {renderField(_field.type, _field.id, _field.options, { field, form })}
          <p className='help is-danger'>
            {errors && errors[step.id] && errors[step.id][_field.id]}
          </p>
        </div>
      )}
    </Field>
  )
}

export default FieldRenderer
