import './DAppPage.css';
import { useHomeLayout } from '../../../layouts/HomeLayout';

function DAppPage() {
  const { onWalletDropdown } = useHomeLayout();

  return (
    <div className="dapp-page">
      <div className="dapp-placeholder">
        <div className="dapp-icon">
          <span style={{ fontSize: '32px' }}>🌐</span>
        </div>
        <h2>DApps</h2>
        <p>Decentralized Apps content will be here soon.</p>
        <button className="dapp-btn" onClick={onWalletDropdown} type="button">
          Connect Wallet
        </button>
      </div>
    </div>
  );
}

export default DAppPage;
