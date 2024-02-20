import { useContext, useEffect } from 'react'
import { MermaidContext, mermaidContext } from '../mermaidContext'
import { useDebounce } from 'ahooks'
const View = () => {
  const { code, config, isAutoSync } = useContext(
    mermaidContext
  ) as MermaidContext
  const debounceCode = useDebounce(code, { wait: 300 })
  const debounceConfig = useDebounce(config, { wait: 300 })
  const generateSvg = async (code: string, config: string) => {
    console.log(code)
    console.log(config)
  }
  useEffect(() => {
    if (isAutoSync) {
      generateSvg(debounceCode, debounceConfig)
    }
  }, [debounceCode, debounceConfig, isAutoSync])
  return <div>{code}</div>
}

export default View
