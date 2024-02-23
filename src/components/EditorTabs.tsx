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
import SelectSample from './SelectSample'

const EditorTabs = () => {
  const autoSync = useStore.use.autoSync()
  const setAutoSync = useStore.use.setAutoSync()
  const setEditorMode = useStore.use.setEditorMode()
  const setUpdateDiagram = useStore.use.setUpdateDiagram()

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
            <Tab label="code"></Tab>
            <Tab label="config"></Tab>
          </Tabs>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, mr: 1, alignItems: 'center' }}>
          <SelectSample />
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
            <IconButton size="small" onClick={() => setUpdateDiagram(true)}>
              <SyncRoundedIcon color="secondary" />
            </IconButton>
          )}
          <Button
            variant="contained"
            size="small"
            color="secondary"
            startIcon={<ArticleRoundedIcon />}
            onClick={() => {
              window.open(
                'https://mermaid.js.org/syntax/xyChart.html#chart-configurations'
              )
            }}
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
