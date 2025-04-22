// Example: src/components/SoundManager.tsx

import { useEffect, useRef } from 'react';

const SoundManager = ({ state }: { state: 'idle' | 'spinning' | 'win' | 'lose' }) => {
  const bgMusic = useRef(new Audio('/assets/sounds/background.mp3'));
  const spinSound = useRef(new Audio('/assets/sounds/spin.mp3'));
  const winSound = useRef(new Audio('/assets/sounds/win.mp3'));
  const loseSound = useRef(new Audio('/assets/sounds/lose.mp3'));

  useEffect(() => {
    bgMusic.current.loop = true;
    bgMusic.current.volume = 0.4;
    bgMusic.current.play().catch(() => {
      // some browsers block autoplay, you can handle it gracefully
    });
  }, []);

  useEffect(() => {
    if (state === 'spinning') {
      spinSound.current.play();
    } else if (state === 'win') {
      winSound.current.play();
    } else if (state === 'lose') {
      loseSound.current.play();
    }
  }, [state]);

  return null;
};

export default SoundManager;
