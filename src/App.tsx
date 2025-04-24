import slotMachine from './assets/framework/slotmachinearrows1.jpg';
import spinSign from './assets/framework/spinSign.jpg';
import neonFlicker from './assets/framework/neonFlicker.mp4';
import './styles/App.css';
import Reel from './components/Reel';
import { useState } from 'react';
import SoundManager from './components/SoundManager';


function App() {
  const [spinTrigger, setSpinTrigger] = useState(false);
  const [playSpinButton, setPlaySpinButton] = useState(false);
  const [playSpinning, setPlaySpinning] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [winType, setWinType] = useState<null | 'flower' | 'candy' | 'money'>(null);

  const handleSpin = () => {
  setSpinTrigger(prev => !prev);
  setPlaySpinButton(true);
  setPlaySpinning(true);
  setResults([]);
  setWinType(null);

  // Reset the flags shortly after playing
  setTimeout(() => setPlaySpinButton(false), 100); // short delay to allow sound to trigger
  setTimeout(() => setPlaySpinning(false), 2000); // assumes 2s spinning sound
  };

  const handleReelStop = (index: number, symbol: string) => {
  setResults(prev => {
    const updated = [...prev];
    updated[index] = symbol;
    if (updated.filter(Boolean).length === 5) {
      checkWin(updated);
    }
    return updated;
    });
  };

  const checkWin = (symbols: string[]) => {
    const countMap: Record<string, number> = {};
    symbols.forEach(sym => {
      countMap[sym] = (countMap[sym] || 0) + 1;
    });

    const counts = Object.values(countMap);
    if (counts.includes(5)) {
      setWinType('money');
    } else if (counts.includes(4)) {
      setWinType('candy');
    } else if (counts.includes(3)) {
      setWinType('flower');
    } else {
      setWinType(null); // optional, if you want to clear any previous win
    }
  };


  return (
    <div className="app-container">
      <SoundManager playSpinButton={playSpinButton} playSpinning={playSpinning} winType={winType}/>
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
              <Reel 
              key={index} 
              spinTrigger={spinTrigger} 
              onStop={(symbol) => handleReelStop(index, symbol)}
              />
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
