import { Box, Button, Dialog, IconButton, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import {
  ReactElement,
  forwardRef,
  Ref,
  useState,
  useRef,
  useEffect
} from 'react'
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useStore } from '../store'

const Transition = forwardRef(
  (props: TransitionProps & { children: ReactElement }, ref: Ref<unknown>) => {
    return <Slide direction="up" ref={ref} {...props} />
  }
)

const FullScreen = () => {
  const [open, setOpen] = useState(false)
  const svg = useStore.use.svg()
  const fullScreenView = useRef<HTMLDivElement>(null)

  useEffect(() => {
    Promise.resolve().then(() => {
      if (svg && open && fullScreenView.current) {
        fullScreenView.current.innerHTML = svg
        const svgDom = fullScreenView.current.querySelector('svg')
        if (!svgDom) return
        svgDom.setAttribute('height', '100%')
        svgDom.style.maxWidth = '100%'
      }
    })
  }, [svg, open])
  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="secondary"
        startIcon={<FullscreenRoundedIcon />}
        sx={{ flexGrow: 1, whiteSpace: 'nowrap' }}
        onClick={() => setOpen(true)}
      >
        Full Screen
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <IconButton
          sx={{ position: 'absolute' }}
          onClick={() => setOpen(false)}
        >
          <CloseRoundedIcon />
        </IconButton>
        <Box sx={{ height: '100%' }} ref={fullScreenView}></Box>
      </Dialog>
    </>
  )
}

export default FullScreen
