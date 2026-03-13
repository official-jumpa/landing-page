import React from 'react';
import './SideDrawer.css';
import { navItems } from '../../data/navItems';
import logoMark from '../../assets/logos/brand/jumpa-logo-mark.png';
import homeIcon from '../../assets/icons/navigation/home.svg';
import homeActiveIcon from '../../assets/icons/navigation/home-active.svg';
import dappIcon from '../../assets/icons/navigation/dapp.svg';
import dappActiveIcon from '../../assets/icons/navigation/dapp-active.svg';
import tradeIcon from '../../assets/icons/navigation/trade.svg';
import tradeActiveIcon from '../../assets/icons/navigation/trade-active.svg';

const iconMap: Record<string, { inactive: string, active: string }> = {
  home: { inactive: homeIcon, active: homeActiveIcon },
  dapp: { inactive: dappIcon, active: dappActiveIcon },
  trade: { inactive: tradeIcon, active: tradeActiveIcon }
};

interface SideDrawerProps {
  isOpen: boolean;
  currentPage: string;
  onNavigate: (pageId: string) => void;
  onClose: () => void;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, currentPage, onNavigate, onClose }) => {
  return (
    <div className={`side-drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-header">
        <div className="drawer-logo">
          <img src={logoMark} alt="Jumpa" className="drawer-logo-mark" />
          <span className="drawer-logo-text">Jumpa</span>
        </div>
        <button className="drawer-close-btn" onClick={onClose} aria-label="Close menu" type="button">
          ✕
        </button>
      </div>
      <nav className="drawer-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`drawer-nav-item ${currentPage === item.id ? 'active' : ''} ${!item.enabled ? 'disabled' : ''}`}
            onClick={() => item.enabled && onNavigate(item.id)}
            type="button"
          >
            <img 
              src={currentPage === item.id ? iconMap[item.icon].active : iconMap[item.icon].inactive} 
              alt="" 
              width="18" 
              height="18" 
            />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SideDrawer;
