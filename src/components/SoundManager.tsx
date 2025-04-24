import { useEffect, useRef } from 'react';
import background from '../assets/sounds/caretaker.mp3';
import spinButton from '../assets/sounds/spinButton.wav';
import spinning from '../assets/sounds/spinning.wav';

type SoundManagerProps = {
  playSpinButton: boolean;
  playSpinning: boolean;
};

const SoundManager = ({ playSpinButton, playSpinning }: SoundManagerProps) => {
  const bgMusic = useRef<HTMLAudioElement | null>(null);
  const spinButtonSound = useRef<HTMLAudioElement | null>(null);
  const spinningSound = useRef<HTMLAudioElement | null>(null);

  // Load audio files once
  useEffect(() => {
    bgMusic.current = new Audio(background);
    bgMusic.current.loop = true;
    bgMusic.current.volume = 0.3;
    bgMusic.current.play().catch(() => {
      // Autoplay may fail in some browsers until user interaction
    });

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

  return null;
};

export default SoundManager;
