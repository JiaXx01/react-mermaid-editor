import { FC, ReactNode, createContext, useEffect, useState } from 'react'

export interface MermaidContext {
  code: string
  setCode: (code: string) => void
  config: string
  setConfig: (config: string) => void
  isAutoSync: boolean
  setIsAutoSync: (isAutoSync: boolean) => void
  svg: string
  setSvg: (svg: string) => void
}

export const mermaidContext = createContext<MermaidContext | null>(null)

export const MermaidProvide: FC<{ children: ReactNode | ReactNode[] }> = ({
  children
}) => {
  const [code, setCode] = useState('')
  const [config, setConfig] = useState('')
  const [isAutoSync, setIsAutoSync] = useState(true)
  const [svg, setSvg] = useState('')
  useEffect(() => {}, [isAutoSync, code])
  return (
    <mermaidContext.Provider
      value={{
        code,
        setCode,
        config,
        setConfig,
        isAutoSync,
        setIsAutoSync,
        svg,
        setSvg
      }}
    >
      {children}
    </mermaidContext.Provider>
  )
}
