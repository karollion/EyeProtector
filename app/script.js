import React from 'react';
import { render } from 'react-dom';
import { useState, useEffect } from 'react';

const App = () => {
  const [statusApp, setStatusApp] = useState('off');
  const [time, setTime] = useState (0);
  const [timer, setTimer] = useState (null);
  const audioElement = new Audio("./sounds/bell.wav");
  const workTime = 1200;
  const restTime = 20;

  const handleStart = () => {
    setStatusApp('work');
    setTime(workTime);
    startTimer();
  }

  const handleStop = () => {
    setStatusApp('off');
    clearInterval(timer);
    setTimer(null);
    setTime(0);
  }

  const playBell = () => {
    audioElement.play();
  }

  const closeApp = () => {
    window.close()
  }

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  const formatTime = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;
  
    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds,)}`;
  };

  const startTimer = () => {
    if(timer == null){
      setTimer(setInterval(() => {
        setTime(time => time - 1);
      }, 1000));
    }
  };
  
  useEffect(() => {
    return () => {
      if(timer) clearInterval(timer);
    };
  }, []);
  
  if (time === 0 && statusApp === 'work') {
    playBell();
    setTime(restTime);
    setStatusApp('rest');
  } else if (time === 0 && statusApp === 'rest') {
    playBell();
    setTime(workTime);
    setStatusApp('work');
  }

  return (
    <div>
      <h1>Protect your eyes</h1>
      {statusApp === 'off'  ? (
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      ): null }
      {statusApp === 'work' ? (<img src="./images/work.png" />): null }
      {statusApp === 'rest'  ? (<img src="./images/rest.png" />): null }
      {statusApp  !== 'off' ? (
        <div className='timer'>
          {formatTime(time)}
        </div>): null }
      {statusApp === 'off' ? (<button className="btn" onClick={handleStart}>Start</button>): null }
      {statusApp  !== 'off'  ? (<button className="btn" onClick={handleStop}>Stop</button>): null }
      <button className="btn btn-close" onClick={closeApp}>X</button>
    </div>
  )
};

render(<App />, document.querySelector('#app'));
