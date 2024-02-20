import MonacoEditor, { OnChange } from '@monaco-editor/react'

import { useStore } from '../store'

const ConfigEditor = () => {
  const mermaid = useStore(state => state.mermaid)
  const setMermaid = useStore(state => state.setMermaid)

  const onChange: OnChange = value => {
    setMermaid(value as string)
  }
  return (
    <MonacoEditor
      height="100%"
      onChange={onChange}
      language="json"
      value={mermaid}
      options={{
        minimap: {
          enabled: false
        }
      }}
    ></MonacoEditor>
  )
}

export default ConfigEditor
