import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Button
} from '@mui/material'

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import DataObjectRoundedIcon from '@mui/icons-material/DataObjectRounded'
import CodeRoundedIcon from '@mui/icons-material/CodeRounded'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import {
  downloadImgAsPng,
  downloadImgAsSvg,
  downloadJson,
  formatJSON,
  importJson
} from '../utils/utils'
import { useState } from 'react'
import { getJsonData, useStore } from '../store'

const Header = () => {
  const setCode = useStore.use.setCode()
  const setConfig = useStore.use.setConfig()
  const loadJson = async () => {
    const json = await importJson()
    const data = JSON.parse(json)
    setCode(data.code)
    setConfig(formatJSON(data.config))
  }
  return (
    <AppBar component="header" position="relative">
      <Toolbar>
        <Typography variant="h6" component="div">
          Mermaid
        </Typography>
        {/* <FileMenu /> */}
        <Box sx={{ ml: 3, display: 'flex', gap: 1 }}>
          <Button color="inherit" onClick={loadJson}>
            Import
          </Button>
          <ExportMenu />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header

const ExportMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const onExport = async (type: string) => {
    switch (type) {
      case 'json':
        downloadJson(getJsonData())
        break
      case 'png':
        downloadImgAsPng()
        break
      case 'svg':
        downloadImgAsSvg()
        break
      default:
        break
    }
    setAnchorEl(null)
  }
  return (
    <>
      <Button
        endIcon={<KeyboardArrowDownRoundedIcon />}
        color="inherit"
        onClick={event => setAnchorEl(event.currentTarget)}
      >
        Export
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => onExport('json')}>
          <ListItemIcon>
            <DataObjectRoundedIcon />
          </ListItemIcon>
          <ListItemText>JSON</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => onExport('png')}>
          <ListItemIcon>
            <ImageOutlinedIcon />
          </ListItemIcon>
          <ListItemText>PNG</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => onExport('svg')}>
          <ListItemIcon>
            <CodeRoundedIcon />
          </ListItemIcon>
          <ListItemText>SVG</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
