import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

import Table from '../components/Table'
import Form from '../components/Form'
import FormDetails from '../components/FormDetails'
import { fetchOffices, deleteOffice, createOffice, updateOffice } from '../services/office'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 2
}

const fields = (values) => ([
  {
    id: 'zipCode',
    type: 'text',
    label: 'Office zip code',
    value: values.zipCode,
    required: true
  },
  {
    id: 'name',
    type: 'text',
    label: 'Office name',
    value: values.name,
    required: true
  }
])

const getInitialFormValues = (values = {}) => ({
  id: values.id || '',
  zipCode: values.zipCode || '',
  name: values.name || ''
})

const validationSchema = Yup.object().shape({
  zipCode: Yup.string().required('Office zip code it is required'),
  name: Yup.string().required('Office name it is required.')
})

const columns = (deleteHandler, editHandler) => ([
  { field: 'id', headerName: 'ID', width: 100 }, // Not normal to render it
  { field: 'zipCode', headerName: 'Zip Code', width: 130 },
  { field: 'name', headerName: 'Name', width: 130 },
  {
    field: 'buttons',
    headerName: 'Options',
    width: 200,
    renderCell: ({ row }) => (
      <>
        <Button
          variant="contained"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => editHandler(row)}
        >
          Edit
        </Button>
        <Button
          component="button"
          variant="contained"
          size="small"
          style={{ marginLeft: 8 }}
          onClick={() => deleteHandler(row.id)}
        >
          Remove
        </Button>
      </>
    )
  }
])

export const Offices = () => {
  const [open, setOpen] = useState(false)
  const [offices, setOffices] = useState([])
  const [isUpdating, setIsUpdating] = useState(false)
  const [initialFormValues, setInitialFormValues] = useState({})

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleFetchOffices = () => {
    fetchOffices()
      .then(res => {
        const customKeyResponse = res.data.map(({ _id, zipCode, name }) => ({
          id: _id,
          zipCode,
          name
        }))
        setOffices(customKeyResponse)
      })
      .catch(err => {
        console.warn(err)
      })
  }

  const handleDeleteOffice = (id) => {
    deleteOffice(id)
      .then(({ data, status }) => {
        console.info(data)
        if (status === 202) handleFetchOffices()
      })
      .catch(err => {
        console.warn(err)
      })
  }

  const handleSubmit = (values) => {
    createOffice(values)
      .then(({ data, status }) => {
        if (status === 201) {
          setOffices([...offices, { id: data.insertedId, ...values }])
        }
        setOpen(false)
      })
      .catch(err => {
        console.warn(err)
      })
  }

  const handleUpdate = (values) => {
    updateOffice(values.id, values)
      .then(({ status }) => {
        if (status === 200) {
          const newOffices = offices.filter(office => office.id !== values.id)
          setOffices([...newOffices, values])
        }
        setOpen(false)
      })
      .catch(err => {
        console.warn(err)
      })
    setIsUpdating(false)
  }

  const onEditClick = (row) => {
    setInitialFormValues(getInitialFormValues(row))
    setIsUpdating(true)
    setOpen(true)
  }

  useEffect(() => {
    handleFetchOffices()
    setInitialFormValues(getInitialFormValues())
  }, [])

  return (
    <>
      <h2>Offices</h2>
      <Button
        variant="contained"
        size="small"
        style={{ marginBottom: 16 }}
        onClick={handleOpen}
      >Add</Button>
      <Table
        style={{ height: 400, width: '60%', margin: 'auto' }}
        columns={columns(handleDeleteOffice, onEditClick)}
        rows={offices}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form
            submitHandler={isUpdating ? handleUpdate : handleSubmit}
            getFields={fields}
            Details={FormDetails}
            validationSchema={validationSchema}
            initialValues={initialFormValues}
          />
        </Box>
      </Modal>
    </>
  )
}
