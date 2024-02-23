import { useStore } from '../store'

export const generateJsonData = () => {
  const code = useStore.getState().code
  const config = useStore.getState().config
  const data = {
    code,
    config: JSON.parse(config)
  }
  const json = JSON.stringify(data)
  return json
}
