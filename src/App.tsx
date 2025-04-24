import slotMachine from './assets/framework/slotmachinearrows1.jpg';
import spinSign from './assets/framework/spinSign.jpg';
import neonFlicker from './assets/framework/neonFlicker.mp4';
import './styles/App.css';
import Reel from './components/Reel';
import { useState } from 'react';

function App() {
  const [spinTrigger, setSpinTrigger] = useState(false);

  const handleSpin = () => {
    // This toggles the prop to retrigger useEffect in Reel
    setSpinTrigger(prev => !prev);
  };

  return (
    <div className="app-container">
      <div className="top">
        <div className="left-side">
          <img src={spinSign} className="spinSign" />
          <div className="video-cropper">
            <video src={neonFlicker} autoPlay loop muted className="neonFlicker" />
          </div>
        </div>

        <div className="right-side">
          <img src={slotMachine} className="machine-img" />
          <div className="reels-wrapper">
            {[...Array(5)].map((_, index) => (
              <Reel key={index} spinTrigger={spinTrigger} />
            ))}
          </div>
        </div>
      </div>

      <div className="bottom">
        <button className="spinButton" onClick={handleSpin}>spin</button>
      </div>

      <div className="lottie-overlay" id="win-animation"></div>
    </div>
  );
}

export default App;
