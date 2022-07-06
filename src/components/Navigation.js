import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import AppBar from './AppBar'
import Drawer from './Drawer'
import DrawerItems from './DrawerItems'

const drawerWidth = 240

export const Navigation = () => {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const toggleDrawer = () => setOpen(!open)

  const mainListItems = [
    {
      label: 'Offices',
      handleClick: () => navigate('/offices'),
      Icon: DashboardIcon
    }, {
      label: 'Shipments',
      handleClick: () => navigate('/shipments'),
      Icon: ShoppingCartIcon
    }
  ]

  return (
    <Fragment>
      <AppBar position="absolute" open={open} drawerWidth={drawerWidth} >
        <Toolbar sx={{
          pr: '24px'
        }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' })
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Deutsche Post
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} drawerWidth={drawerWidth} >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1]
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <DrawerItems items={mainListItems} />
        </List>
      </Drawer>
    </Fragment>
  )
}
