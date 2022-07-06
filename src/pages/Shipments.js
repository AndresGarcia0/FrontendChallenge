import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

import Table from '../components/Table'
import Form from '../components/Form'
import FormDetails from '../components/FormDetails'
import { fetchShipments, deleteShipment, createShipment, updateShipment } from '../services/shipments'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 2
}

const typesList = {
  Letter: 1,
  Package: 2
}

const statusList = {
  'Received and processed in the parcel center of origin': 1,
  'Received and processed in the destination parcel center': 2,
  Delivered: 3
}

const weightList = {
  'Less than 1kg': 1,
  'Between 1kg and 5kg': 2,
  'More than 5kg': 3
}

const fields = (values) => ([
  {
    id: 'postOffice',
    type: 'text',
    label: 'Office zip code',
    value: values.zipCode,
    required: true
  },
  {
    id: 'type',
    type: 'select',
    label: 'Type',
    value: values.type,
    options: Object.keys(typesList).map((label, index) => ({ value: index + 1, label })),
    required: true
  },
  {
    id: 'status',
    type: 'select',
    label: 'Status',
    value: values.status,
    options: Object.keys(statusList).map((label, index) => ({ value: index + 1, label })),
    required: true
  },
  {
    id: 'weight',
    type: 'select',
    label: 'Weight',
    value: values.weight,
    options: Object.keys(weightList).map((label, index) => ({ value: index + 1, label })),
    required: true
  }
])

const getInitialFormValues = (values = {}) => ({
  id: values.id || '',
  postOffice: values.postOffice || '',
  type: values.type || '',
  status: values.status || '',
  weight: values.weight || ''
})

const validationSchema = Yup.object().shape({
  postOffice: Yup.string(),
  type: Yup.number(),
  status: Yup.number(),
  weight: Yup.number()
})

const columns = (deleteHandler, editHandler) => ([
  { field: 'id', headerName: 'ID', width: 100 }, // Not normal to render it
  { field: 'postOffice', headerName: 'Post Office', width: 130 },
  { field: 'type', headerName: 'Type', width: 130 },
  { field: 'status', headerName: 'Status', width: 300 },
  { field: 'weight', headerName: 'Weight', width: 200 },
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

export const Shipments = () => {
  const [open, setOpen] = useState(false)
  const [shipments, setShipments] = useState([])
  const [isUpdating, setIsUpdating] = useState(false)
  const [initialFormValues, setInitialFormValues] = useState({})

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleFetchShipments = () => {
    fetchShipments()
      .then(res => {
        const customIdResponse = res.data.map(({ _id, postOffice, type, status, weight }) => ({
          id: _id,
          postOffice,
          type,
          status,
          weight
        }))
        setShipments(customIdResponse)
      })
      .catch(err => {
        console.warn(err)
      })
  }

  const handleDeleteShipment = (id) => {
    deleteShipment(id)
      .then(({ status }) => {
        if (status === 202) handleFetchShipments()
      })
      .catch(err => {
        console.warn(err)
      })
  }

  const handleSubmit = (values) => {
    createShipment(values)
      .then(({ status }) => {
        if (status === 201) handleFetchShipments()
        setOpen(false)
      })
      .catch(err => {
        console.warn(err)
      })
  }

  const handleUpdate = (values) => {
    updateShipment(values.id, values)
      .then(({ status }) => {
        if (status === 200) handleFetchShipments()
        setOpen(false)
      })
      .catch(err => {
        console.warn(err)
      })
    setIsUpdating(false)
  }

  const onEditClick = (row) => {
    setIsUpdating(true)

    const shipmentInitial = {
      ...row,
      type: typesList[row.type],
      status: statusList[row.status],
      weight: weightList[row.weight]
    }
    setInitialFormValues(getInitialFormValues(shipmentInitial))
    setOpen(true)
  }

  useEffect(() => {
    handleFetchShipments()
    setInitialFormValues(getInitialFormValues())
  }, [])

  return (
    <>
      <h2>Shipments</h2>
      <Button
        variant="contained"
        size="small"
        style={{ marginBottom: 16 }}
        onClick={handleOpen}
      >
        Add
      </Button>
      <Table
        style={{ height: 400, width: '80%', margin: 'auto' }}
        columns={columns(handleDeleteShipment, onEditClick)}
        rows={shipments} />
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
