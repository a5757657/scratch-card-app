import React, { useRef, useLayoutEffect, useState } from 'react';
import ScratchCard from 'react-scratchcard-v2';
import { Fireworks } from '@fireworks-js/react'
import logo from '.././asset/images/scratch-card/logo.jpg'
import scratchSection from '.././asset/images/scratch-card/scratch-section.jpg'
import benz from '.././asset/images/scratch-card/001.jpeg'
import '.././styles/ScratchCardContainer.scss'

const ScratchCardContainer = () => {
  const ref = useRef(null);
  const fireworkRef = useRef(null);
  const [style, setStyle] = useState({ width: 0, height: 0 })
  const [isSafari, setIsSafari] = useState(false)

  const onClickReset = () => {
    ref.current && ref.current.reset();
    fireworkRef.current.stop()
  }

  const handleFireworkStart = () => {
    fireworkRef.current.start()
    setTimeout(() => {
      fireworkRef.current.stop()
      clearTimeout()
    }, 5000);
  }
  
  useLayoutEffect(() => {
    const userAgent = window.navigator.userAgent
    if (
      !(userAgent.indexOf('CriOS') > -1 || 
        userAgent.indexOf('FxiOS') > -1 ||
        userAgent.indexOf('EdgiOS') > -1) && userAgent.indexOf('iPhone') > -1
    ) {
      setIsSafari(true)
    }
    const innerWidth = window.innerWidth > 500 ? 500 : window.innerWidth
    const height = Math.round(window.innerHeight - (innerWidth * 0.86) - 40)
    const setHeight = height >= 500 ? 470 : height
    const width = innerWidth - 30
    setStyle({ width: width, height: setHeight })
  }, [])
  
  return (
    <div className="container" onDoubleClick={onClickReset} style={{ touchAction: isSafari ? 'none' : 'auto' }}>
    {/* <h2>{window.navigator.userAgent}</h2> */}
      <img src={logo} alt="" />
      <div className="bottom">
        <div className="bg">
          <ScratchCard
            width={style.width}
            height={style.height}
            finishPercent={60}
            image={scratchSection}
            ref={ref}
            onComplete={handleFireworkStart}
            brushSize={30}
          >
            <img
              alt=''
              src={benz}
              style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                objectFit: 'cover',
              }}
            />
          </ScratchCard>
        </div>
        <div className="border"></div>
      </div>
      <Fireworks
        ref={fireworkRef}
        autostart={false}
        options={{
          friction: 0.9,
          gravity: 0,
          particles: 200,
          traceSpeed: 5,
          lineWidth: {
            explosion: {
              min: 1,
              max: 7
            },
          },
        }}
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          position: 'fixed',
          zIndex: 99,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

export default ScratchCardContainer