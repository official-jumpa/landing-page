import React, { useState } from 'react';
import { mainWallet } from '../../../data/wallets';
import walletOrb from '../../../assets/images/illustrations/wallet-orb.png';
import chevronDown from '../../../assets/icons/actions/chevron-down.svg';
import copyIcon from '../../../assets/icons/actions/copy.svg';

interface WalletSelectorCardProps {
  onDropdown: () => void;
}

const WalletSelectorCard: React.FC<WalletSelectorCardProps> = ({ onDropdown }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(mainWallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="wallet-selector">
      <div className="wallet-selector-left">
        <img src={walletOrb} alt="" className="wallet-orb" />
        <div className="wallet-info">
          <span className="wallet-name">{mainWallet.name}</span>
          <div className="wallet-address-row">
            <span className="wallet-address">{mainWallet.address}</span>
            <button className="wallet-copy-btn" onClick={handleCopy} aria-label="Copy address" type="button">
              <img src={copyIcon} alt="Copy" width="14" height="14" />
            </button>
            {copied && <span className="copied-toast">Copied!</span>}
          </div>
        </div>
      </div>
      <button className="wallet-dropdown-btn" onClick={onDropdown} aria-label="Switch wallet" type="button">
        <img src={chevronDown} alt="" width="10.21" height="6.44" />
      </button>
    </div>
  );
};

export default WalletSelectorCard;
