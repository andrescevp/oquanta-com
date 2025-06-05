import React, { useState } from 'react'
import { useCalendlyEventListener, InlineWidget } from 'react-calendly'

function CalendlyInline() {
  const minHeight = '598px'
  const [height, setHeight] = useState(minHeight)
  useCalendlyEventListener({
    // onProfilePageViewed: () => console.log("onProfilePageViewed"),
    // onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
    // onEventTypeViewed: () => console.log("onEventTypeViewed"),
    // onEventScheduled: (e) => console.log(e.data.payload),
    onPageHeightResize: e => {
      const { height: pHeight } = e.data.payload
      // remove px from height
      const pHeightInt = parseInt(pHeight.replace('px', ''))
      const minHeightInt = parseInt(minHeight.replace('px', ''))
      if (pHeightInt > minHeightInt) {
        setHeight(pHeightInt + 'px')
      }
    }
  })

  return (
    <InlineWidget
      url="https://calendly.com/hola-oquanta/como-me-puede-ayudar-oquanta-a-mejorar-mi-negocio"
      styles={{
        height,
        transition: 'height 0.5s'
      }}
    />
  )
}

export default CalendlyInline
