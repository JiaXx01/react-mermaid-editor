import { Box, CssBaseline } from '@mui/material'
import Header from './components/Header'
import { Allotment } from 'allotment'
import 'allotment/dist/style.css'

import LeftContainer from './components/LeftContainer'
import RightContainer from './components/RightContainer'

const App = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#fafafa'
      }}
    >
      <CssBaseline />
      <Header />

      <Box sx={{ height: 'calc(100vh - 64px)' }}>
        <Allotment>
          <Box sx={{ height: '100%', p: 1 }}>
            <LeftContainer />
          </Box>
          <Box sx={{ height: '100%', p: 1 }}>
            <RightContainer />
          </Box>
        </Allotment>
      </Box>
    </Box>
  )
}

export default App
