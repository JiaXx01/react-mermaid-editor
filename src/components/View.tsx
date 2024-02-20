import { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'ahooks'
import { Box } from '@mui/material'
import { parse, render as renderDiagram } from '../utils/mermaid'
// import svgPanZoom from 'svg-pan-zoom'
import { useStore } from '../store'

const View = () => {
  const code = useStore.use.code()
  const config = useStore.use.config()
  // const panZoom = useStore.use.panZoom()

  const container = useRef<HTMLDivElement>(null)
  const view = useRef<HTMLDivElement>(null)

  const debounceCode = useDebounce(code, { wait: 300 })
  const debounceConfig = useDebounce(config, { wait: 300 })

  const [validateCode, setValidateCode] = useState('')
  const [validateConfig, setValidateConfig] = useState('')

  // const pzoom = useRef<typeof svgPanZoom>()

  const setValidateCodeAndConfig = async (code: string, config: string) => {
    try {
      await parse(code)
      JSON.parse(config)
      setValidateCode(code)
      setValidateConfig(config)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setValidateCodeAndConfig(debounceCode, debounceConfig)
  }, [debounceCode, debounceConfig])

  const generateSvg = async (code: string, config: string) => {
    if (container.current && code) {
      const { svg, bindFunctions } = await renderDiagram(
        { ...JSON.parse(config) },
        code,
        'graph-div'
      )
      if (svg.length > 0) {
        container.current.innerHTML = svg
        const graphDiv = document.querySelector<HTMLElement>('#graph-div')
        if (!graphDiv) {
          throw new Error('graph-div not found')
        }
        graphDiv.setAttribute('height', '100%')
        graphDiv.style.maxWidth = '100%'
        if (bindFunctions) bindFunctions(graphDiv)
      }
    }
  }
  useEffect(() => {
    generateSvg(validateCode, validateConfig)
  }, [validateCode, validateConfig])

  // const handlePanZoom = () => {
  //   if (!panZoom) return
  //   pzoom.current?.destroy()
  //   pzoom.current = undefined
  //   Promise.resolve().then(() => {

  //   })
  // }

  return (
    <Box ref={view} component="div" sx={{ height: '100%' }}>
      <Box ref={container} component="div" sx={{ height: '100%' }}></Box>
    </Box>
  )
}

export default View
