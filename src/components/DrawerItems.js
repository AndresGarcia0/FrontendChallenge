import React, { Fragment } from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import PropTypes from 'prop-types'

const DrawerItems = ({ items }) => (
  <Fragment>
    {items.map(({ label, Icon, handleClick }) => (
      <ListItemButton key={label} onClick={handleClick}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    ))}
  </Fragment>
)

DrawerItems.propTypes = {
  items: PropTypes.array
}

export default DrawerItems
