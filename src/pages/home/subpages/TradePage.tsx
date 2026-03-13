import './TradePage.css';
import tradeIcon from '../../../assets/icons/navigation/trade.svg';
import { useHomeLayout } from '../../../layouts/HomeLayout';

function TradePage() {
  const { onWalletDropdown } = useHomeLayout();

  return (
    <div className="trade-page">
      <div className="trade-placeholder">
        <div className="trade-icon">
          <img src={tradeIcon} alt="Trade" width="48" height="48" />
        </div>
        <h2>Trade Assets</h2>
        <p>Swap and manage your digital assets with ease.</p>
        <button className="trade-btn" onClick={onWalletDropdown} type="button">
          Select Asset
        </button>
        <span className="trade-badge">Coming Soon</span>
      </div>
    </div>
  );
}

export default TradePage;
