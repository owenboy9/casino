import { useState, useEffect } from 'react';
import '../styles/Reel.css';

// importing symbols for the slot machine
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

// list of all slot machine symbols
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

// type definition for the reel component props
type ReelProps = {
  spinTrigger: boolean; // whether the spin is triggered
  onStop: (result: string) => void; // callback when spin stops with the result
};

// duplicate symbols for spinning effect
const spinningSymbols = [...symbols, ...symbols, ...symbols];

const Reel = ({ spinTrigger, onStop }: ReelProps) => {
  const [position, setPosition] = useState(0); // track the current position of the reel
  const [spinning, setSpinning] = useState(false); // whether the reel is currently spinning

  useEffect(() => {
    if (!spinning) {
      setSpinning(true); // start spinning when triggered

      const totalSymbols = symbols.length; // number of symbols in one set
      let count = 0; // counter to keep track of spins
      const minSpins = totalSymbols * 2; // minimum number of spins
      const extraSpins = Math.floor(Math.random() * 15); // random extra spins
      const spinCountTarget = minSpins + extraSpins; // total target spins

      let finalIndex = 0; // final symbol to stop at

      // interval to move through the symbols at a given speed
      const interval = setInterval(() => {
        finalIndex = (finalIndex + 1) % totalSymbols; // move to next symbol
        setPosition(finalIndex); // update the position
        count++; // increment the counter

        // stop the spin when reaching the target spin count
        if (count >= spinCountTarget) {
          clearInterval(interval); // stop the interval
          setSpinning(false); // set spinning state to false
          const finalSymbol = spinningSymbols[finalIndex]; // get final symbol
          if (onStop) onStop(finalSymbol); // trigger callback with final symbol
        }
      }, 60); // set the interval to 60ms to control spin speed
    }
  }, [spinTrigger]); // re-run this effect when spinTrigger changes

  return (
    <div className="reel-window">
      <div
        className="reel-strip"
        style={{
          transform: `translateY(-${position * 60}px)`, // move the strip to simulate spinning
          transition: 'transform 0.1s ease', // smooth transition for the reel movement
        }}
      >
        {/* render all symbols on the reel */}
        {spinningSymbols.map((sym, i) => (
          <img src={sym} alt={`symbol ${i}`} key={i} className="symbol-img" />
        ))}
      </div>
    </div>
  );
};

export default Reel;
