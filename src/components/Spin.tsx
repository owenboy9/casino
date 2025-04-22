import Reel from './Reel';
import { useState } from 'react';
import cherry from '../assets/slots/cherry.png';
// import all other symbols

const symbols = [cherry, /* lemon, bell, etc. */];

const Spin = () => {
  const [reels, setReels] = useState<string[]>([cherry, cherry, cherry]);

  const handleSpin = () => {
    const newReels = Array.from({ length: 3 }, () =>
      symbols[Math.floor(Math.random() * symbols.length)]
    );
    setReels(newReels);

    // Optional: checkWinnings(newReels)
  };

  return (
    <div>
      <div className="reels">
        {reels.map((symbol, index) => (
          <Reel key={index} symbol={symbol} />
        ))}
      </div>
      <button onClick={handleSpin}>Spin</button>
    </div>
  );
};

export default Spin;
