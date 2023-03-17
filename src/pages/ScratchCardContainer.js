import React, { useRef, useEffect, useState } from 'react';
import ScratchCard from 'react-scratchcard-v2';
import { Fireworks } from '@fireworks-js/react'
import img from '.././asset/images/scratch-card/scratch-section.png'
import benz from '.././asset/images/scratch-card/benz.jpg'
import logo from '.././asset/images/scratch-card/logo.png'
import '.././styles/ScratchCardContainer.scss'
import AOS from 'aos';
import 'aos/dist/aos.css'

const ScratchCardContainer = () => {
  const ref = useRef(null);
  const fireworkRef = useRef(null);
  const [height, setHeight] = useState('fit-content')

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

  const setLogoHeight = () => {
    if (window.innerWidth > window.innerHeight) {
      setHeight(window.innerHeight - 130)
    } else {
      setHeight('fit-content')
    }
  }

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    })
    setLogoHeight()
    window.addEventListener('resize', setLogoHeight)
    return () => {
      window.removeEventListener('resize', setLogoHeight)
    }
  }, [])
  
  return (
    <div className="container" onDoubleClick={onClickReset}>
      <div data-aos="fade-in" data-aos-delay="300" className="top" style={{ height: height, marginTop: height === 'fit-content' ? -50 : -80 }}>
          <img src={logo} alt=""/>
      </div>
      <div data-aos="fade-in" data-aos-delay="600" className="bottom">
        <div className="bg">
          <ScratchCard
            width={300}
            height={80}
            finishPercent={50}
            image={img}
            ref={ref}
            onComplete={handleFireworkStart}
            brushSize={20}
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