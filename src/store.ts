import { create, StoreApi, UseBoundStore } from 'zustand'
import { formatJSON } from './utils/utils'
import { persist } from 'zustand/middleware'

export type EditorMode = 'code' | 'config'

export interface State {
  code: string
  config: string
  autoSync: boolean
  editorMode: EditorMode
  panZoom: boolean
  pan?: { x: number; y: number }
  zoom?: number
  updateDiagram: boolean
  svg: string
  validateCode: string
  validateConfig: string
}

interface Action {
  setCode: (code: string) => void
  setConfig: (mermaid: string) => void
  setEditorMode: (mode: EditorMode) => void
  setAutoSync: (autoSync: boolean) => void
  setPanZoomEnable: (enable: boolean) => void
  setPanZoom: (panZoom: { pan: { x: number; y: number }; zoom: number }) => void
  setUpdateDiagram: (isUpdate: boolean) => void
  setSvg: (svg: string) => void
  setValidateCode: (code: string) => void
  setValidateConfig: (config: string) => void
}

export const useStateStore = create<State & Action>()(
  persist(
    set => ({
      code: `flowchart TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
  `,
      config: formatJSON({
        theme: 'default'
      }),
      autoSync: true,
      editorMode: 'code',
      panZoom: false,
      updateDiagram: false,
      svg: '',
      validateCode: '',
      validateConfig: '',

      setCode: code => set(() => ({ code })),
      setConfig: config => set(() => ({ config })),
      setEditorMode: mode => set(() => ({ editorMode: mode })),
      setAutoSync: autoSync => set(() => ({ autoSync })),
      setPanZoomEnable: enable => set(() => ({ panZoom: enable })),
      setPanZoom: panZoom =>
        set(() => ({
          pan: panZoom.pan,
          zoom: panZoom.zoom
        })),
      setUpdateDiagram: isUpdate => set(() => ({ updateDiagram: isUpdate })),
      setSvg: svg => set(() => ({ svg })),
      setValidateCode: code => set(() => ({ validateCode: code })),
      setValidateConfig: config => set(() => ({ validateConfig: config }))
    }),
    {
      name: 'mermaid-storage',
      partialize: state => ({
        autoSync: state.autoSync,
        panZoom: state.panZoom
      })
    }
  )
)

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  const store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (const k of Object.keys(store.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-extra-semi
    ;(store.use as any)[k] = () => store(s => s[k as keyof typeof s])
  }

  return store
}

export const useStore = createSelectors(useStateStore)

export const getJsonData = () => {
  const code = useStore.getState().validateCode
  const config = useStore.getState().validateConfig
  const json = {
    code,
    config: JSON.parse(config)
  }
  return JSON.stringify(json, null, 2)
}
