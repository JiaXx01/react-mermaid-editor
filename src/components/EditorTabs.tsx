import { useContext, useState, PropsWithChildren, FC } from 'react'
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
import { MermaidContext, mermaidContext } from '../mermaidContext'
import MermaidEditor from './MermaidEditor'
import ConfigEditor from './ConfigEditor'

const EditorTabs = () => {
  const { isAutoSync, setIsAutoSync } = useContext(
    mermaidContext
  ) as MermaidContext
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
            onChange={(_, value) => setTabIndex(value)}
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
                checked={isAutoSync}
                onChange={(_, value) => setIsAutoSync(value)}
              />
            }
          ></FormControlLabel>

          {!isAutoSync && (
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
        <TabPanel value={tabIndex} index={0}>
          <MermaidEditor />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <ConfigEditor />
        </TabPanel>
      </Box>
    </Box>
  )
}

type TabPanelProps = PropsWithChildren<{
  value: number
  index: number
}>

const TabPanel: FC<TabPanelProps> = props => {
  const { children, index, value } = props

  return (
    <div
      style={{ height: '100%' }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && children}
    </div>
  )
}

export default EditorTabs
