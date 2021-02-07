import React from 'react'
import { Field, useFormikContext } from 'formik'
// eslint-disable-next-line no-unused-vars
import { IField, IStep } from '../types/wizard.types'

interface FieldRendererProps {
  step: IStep
  field: IField
}

const FieldRenderer = ({ field, step }: FieldRendererProps) => {
  const { setFieldValue, errors } = useFormikContext()

  const renderField = (field: any) => {
    switch (field.type) {
      case 'text' || 'number' || 'date':
        return (
          <div>
            <input
              {...field}
              onChange={(e) => setFieldValue(field.name, e.target.value)}
              className={
                errors && errors[step.id] && errors[step.id][field.id]
                  ? 'input is-danger'
                  : 'input'
              }
            />
          </div>
        )
      case 'textarea':
        return (
          <textarea
            {...field}
            initialState={{ value: field.value }}
            error={errors && errors[field.name]}
            className={
              errors && errors[step.id] && errors[step.id][field.id]
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
            onChange={(value) => setFieldValue(field.name, value)}
            id={field.id}
            className={
              errors && errors[step.id] && errors[step.id][field.id]
                ? 'select is-danger'
                : 'select'
            }
          >
            {field.options.map((option: any) => (
              <option key={option.label}>{option.label}</option>
            ))}
          </select>
        )
      default:
        return <input {...field} />
    }
  }
  return (
    <Field name={`${step.id}.${field.id}`}>
      {({ field: formikField }: any) => (
        <div className='field'>
          <label className='label'>{field.label}</label>
          {renderField({ ...field, ...formikField })}
          <p className='help is-danger'>
            {errors && errors[step.id] && errors[step.id][field.id]}
          </p>
        </div>
      )}
    </Field>
  )
}

export default FieldRenderer
