import { AppBar, Toolbar, Typography } from '@mui/material'

const Header = () => {
  return (
    <AppBar component="header" position="relative">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Mermaid
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
