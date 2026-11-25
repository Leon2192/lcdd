import { useState } from 'react'
import { IconButton } from '@/components/ui/IconButton'
import { Icon } from '@/components/ui/Icon'

const message = 'Tenemos combos perfectos para tu evento ✦'

export function CommercialStrip() {
  const [paused, setPaused] = useState(false)

  return (
    <div className="home-commercial-strip" data-paused={paused}>
      <span className="sr-only">{message}</span>
      <div className="home-strip-window" aria-hidden="true">
        <div className="home-strip-track">
          {[0, 1].map((copy) => (
            <div className="home-strip-repeat" key={copy}>
              <span>{message}</span>
              <span>{message}</span>
            </div>
          ))}
        </div>
        <span className="home-strip-static">{message}</span>
      </div>
      <IconButton
        label={paused ? 'Reanudar franja comercial' : 'Pausar franja comercial'}
        className="home-strip-control"
        onClick={() => setPaused(!paused)}
      >
        <Icon name={paused ? 'play' : 'pause'} />
      </IconButton>
    </div>
  )
}
