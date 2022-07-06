/* eslint-disable multiline-ternary */
import React from 'react'
import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { Field } from 'formik'

const FormDetails = ({
  form: { values, errors, setFieldValue }, onClick, fields, actionLabel, disableFields
}) => {
  return (
    <>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" my={1} mx={2} width={1}>
        {fields.map((item) => (
          <Box
            key={item.id}
            sx={{
              width: '50%',
              '& .MuiTextField-root': { m: 1, width: '90%' }
            }}
            >
            {item.type !== 'select'
              ? (
                <Field name={item.id} required={item.required}>
                  {({ field }) => (
                    <TextField
                      type={item.type}
                      label={item.label}
                      style={{ width: '90%' }}
                      value={values[item.id]}
                      error={!!errors[item.id]}
                      helperText={errors[item.id] || ''}
                      disabled={disableFields}
                      {...field}
                    />
                  )}
                </Field>
                ) : (
                <TextField
                  select
                  label={item.label}
                  value={values[item.id]}
                  onChange={({ target }) => setFieldValue(item.id, target.value)}
                  helperText={errors[item.id] || ''}
                >
                  {item.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                )}
          </Box>
        ))}
      </Box>
      {onClick && (
        <Box display="flex" justifyContent="center" mt={3} mb={2}>
          <Button variant="contained" color="primary" onClick={() => onClick()}>
            {actionLabel}
          </Button>
        </Box>
      )}
    </>
  )
}

FormDetails.defaultProps = {
  fields: [],
  onClick: null,
  actionLabel: 'Submit',
  disableFields: false
}

FormDetails.propTypes = {
  form: PropTypes.shape({
    values: PropTypes.object,
    errors: PropTypes.object,
    setFieldValue: PropTypes.func
  }).isRequired,
  /**
   * Array of fields to render
   */
  fields: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]),
    options: PropTypes.array,
    required: PropTypes.bool
  })).isRequired,
  /**
   * Function in charge of form submit action
   */
  onClick: PropTypes.func,
  /**
   * Label string for action button
   */
  actionLabel: PropTypes.string,
  /**
   * Boolean in charge of disable fields if needed
   */
  disableFields: PropTypes.bool
}

export default FormDetails
