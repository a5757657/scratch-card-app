import React, { useRef } from 'react';
import ScratchCard from 'react-scratchcard-v2';
import img from './asset/images/ckeditor-63b3e68ce1a15.jpg'
import img2 from './asset/images/788debc0-7525-11ed-bfcf-a89c3ac8d01f.jpeg'
import { Fireworks } from '@fireworks-js/react'
import './App.css'
import './styles/ScratchCard/ScratchCard.scss'

function App() {
  const ref = useRef(null);
  const fireworkRef = useRef(null);
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
  return (
    <div className="App">
      <ScratchCard
        width={300}
        height={250}
        finishPercent={60}
        image={img}
        ref={ref}
        onComplete={handleFireworkStart}
        brushSize={30}
      >
        <img
          alt=''
          src={img2}
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
      <button onClick={onClickReset}>Reset</button>
    </div>
  );
}

export default App;
