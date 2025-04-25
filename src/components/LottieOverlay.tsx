import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import flowerRain from '../assets/lottie/flowerrain.json';
import candyRain from '../assets/lottie/candyrain.json';
import moneyRain from '../assets/lottie/moneyrain.json';
import '../styles/LottieOverlay.css'; // css file for fade-in and fade-out transitions

// mapping win types to their respective lottie animation data
const animations = {
  flower: flowerRain,
  candy: candyRain,
  money: moneyRain,
};

// the overlay component that displays a lottie animation based on winType
const LottieOverlay = ({ winType }: { winType: 'flower' | 'candy' | 'money' | null }) => {
  const [visible, setVisible] = useState(false); // controls fade state

  useEffect(() => {
    if (winType) {
      setVisible(true); // trigger fade-in

      const hideTimeout = setTimeout(() => {
        setVisible(false); // trigger fade-out after 2 seconds
      }, 2000);

      return () => clearTimeout(hideTimeout); // cleanup in case winType changes early
    }
  }, [winType]);

  // if there's no win type and not currently fading, don't render the overlay at all
  if (!winType && !visible) return null;

  return (
    <div className={`lottie-overlay ${visible ? 'fade-in' : 'fade-out'}`}>
      <Lottie animationData={animations[winType as keyof typeof animations]} loop={false} />
    </div>
  );
};

export default LottieOverlay;
