type ReelProps = {
  symbol: string; // path to image or symbol name
};

const Reel = ({ symbol }: ReelProps) => {
  return (
    <div className="reel">
      <img src={symbol} alt="Slot symbol" className="symbol" />
    </div>
  );
};

export default Reel;
