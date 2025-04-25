import slotMachine from './assets/framework/slotmachinearrows1.jpg';
import spinSign from './assets/framework/spinSign.jpg';
import neonFlicker from './assets/framework/neonFlicker.mp4';
import './styles/App.css';
import Reel from './components/Reel';
import { useState, useEffect } from 'react';
import SoundManager from './components/SoundManager';
import LottieOverlay from './components/LottieOverlay';
import { triggerBackgroundMusic } from './components/SoundManager';


function App() {
  const [spinTrigger, setSpinTrigger] = useState(false);
  const [playSpinButton, setPlaySpinButton] = useState(false);
  const [playSpinning, setPlaySpinning] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [winType, setWinType] = useState<null | 'flower' | 'candy' | 'money'>(null);

  useEffect(() => {
    if (winType) {
      const timer = setTimeout(() => {
        setWinType(null); // clear the win type after 2 seconds
      }, 2000);

      return () => clearTimeout(timer); // cleanup if component re-renders quickly
    }
  }, [winType]);

  useEffect(() => {
  const handleKey = (e: KeyboardEvent) => {
    if (e.key === '1') setWinType('flower');
    if (e.key === '2') setWinType('candy');
    if (e.key === '3') setWinType('money');
  };
  window.addEventListener('keydown', handleKey);
  return () => window.removeEventListener('keydown', handleKey);
}, []);

  const handleSpin = () => {
  setResults([]);        // Clear old reel results
  setWinType(null);     // Clear previous win state
  setSpinTrigger(prev => !prev);
  setPlaySpinButton(true);
  setPlaySpinning(true);
  triggerBackgroundMusic();

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
      <LottieOverlay winType={winType} />
      <div className="top">
        <div className="left-side">
          <img src={spinSign} className="spinSign" />
          <div className="video-cropper">
            <video src={neonFlicker} autoPlay loop muted className="neonFlicker" />
          </div>
        </div>

        <div className="right-side">
          <div className="machine-container">
            <img src={slotMachine} className="machine-img" alt="Slot Machine" />
            <div className="reel-overlay">
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
      </div>

      <div className="bottom">
        <button className="spinButton" onClick={handleSpin}>spin</button>
      </div>

      <div className="copyright">
        <p>playing <em>it's just a burning memory</em>. the caretaker (stage 1)</p>
      </div>
    </div>
  );
}

export default App;
