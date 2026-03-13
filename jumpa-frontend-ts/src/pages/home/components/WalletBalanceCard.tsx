import React from 'react';
import { mainWallet } from '../../../data/wallets';
import coinsIcon from '../../../assets/icons/coins/coins.svg';
import balanceEyeOpen from '../../../assets/icons/actions/eye (2).svg';
import balanceEyeClosed from '../../../assets/icons/actions/eye (1).svg';
import balanceCloseSvg from '../../../assets/icons/actions/balance-close.svg';
import graphUp from '../../../assets/icons/actions/graph-up.svg';
import graphDown from '../../../assets/icons/actions/graph-down.svg';
import dropdownChevron from '../../../assets/icons/actions/dropdown-chevron.svg';

interface WalletBalanceCardProps {
  hidden: boolean;
  onToggle: () => void;
}

const WalletBalanceCard: React.FC<WalletBalanceCardProps> = ({ hidden, onToggle }) => {
  const isUp = mainWallet.changeDirection === 'up';

  const balanceStr = mainWallet.balance;
  const decimalIndex = balanceStr.lastIndexOf('.');
  const hasDecimal = decimalIndex !== -1;
  const wholePart = hasDecimal ? balanceStr.substring(0, decimalIndex) : balanceStr;
  const decimalPart = hasDecimal ? balanceStr.substring(decimalIndex) : '';

  return (
    <div className="balance-card">
      <div className="balance-token-row">
        <img src={coinsIcon} alt="" className="token-icons" />
        <span className="token-label">
          {mainWallet.token}
          <img src={dropdownChevron} alt="" width="10" height="10" className="token-chevron" />
        </span>
      </div>
      <div className="balance-label">Wallet Balance</div>
      <div className="balance-amount-row">
        {hidden ? (
          <img src={balanceCloseSvg} alt="Hidden" className="balance-hidden-img" />
        ) : (
          <span className="balance-amount">
            {wholePart}
            {hasDecimal && <span className="balance-decimal">{decimalPart}</span>}
          </span>
        )}
        <button className="balance-eye-btn" onClick={onToggle} aria-label="Toggle balance" type="button">
          <img src={hidden ? balanceEyeClosed : balanceEyeOpen} alt="" width="24" height="24" />
        </button>
      </div>
      <div className={`balance-change ${isUp ? 'up' : 'down'}`}>
        <img src={isUp ? graphUp : graphDown} alt="" width="18" height="18" />
        <span>{hidden ? '••••' : mainWallet.change}</span>
      </div>
    </div>
  );
};

export default WalletBalanceCard;
