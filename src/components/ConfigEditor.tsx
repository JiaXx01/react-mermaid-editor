import { useContext, useMemo } from 'react'
import MonacoEditor, { OnChange } from '@monaco-editor/react'
import { MermaidContext, mermaidContext } from '../mermaidContext'
import defaultConfigValue from '../assets/config.json'
const ConfigEditor = () => {
  const { setConfig } = useContext(mermaidContext) as MermaidContext
  const onChange: OnChange = value => {
    setConfig(value as string)
  }
  return useMemo(
    () => (
      <MonacoEditor
        height="100%"
        onChange={onChange}
        language="json"
        defaultValue={JSON.stringify(defaultConfigValue, null, 2)}
        options={{
          minimap: {
            enabled: false
          }
        }}
      ></MonacoEditor>
    ),
    []
  )
}

export default ConfigEditor
