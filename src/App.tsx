import slotMachine from './assets/framework/slotmachinearrows1.jpg'; // slot machine image
import spinSign from './assets/framework/spinSign.jpg'; // spin button sign image
import neonFlicker from './assets/framework/neonFlicker.mp4'; // neon flicker video
import './styles/App.css'; // importing the css styles
import Reel from './components/Reel'; // importing the reel component
import { useState, useEffect } from 'react'; // importing react hooks
import SoundManager from './components/SoundManager'; // importing sound manager component
import LottieOverlay from './components/LottieOverlay'; // importing lottie overlay component
import { triggerBackgroundMusic } from './components/SoundManager'; // importing utility to trigger background music

function App() {
  // state variables for various aspects of the slot machine app
  const [spinTrigger, setSpinTrigger] = useState(false); // trigger for spin action
  const [playSpinButton, setPlaySpinButton] = useState(false); // play spin button sound
  const [playSpinning, setPlaySpinning] = useState(false); // play spinning sound
  const [results, setResults] = useState<string[]>([]); // to store the results of the reels
  const [winType, setWinType] = useState<null | 'flower' | 'candy' | 'money'>(null); // the win type (null if no win)

  // effect to clear the winType after 2 seconds, so the win overlay disappears
  useEffect(() => {
    if (winType) {
      const timer = setTimeout(() => {
        setWinType(null); // reset winType after 2 seconds
      }, 2000);

      return () => clearTimeout(timer); // cleanup the timeout if component re-renders quickly
    }
  }, [winType]);

  // effect to allow win type change via keyboard press (1, 2, or 3 keys)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '1') setWinType('flower');
      if (e.key === '2') setWinType('candy');
      if (e.key === '3') setWinType('money');
    };

    window.addEventListener('keydown', handleKey); // listen for keydown events
    return () => window.removeEventListener('keydown', handleKey); // cleanup listener on component unmount
  }, []);

  // function to handle the spinning action
  const handleSpin = () => {
    setResults([]);        // clear old reel results
    setWinType(null);      // reset win state before spinning
    setSpinTrigger(prev => !prev); // toggle spinTrigger to start/restart the reels
    setPlaySpinButton(true); // play the spin button sound
    setPlaySpinning(true); // play the spinning sound
    triggerBackgroundMusic(); // trigger background music to play

    // reset the sound flags after a short delay to allow them to play
    setTimeout(() => setPlaySpinButton(false), 100); // short delay for button sound
    setTimeout(() => setPlaySpinning(false), 2000); // assuming spinning sound lasts 2s
  };

  // function to handle when a reel stops, updating the results and checking for a win
  const handleReelStop = (index: number, symbol: string) => {
    setResults(prev => {
      const updated = [...prev];
      updated[index] = symbol; // update the symbol at the specific reel index
      if (updated.filter(Boolean).length === 5) { // check if all reels have stopped
        checkWin(updated); // check for a win with the updated symbols
      }
      return updated;
    });
  };

  // function to check if the player has won based on the current reel symbols
  const checkWin = (symbols: string[]) => {
    const countMap: Record<string, number> = {}; // map to count occurrences of each symbol
    symbols.forEach(sym => {
      countMap[sym] = (countMap[sym] || 0) + 1;
    });

    const counts = Object.values(countMap); // get the count of each symbol
    if (counts.includes(5)) {
      setWinType('money'); // 5 of the same symbol, big win
    } else if (counts.includes(4)) {
      setWinType('candy'); // 4 of the same symbol, medium win
    } else if (counts.includes(3)) {
      setWinType('flower'); // 3 of the same symbol, small win
    } else {
      setWinType(null); // no win
    }
  };

  return (
    <div className="app-container">
      {/* sound manager handles all sound effects */}
      <SoundManager playSpinButton={playSpinButton} playSpinning={playSpinning} winType={winType} />
      {/* lottie overlay handles the animated win effects */}
      <LottieOverlay winType={winType} />
      
      {/* top section containing the spin sign and video background */}
      <div className="top">
        <div className="left-side">
          <h1>Spin</h1>
          <h1 className="neon-glitch">to win !</h1>
        </div>

        <div className="right-side">
          <div className="machine-container">
            <img src={slotMachine} className="machine-img" alt="Slot Machine" />
            <div className="reel-overlay">
              {/* create 5 reels */}
              {[...Array(5)].map((_, index) => (
                <Reel
                  key={index}
                  spinTrigger={spinTrigger} // trigger for reel spinning
                  onStop={(symbol) => handleReelStop(index, symbol)} // handle reel stop and result
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* bottom section with the spin button */}
      <div className="bottom">
        <button className="spinButton" onClick={handleSpin}>Spin</button>
      </div>

      {/* copyright message */}
      <div className="copyright">
        <p>Playing <em>It's Just a Burning Memory</em> by The Caretaker (Stage 1)</p>
      </div>
    </div>
  );
}

export default App;
