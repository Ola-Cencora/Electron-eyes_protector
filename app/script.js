import React from 'react';
import { render } from 'react-dom';
import { useState } from 'react';

const App = () => {

  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);

  const formatTime = (sec) => {
    /*if (sec === 0) {
      playBell();
      setStatus(status === 'work' ? 'rest' : 'work');
      setTime(status === 'work' ? 20 : 1200); 
    }*/

    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return (
        `${formattedMinutes}:${formattedSeconds}`
    );
  };

  const startTimer = () => {
    setTime(5);
    setStatus('work');
    setTimer(
      setInterval(() => {
        setTime(prevTime => {
          if (prevTime < 1) {
            playBell();
            setStatus(status => (status === 'work' ? 'rest' : 'work'));
            setTime(status === 'work' ? 2 : 7);
          }
          return prevTime - 1;
        });
      }, 1000)
    );
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTime(0);
    setStatus('off');
  };

  const closeApp = () => {
    window.close();
  };

  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };
  
  return (
    <div>
      <h1>Protect your eyes</h1>
      { status === 'off' && (
      <div>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
        <button onClick={startTimer} className="btn">Start</button>
      </div>
      )}
      { status === 'work' && (
        <img src="./images/work.png" />
      )}
      { status === 'rest' && (
        <img src="./images/rest.png" />
      )}
      { status !== 'off' && (
        <div>
          <div className="timer">
            {formatTime(time)}
          </div>
          <button onClick={stopTimer} className="btn">Stop</button>
        </div>
      )}
      <button onClick={closeApp} className="btn btn-close">X</button>
    </div>
  )
};

render(<App />, document.querySelector('#app'));
