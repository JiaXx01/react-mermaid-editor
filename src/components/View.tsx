import { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'ahooks'
import { Box } from '@mui/material'
import { parse, render } from '../utils/mermaid'
import svgPanZoom from 'svg-pan-zoom'
import { useStore } from '../store'

const View = () => {
  const code = useStore.use.code()
  const config = useStore.use.config()
  const autoSync = useStore.use.autoSync()
  const updateDiagram = useStore.use.updateDiagram()
  const panZoom = useStore.use.panZoom()
  const pan = useStore.use.pan?.()
  const zoom = useStore.use.zoom?.()
  const setPanZoom = useStore.use.setPanZoom()
  const setUpdateDiagram = useStore.use.setUpdateDiagram()
  const setSvg = useStore.use.setSvg()
  const setValidateCodeState = useStore.use.setValidateCode()
  const setValidateConfigState = useStore.use.setValidateConfig()

  const container = useRef<HTMLDivElement>(null)
  const view = useRef<HTMLDivElement>(null)

  const debounceCode = useDebounce(code, { wait: 300 })
  const debounceConfig = useDebounce(config, { wait: 300 })

  const [validateCode, setValidateCode] = useState('')
  const [validateConfig, setValidateConfig] = useState('')

  const pzoom = useRef<typeof svgPanZoom>()

  const setValidateCodeAndConfig = async (code: string, config: string) => {
    try {
      await parse(code)
      JSON.parse(config)
      setValidateCode(code)
      setValidateConfig(config)
      setValidateCodeState(code)
      setValidateConfigState(config)
    } catch (error) {
      console.log(error)
    }
  }

  const renderDiagram = async (code: string, config: string) => {
    if (container.current && code) {
      // const scroll = view.current?.parentElement?.scrollTop
      const { svg } = await render({ ...JSON.parse(config) }, code, 'graph-div')
      if (svg.length > 0) {
        handlePanZoom()
        container.current.innerHTML = svg
        setSvg(svg)
        const graphDiv = document.querySelector<HTMLElement>('#graph-div')
        if (!graphDiv) {
          throw new Error('graph-div not found')
        }
        graphDiv.setAttribute('height', '100%')
        graphDiv.style.maxWidth = '100%'
        // if (bindFunctions) bindFunctions(graphDiv)
        // if (view.current?.parentElement && scroll) {
        //   view.current.parentElement.scrollTop = scroll
        // }
      }
    }
  }
  const handlePanZoomChange = () => {
    if (!pzoom.current) return
    const pan = pzoom.current.getPan()
    const zoom = pzoom.current.getZoom()
    setPanZoom({ pan, zoom })
  }

  const handlePanZoom = () => {
    if (!panZoom) return
    pzoom.current?.destroy()
    pzoom.current = undefined
    Promise.resolve().then(() => {
      const graphDiv = document.querySelector<HTMLDivElement>('#graph-div')
      if (!graphDiv) return
      pzoom.current = svgPanZoom(graphDiv, {
        onPan: handlePanZoomChange,
        onZoom: handlePanZoomChange,
        controlIconsEnabled: true,
        fit: true,
        center: true
      })
      if (pan !== undefined && zoom !== undefined && Number.isFinite(zoom)) {
        pzoom.current.zoom(zoom)
        pzoom.current.pan(pan)
      }
    })
  }
  useEffect(() => {
    renderDiagram(validateCode, validateConfig)
  }, [validateCode, validateConfig, panZoom])

  useEffect(() => {
    if (autoSync || updateDiagram) {
      setValidateCodeAndConfig(debounceCode, debounceConfig)
      if (updateDiagram) setUpdateDiagram(false)
    }
  }, [debounceCode, debounceConfig, autoSync, updateDiagram])

  const timer = useRef<number>()

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (panZoom && pzoom.current) {
        if (timer.current) clearTimeout(timer.current)
        timer.current = undefined
        timer.current = setTimeout(() => {
          pzoom.current?.resize()
        }, 300)
      }
    })
  }, [])

  return (
    <Box ref={view} component="div" sx={{ height: '100%' }}>
      <Box
        id="container"
        ref={container}
        component="div"
        sx={{ height: '100%' }}
      ></Box>
    </Box>
  )
}

export default View
