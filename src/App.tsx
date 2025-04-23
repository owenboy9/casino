import slotMachine from './assets/framework/slotmachine.jpg';
import spinSign from './assets/framework/spinSign.jpg';
import neonFlicker from './assets/framework/neonFlicker.mp4';
import './styles/App.css';

function App() {
  return (
    <div className="app-container">
      <div className="top">
        <div className="left-side">
            <img src={spinSign} className="spinSign"/>
            <video src={neonFlicker} autoPlay loop muted className="neonFlicker"/>
        </div>

        <div className="right-side">
          {/* Slot Machine Background Image */}
          <img src={slotMachine} className="machine-img" />

            {/* Reels will be overlaid on the image later */}
          <div className="reels-wrapper">
            {/* Insert 5 Reel components here later */}
          </div>
        </div>
      </div>
      <div className="bottom">
        <button className="spinButton">spin</button>
      </div>
      {/* Lottie animation container (overlays the page when needed) */}
      <div className="lottie-overlay" id="win-animation">
        {/* Inject Lottie component conditionally here */}
      </div>
    </div>
  );
}

export default App;