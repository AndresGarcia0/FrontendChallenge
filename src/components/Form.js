import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'

const CustomForm = ({ submitHandler, Details, validationSchema, initialValues, getFields }) => {
  let handleSubmitForm

  const bindFormikProps = (formikProps) => {
    handleSubmitForm = formikProps.submitForm
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {(formikProps) => {
          bindFormikProps(formikProps)

          const fields = getFields(formikProps.values)

          return (
            <Form noValidate autoComplete="off">
              <Details form={formikProps} onClick={handleSubmitForm} fields={fields} />
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

CustomForm.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  Details: PropTypes.elementType.isRequired,
  validationSchema: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  getFields: PropTypes.func.isRequired
}

export default CustomForm
