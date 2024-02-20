import MonacoEditor, { OnChange, OnMount } from '@monaco-editor/react'
import initEditor from 'monaco-mermaid'
import { memo, useContext, useMemo } from 'react'
import { MermaidContext, mermaidContext } from '../mermaidContext'

const MermaidEditor = () => {
  const { setCode } = useContext(mermaidContext) as MermaidContext
  const onChange: OnChange = value => {
    setCode(value as string)
  }
  const onMount: OnMount = (_, monaco) => {
    initEditor(monaco)
  }
  return useMemo(
    () => (
      <MonacoEditor
        height="100%"
        defaultLanguage="mermaid"
        onChange={onChange}
        options={{
          minimap: {
            enabled: false
          }
        }}
        onMount={onMount}
      />
    ),
    []
  )
}

export default memo(MermaidEditor)
