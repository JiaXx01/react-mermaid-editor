import { toBase64 } from 'js-base64'
import { saveAs } from 'file-saver'

export const formatJSON = (data: unknown): string => {
  return JSON.stringify(data, undefined, 2)
}

export const svgToExport = async (
  isSvg: boolean,
  contentType?: string,
  dataType: 'base64' | 'blob' = 'base64'
): Promise<string | Blob> => {
  return new Promise(resolve => {
    const svg = document.querySelector('#container svg')
    if (!svg) return
    const box = svg.getBoundingClientRect()
    const canvas = document.createElement('canvas')
    canvas.width = box.width
    canvas.height = box.height
    const context = canvas.getContext('2d')
    context!.fillStyle = '#fff'
    context?.fillRect(0, 0, canvas.width, canvas.height)

    const svgUrl = getBase64Svg(svg, canvas.width, canvas.height)
    if (isSvg) {
      resolve(svgUrl)
    } else {
      const image = new Image()
      image.addEventListener('load', () => {
        context?.drawImage(image, 0, 0, canvas.width, canvas.height)
        if (dataType === 'base64') {
          const url = canvas.toDataURL(contentType)
          resolve(url)
        } else {
          canvas.toBlob(blob => {
            resolve(blob as Blob)
          }, contentType)
        }
      })
      image.src = svgUrl
    }
  })
}

export const getBase64Svg = (svg: Element, width?: number, height?: number) => {
  height && svg.setAttribute('height', `${height}px`)
  width && svg.setAttribute('width', `${width}px`)
  const svgString = svg.outerHTML
    .replaceAll('<br>', '<br/>')
    .replaceAll(/<img([^>]*)>/g, (_, g: string) => `<img ${g} />`)
  return `data:image/svg+xml;base64,${toBase64(svgString)}`
}

export const downloadImgAsPng = async () => {
  saveAs(await svgToExport(false), `mermaid-diagram.png`)
}

export const downloadImgAsSvg = async () => {
  saveAs(await svgToExport(true), 'mermaid-diagram.svg')
}

export const downloadJson = (json: string) => {
  const jsonUrl = `data:application/json;base64,${toBase64(json)}`
  saveAs(jsonUrl, 'mermaid-diagram.json')
}

export const importJson = (): Promise<string> => {
  return new Promise(resolve => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = 'application/json'
    fileInput.addEventListener('change', event => {
      const file = (event.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = event => {
          if (event.target) {
            const result = event.target.result
            resolve(result as string)
          }
        }
        reader.readAsText(file)
        fileInput.remove()
      }
    })
    fileInput.click()
  })
}
