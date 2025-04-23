import { useState, useEffect } from 'react';
import '../styles/Reel.css';

import bar from "../assets/slots/bar.png";
import cherry from "../assets/slots/cherry.png";
import diamond from "../assets/slots/diamond.png";
import lemon from "../assets/slots/lemon.png";
import orange from "../assets/slots/orange.png";
import plum from "../assets/slots/plum.png";
import seven from "../assets/slots/seven.png";
import cherries from "../assets/slots/cherries.png";
import crown from "../assets/slots/crown.png";
import grapes from "../assets/slots/grapes.png";
import jackpot from "../assets/slots/jackpot.png";
import watermelon from "../assets/slots/watermelon.png";

const symbols = [
  bar,
  cherry,
  diamond,
  lemon,
  orange,
  plum,
  seven,
  cherries,
  crown,
  grapes,
  jackpot,
  watermelon,
];

type ReelProps = {
  spinTrigger: boolean;
};

const spinningSymbols = [...symbols, ...symbols, ...symbols];

const Reel = ({ spinTrigger }: ReelProps) => {
  const [position, setPosition] = useState(0);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    if (!spinning) {
      setSpinning(true);
      const totalSymbols = symbols.length;
      let count = 0;

      const interval = setInterval(() => {
        setPosition((prev) => (prev + 1) % totalSymbols);
        count++;

        if (count > totalSymbols + Math.floor(Math.random() * 10)) {
          clearInterval(interval);
          setSpinning(false);
        }
      }, 80);
    }
  }, [spinTrigger]);

  return (
    <div className="reel-window">
      <div
        className="reel-strip"
        style={{
          transform: `translateY(-${position * 60}px)`,
          transition: 'transform 0.1s ease',
        }}
      >
        {spinningSymbols.map((sym, i) => (
          <img src={sym} alt={`symbol ${i}`} key={i} className="symbol-img" />
        ))}

      </div>
    </div>
  );
};

export default Reel;
