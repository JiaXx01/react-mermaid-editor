import { useState } from 'react'
import {
  Box,
  AppBar,
  Tabs,
  Tab,
  FormControlLabel,
  Switch,
  IconButton,
  Button
} from '@mui/material'
import SyncRoundedIcon from '@mui/icons-material/SyncRounded'
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded'

import MermaidEditor from './MermaidEditor'

import { useStore } from '../store'

const EditorTabs = () => {
  const autoSync = useStore.use.autoSync()
  const setAutoSync = useStore.use.setAutoSync()
  const setEditorMode = useStore.use.setEditorMode()
  const [tabIndex, setTabIndex] = useState(0)
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <AppBar
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        position="relative"
      >
        <Box>
          <Tabs
            value={tabIndex}
            onChange={(_, value) => {
              setTabIndex(value)
              setEditorMode(value === 0 ? 'code' : 'config')
            }}
            indicatorColor="secondary"
            textColor="inherit"
          >
            <Tab
              // icon={<CodeRoundedIcon fontSize="small" />}
              // iconPosition="start"
              label="code"
            ></Tab>
            <Tab
              // icon={<SettingsRoundedIcon />}
              // iconPosition="start"
              label="config"
            ></Tab>
          </Tabs>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, mr: 1 }}>
          <FormControlLabel
            label="AutoSync"
            labelPlacement="start"
            value="bottom"
            control={
              <Switch
                color="secondary"
                checked={autoSync}
                onChange={(_, value) => setAutoSync(value)}
              />
            }
          ></FormControlLabel>

          {!autoSync && (
            <IconButton size="small">
              <SyncRoundedIcon color="secondary" />
            </IconButton>
          )}
          <Button
            variant="contained"
            size="small"
            color="secondary"
            startIcon={<ArticleRoundedIcon />}
          >
            Docs
          </Button>
        </Box>
      </AppBar>
      <Box sx={{ flex: 1 }}>
        <MermaidEditor />
      </Box>
    </Box>
  )
}

export default EditorTabs
