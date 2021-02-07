import React from 'react'
import { Field, useFormikContext } from 'formik'
// eslint-disable-next-line no-unused-vars
import { IField, ISection, IStep } from '../types/wizard.types'

interface FieldRendererProps {
  step: IStep
  field: IField
  section: ISection
  customFields?: any
}

const FieldRenderer = ({ field: _field, customFields }: FieldRendererProps) => {
  const { errors, values } = useFormikContext()

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
            className={errors && errors[id] ? 'input is-danger' : 'input'}
          />
        )
      case 'textarea':
        return (
          <textarea
            {...field}
            className={errors && errors[id] ? 'textarea is-danger' : 'textarea'}
          />
        )
      case 'select':
        return (
          <select
            value={field.value}
            placeholder={field.placeholder}
            onChange={(e) => form.setFieldValue(field.name, e.target.value)}
            className={errors && errors[id] ? 'select is-danger' : 'select'}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
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
  const shouldRenderField = () => {
    if (_field.show) {
      const dependentFieldId = _field.show.when
      if (dependentFieldId) {
        const dependentFieldValue =
          // @ts-ignore
          values[dependentFieldId]

        if (_field.show.is) {
          return dependentFieldValue === _field.show.is
        }
        if (_field.show.gte && _field.show.lte) {
          return (
            dependentFieldValue >= _field.show.gte &&
            dependentFieldValue <= _field.show.lte
          )
        }
        if (_field.show.gt && _field.show.lt) {
          return (
            dependentFieldValue > _field.show.gt &&
            dependentFieldValue < _field.show.lt
          )
        }
        if (_field.show.gte) {
          return dependentFieldValue >= _field.show.gte
        }
        if (_field.show.gt) {
          return dependentFieldValue > _field.show.gt
        }
        if (_field.show.lt) {
          return dependentFieldValue < _field.show.lt
        }
        if (_field.show.lte) {
          return dependentFieldValue <= _field.show.lte
        }
        if (_field.show.contains) {
          return dependentFieldValue.includes(_field.show.contains)
        }
      }
      return false
    }
    return true
  }
  return (
    shouldRenderField() && (
      <Field name={_field.id}>
        {({ field, form }: any) => (
          <div className='field'>
            <label className='label'>{_field.label}</label>
            {renderField(_field.type, _field.id, _field.options, {
              field,
              form
            })}
            <p className='help is-danger'>{errors && errors[_field.id]}</p>
          </div>
        )}
      </Field>
    )
  )
}

export default FieldRenderer
