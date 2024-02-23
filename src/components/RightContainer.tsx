import {
  Box,
  AppBar,
  Typography,
  FormControlLabel,
  Switch
} from '@mui/material'
import View from './View'
import { useStore } from '../store'
import FullScreen from './FullScreen'

const RightContainer = () => {
  const panZoom = useStore.use.panZoom()
  const setPanZoomEnable = useStore.use.setPanZoomEnable()
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
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <FormControlLabel
            label="Pan&Zoom"
            labelPlacement="start"
            value="bottom"
            control={
              <Switch
                color="secondary"
                checked={panZoom}
                onChange={(_, value) => setPanZoomEnable(value)}
              ></Switch>
            }
          ></FormControlLabel>
          <FullScreen />
        </Box>
      </AppBar>
      <Box sx={{ height: 'calc(100% - 48px)' }}>
        <View />
      </Box>
    </Box>
  )
}

export default RightContainer
