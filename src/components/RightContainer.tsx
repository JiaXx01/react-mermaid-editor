import {
  Box,
  AppBar,
  Typography,
  FormControlLabel,
  Switch,
  Button
} from '@mui/material'
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded'
import { useState } from 'react'
import View from './View'

const RightContainer = () => {
  const [isPanAndZoom, setIsPanAndZoom] = useState(false)
  return (
    <Box
      sx={{
        height: '100%',
        borderRadius: '5px',
        overflow: 'hidden',
        bgcolor: 'white',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <AppBar
        sx={{
          height: '48px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 1
        }}
        position="relative"
      >
        <Typography variant="h6" component="div">
          Diagram
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <FormControlLabel
            label="Pan&Zoom"
            labelPlacement="start"
            value="bottom"
            control={
              <Switch
                color="secondary"
                checked={isPanAndZoom}
                onChange={(_, value) => setIsPanAndZoom(value)}
              ></Switch>
            }
          ></FormControlLabel>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            startIcon={<FullscreenRoundedIcon />}
            sx={{ flexGrow: 1, whiteSpace: 'nowrap' }}
          >
            Full Screen
          </Button>
        </Box>
      </AppBar>
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <View />
      </Box>
    </Box>
  )
}

export default RightContainer
