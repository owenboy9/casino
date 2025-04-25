import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import flowerRain from '../assets/lottie/flowerrain.json';
import candyRain from '../assets/lottie/candyrain.json';
import moneyRain from '../assets/lottie/moneyrain.json';
import '../styles/LottieOverlay.css'; // make sure this file exists

const animations = {
  flower: flowerRain,
  candy: candyRain,
  money: moneyRain,
};

const LottieOverlay = ({ winType }: { winType: 'flower' | 'candy' | 'money' | null }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (winType) {
      setVisible(true);

      const hideTimeout = setTimeout(() => {
        setVisible(false); // trigger fade-out
      }, 2000); // show for 2s

      return () => clearTimeout(hideTimeout);
    }
  }, [winType]);

  if (!winType && !visible) return null; // don't render at all when fully done

  return (
    <div className={`lottie-overlay ${visible ? 'fade-in' : 'fade-out'}`}>
      <Lottie animationData={animations[winType as keyof typeof animations]} loop={false} />
    </div>
  );
};

export default LottieOverlay;
