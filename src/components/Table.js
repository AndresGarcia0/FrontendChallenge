import * as React from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@mui/x-data-grid'

import CustomToolbar from './CustomToolbar'

const Table = ({ columns, rows, ...others }) => {
  return (
    <div {...others}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{ Toolbar: CustomToolbar }}
      />
    </div>
  )
}

Table.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array
}

export default Table
