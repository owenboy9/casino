import Lottie from "lottie-react";
import flowersAnimation from "../assets/lottie/flowerrain.json";

function WinningOverlay() {
  return (
    <div className="overlay">
      <Lottie animationData={flowersAnimation} loop={false} />
    </div>
  );
}

export default WinningOverlay;