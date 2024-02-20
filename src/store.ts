import { create, StoreApi, UseBoundStore } from 'zustand'
import { formatJSON } from './utils/utils'

export type EditorMode = 'code' | 'config'

export interface MarkerData {
  severity: number
  config: string
  source?: string
  startLineNumber: number
  startColumn: number
  endLineNumber: number
  endColumn: number
}

export interface State {
  code: string
  config: string
  autoSync: boolean
  editorMode: EditorMode
  panZoom: boolean
  pan?: { x: number; y: number }
  zoom?: number
}

interface Action {
  setCode: (code: string) => void
  setConfig: (mermaid: string) => void
  setEditorMode: (mode: EditorMode) => void
  setAutoSync: (autoSync: boolean) => void
}

export const useStateStore = create<State & Action>()(set => ({
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

  setCode: code => set(() => ({ code })),
  setConfig: config => set(() => ({ config })),
  setEditorMode: mode => set(() => ({ editorMode: mode })),
  setAutoSync: autoSync => set(() => ({ autoSync }))
}))

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
