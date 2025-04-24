import Lottie from 'lottie-react';
import flowerRain from '../assets/lottie/flowerrain.json';
import candyRain from '../assets/lottie/candyrain.json';
import moneyRain from '../assets/lottie/moneyrain.json';

const animations = {
  flower: flowerRain,
  candy: candyRain,
  money: moneyRain,
};

const LottieOverlay = ({ winType }: { winType: 'flower' | 'candy' | 'money' | null }) => {
  if (!winType) return null;

  return (
    <div className="lottie-overlay">
      <Lottie animationData={animations[winType]} loop={false} />
    </div>
  );
};

export default LottieOverlay;
