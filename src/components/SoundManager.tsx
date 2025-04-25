import { useEffect, useRef } from 'react';
// Importing the sound assets used in the slot machine
import background from '../assets/sounds/caretaker.mp3';
import spinButton from '../assets/sounds/spinButton.wav';
import spinning from '../assets/sounds/spinning.wav';
import flowerWin from '../assets/sounds/flowerwin.mp3';
import candyWin from '../assets/sounds/candywin.wav';
import moneyWin from '../assets/sounds/money.wav';

// Define a type for possible win types
type WinType = 'flower' | 'candy' | 'money' | null;

// Define types for the props that SoundManager will receive
type SoundManagerProps = {
  playSpinButton: boolean; // whether to play the spin button sound
  playSpinning: boolean; // whether to play the spinning sound
  winType: WinType; // the type of win (if any) to trigger the corresponding win sound
};

const SoundManager = ({ playSpinButton, playSpinning, winType }: SoundManagerProps) => {
  // Refs to hold the audio elements for each sound
  const bgMusic = useRef<HTMLAudioElement | null>(null);
  const spinButtonSound = useRef<HTMLAudioElement | null>(null);
  const spinningSound = useRef<HTMLAudioElement | null>(null);
  const flowerWinSound = useRef<HTMLAudioElement | null>(null);
  const candyWinSound = useRef<HTMLAudioElement | null>(null);
  const moneyWinSound = useRef<HTMLAudioElement | null>(null);

  // Load all audio files once on component mount
  useEffect(() => {
    bgMusic.current = new Audio(background); // background music
    bgMusic.current.loop = true; // loop background music
    bgMusic.current.volume = 0.06; // set background music volume to 6%
    bgMusic.current.play().catch(() => {
      // Catch any errors if autoplay is blocked in some browsers
    });

    // Set up win sounds with specific volumes
    flowerWinSound.current = new Audio(flowerWin);
    flowerWinSound.current.volume = 0.3; // set volume to 30%
    candyWinSound.current = new Audio(candyWin);
    candyWinSound.current.volume = 0.3; // set volume to 30%
    moneyWinSound.current = new Audio(moneyWin);
    moneyWinSound.current.volume = 1; // set volume to 100%
    
    // Set up the button and spinning sounds
    spinButtonSound.current = new Audio(spinButton);
    spinningSound.current = new Audio(spinning);
  }, []); // empty dependency array ensures this runs only once on mount

  // Play spin button sound when triggered
  useEffect(() => {
    if (playSpinButton && spinButtonSound.current) {
      spinButtonSound.current.currentTime = 0; // reset to the beginning
      spinButtonSound.current.play(); // play the sound
    }
  }, [playSpinButton]); // trigger when playSpinButton changes

  // Play spinning sound when triggered
  useEffect(() => {
    if (playSpinning && spinningSound.current) {
      spinningSound.current.currentTime = 0; // reset to the beginning
      spinningSound.current.play(); // play the sound
    }
  }, [playSpinning]); // trigger when playSpinning changes

  // Handle user interaction to start the background music
  const handleUserInteraction = () => {
    if (bgMusic.current && bgMusic.current.paused) {
      bgMusic.current
        .play() // try to play the music
        .catch((e) => console.warn('Autoplay prevented:', e)); // catch error if autoplay is blocked
    }
  };

  // Listen for the custom event to trigger background music play
  useEffect(() => {
    const onPlayRequest = () => handleUserInteraction(); // define handler to start music
    window.addEventListener('play-bg-music', onPlayRequest); // listen for play request event
    return () => window.removeEventListener('play-bg-music', onPlayRequest); // cleanup listener on unmount
  }, []); // only run once, on component mount

  // Play the corresponding win sound when a win type is set
  useEffect(() => {
    if (!winType) return; // if no win, don't play any win sound

    const soundMap: Record<Exclude<WinType, null>, HTMLAudioElement | null> = {
      flower: flowerWinSound.current,
      candy: candyWinSound.current,
      money: moneyWinSound.current,
    };

    const sound = soundMap[winType]; // get the correct sound based on winType
    if (sound) {
      sound.currentTime = 0; // reset to the beginning
      sound.play(); // play the win sound
    }
  }, [winType]); // trigger when winType changes

  return null; // This component doesn't render anything, it just manages sounds
};

// Utility function to trigger background music play from elsewhere in the app
export const triggerBackgroundMusic = () => {
  const event = new CustomEvent('play-bg-music'); // create a custom event
  window.dispatchEvent(event); // dispatch the event to start playing background music
};

export default SoundManager; // export the SoundManager component
