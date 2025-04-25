import { useEffect, useRef } from 'react';
import background from '../assets/sounds/caretaker.mp3';
import spinButton from '../assets/sounds/spinButton.wav';
import spinning from '../assets/sounds/spinning.wav';
import flowerWin from '../assets/sounds/flowerwin.mp3';
import candyWin from '../assets/sounds/candywin.wav';
import moneyWin from '../assets/sounds/money.wav';

type WinType = 'flower' | 'candy' | 'money' | null;

type SoundManagerProps = {
  playSpinButton: boolean;
  playSpinning: boolean;
  winType: WinType;
};

const SoundManager = ({ playSpinButton, playSpinning, winType }: SoundManagerProps) => {
  const bgMusic = useRef<HTMLAudioElement | null>(null);
  const spinButtonSound = useRef<HTMLAudioElement | null>(null);
  const spinningSound = useRef<HTMLAudioElement | null>(null);
  const flowerWinSound = useRef<HTMLAudioElement | null>(null);
  const candyWinSound = useRef<HTMLAudioElement | null>(null);
  const moneyWinSound = useRef<HTMLAudioElement | null>(null);

  // Load audio files once
  useEffect(() => {
    bgMusic.current = new Audio(background);
    bgMusic.current.loop = true;
    bgMusic.current.volume = 0.06; // Set volume to 6%
    bgMusic.current.play().catch(() => {
      // Autoplay may fail in some browsers until user interaction
    });

    flowerWinSound.current = new Audio(flowerWin);
    flowerWinSound.current.volume = 0.3; // Set volume to 20%
    candyWinSound.current = new Audio(candyWin);
    candyWinSound.current.volume = 0.3; // Set volume to 20%
    moneyWinSound.current = new Audio(moneyWin);
    moneyWinSound.current.volume = 1; // Set volume to 100%
    spinButtonSound.current = new Audio(spinButton);
    spinningSound.current = new Audio(spinning);
  }, []);

  // Play button sound when triggered
  useEffect(() => {
    if (playSpinButton && spinButtonSound.current) {
      spinButtonSound.current.currentTime = 0;
      spinButtonSound.current.play();
    }
  }, [playSpinButton]);

  // Play spinning sound when triggered
  useEffect(() => {
    if (playSpinning && spinningSound.current) {
      spinningSound.current.currentTime = 0;
      spinningSound.current.play();
    }
  }, [playSpinning]);

  const handleUserInteraction = () => {
    if (bgMusic.current && bgMusic.current.paused) {
      bgMusic.current
        .play()
        .catch((e) => console.warn('Autoplay prevented:', e));
    }
  };

  useEffect(() => {
    const onPlayRequest = () => handleUserInteraction();
    window.addEventListener('play-bg-music', onPlayRequest);
    return () => window.removeEventListener('play-bg-music', onPlayRequest);
  }, []);


  useEffect(() => {
    if (!winType) return;

    const soundMap: Record<Exclude<WinType, null>, HTMLAudioElement | null> = {
      flower: flowerWinSound.current,
      candy: candyWinSound.current,
      money: moneyWinSound.current,
    };

    const sound = soundMap[winType];
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }, [winType]);

  return null;
};

export default SoundManager;

export const triggerBackgroundMusic = () => {
  const event = new CustomEvent('play-bg-music');
  window.dispatchEvent(event);
};
