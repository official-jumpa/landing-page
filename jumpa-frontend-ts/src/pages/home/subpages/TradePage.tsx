import './TradePage.css';
import tradeIcon from '../../../assets/icons/navigation/trade.svg';

function TradePage() {
  return (
    <div className="trade-page">
      <div className="trade-placeholder">
        <div className="trade-icon">
          <img src={tradeIcon} alt="Trade" width="48" height="48" />
        </div>
        <h2>Trade Assets</h2>
        <p>Swap and manage your digital assets with ease.</p>
        <span className="trade-badge">Coming Soon</span>
      </div>
    </div>
  );
}

export default TradePage;
