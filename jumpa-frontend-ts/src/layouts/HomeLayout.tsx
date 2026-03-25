import React, { useState, useCallback, useEffect, createContext, useContext } from 'react';
import './HomeLayout.css';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

// Components
import TopBar from '../components/common/TopBar';
import SideDrawer from '../components/ui/SideDrawer';
import FloatingSupportButton from '../components/common/FloatingSupportButton';
import WalletListModal from '../components/modal/WalletListModal';
import WalletDetailsModal from '../components/modal/WalletDetailsModal';
import VirtualAccountModal from '../components/modal/VirtualAccountModal';
import DepositMethodSheet from '../components/modal/DepositMethodSheet';
import PinEntryScreen from '../components/pin/PinEntryScreen';
import PrivateKeyScreen from '../components/wallet/PrivateKeyScreen';
import WithdrawOptions from '../pages/home/withdraw/options';
import TradePage from '../pages/home/subpages/TradePage';
import DAppPage from '../pages/home/subpages/DAppPage';

// Data
import { type Wallet } from '../data/wallets';

interface HomeLayoutContextType {
  balanceHidden: boolean;
  onToggleBalance: () => void;
  onOpenMenu: () => void;
  onWalletDropdown: () => void;
  onVirtualAccount: () => void;
  onWithdrawal: () => void;
  onTrade: () => void;
  onDApp: () => void;
  onReceive: () => void;
}

const HomeLayoutContext = createContext<HomeLayoutContextType | undefined>(undefined);

export const useHomeLayout = () => {
  const context = useContext(HomeLayoutContext);
  if (!context) throw new Error('useHomeLayout must be used within HomeLayout');
  return context;
};

const HomeLayout: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();

  // Navigation & Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  // Reset currentPage to 'home' when navigating to sub-routes
  // so that the <Outlet /> renders the routed page component
  useEffect(() => {
    if (location.pathname !== '/home') {
      setCurrentPage('home');
    }
  }, [location.pathname]);

  // Home State
  const [balanceHidden, setBalanceHidden] = useState(false);

  // Modals
  const [walletListOpen, setWalletListOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [virtualAccountOpen, setVirtualAccountOpen] = useState(false);
  const [depositSheetOpen, setDepositSheetOpen] = useState(false);

  // Security flow
  const [pinScreenOpen, setPinScreenOpen] = useState(false);
  const [pinWallet, setPinWallet] = useState<Wallet | null>(null);
  const [privateKeyOpen, setPrivateKeyOpen] = useState(false);
  const [privateKeyData, setPrivateKeyData] = useState<Wallet | null>(null);

  // Withdrawal
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  // Handlers
  const handleNavigate = useCallback((pageId: string) => {
    setCurrentPage(pageId);
    setDrawerOpen(false);
    if (pageId === "home") navigate("/home");
  }, [navigate]);

  const handleWalletSelect = useCallback((wallet: Wallet) => {
    setSelectedWallet(wallet);
    setWalletListOpen(false);
  }, []);

  const handlePrivateKeyRequest = useCallback((wallet: Wallet) => {
    setPinWallet(wallet);
    setSelectedWallet(null);
    setPinScreenOpen(true);
  }, []);

  const handlePinSuccess = useCallback(() => {
    setPinScreenOpen(false);
    setPrivateKeyData(pinWallet);
    setPrivateKeyOpen(true);
  }, [pinWallet]);

  const contextValue: HomeLayoutContextType = {
    balanceHidden,
    onToggleBalance: () => setBalanceHidden(!balanceHidden),
    onOpenMenu: () => setDrawerOpen(true),
    onWalletDropdown: () => setWalletListOpen(true),
    onVirtualAccount: () => setVirtualAccountOpen(true),
    onWithdrawal: () => setWithdrawOpen(true),
    onTrade: () => { setCurrentPage("trade"); navigate("/home"); },
    onDApp: () => { setCurrentPage("dapp"); navigate("/home"); },
    onReceive: () => setDepositSheetOpen(true),
  };

  return (
    <HomeLayoutContext.Provider value={contextValue}>
      <div className="jumpa-theme-wrapper">
        <div className="phone-frame">
          <div className="app-content">
            <TopBar onMenuClick={() => setDrawerOpen(true)} />
            {currentPage === "home" ? (
              <Outlet />
            ) : currentPage === "trade" ? (
              <TradePage />
            ) : currentPage === "dapp" ? (
              <DAppPage />
            ) : (
              <Outlet />
            )}
          </div>
          {currentPage === "home" && <FloatingSupportButton />}

          {/* Overlays */}
          <WithdrawOptions isOpen={withdrawOpen} onClose={() => setWithdrawOpen(false)} />

          {pinScreenOpen && (
            <PinEntryScreen
              onSuccess={handlePinSuccess}
              onClose={() => { setPinScreenOpen(false); setPinWallet(null); }}
            />
          )}

          {privateKeyOpen && (
            <div className="fullscreen-overlay">
              <PrivateKeyScreen
                wallet={privateKeyData}
                onDone={() => {
                  setPrivateKeyOpen(false);
                  setPrivateKeyData(null);
                  setPinWallet(null);
                }}
              />
            </div>
          )}

          {drawerOpen && (
            <div className="overlay" onClick={() => setDrawerOpen(false)} />
          )}

          <SideDrawer
            isOpen={drawerOpen}
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onClose={() => setDrawerOpen(false)}
          />

          {(walletListOpen || selectedWallet || virtualAccountOpen || depositSheetOpen) && !drawerOpen && (
            <div className="overlay-blur" onClick={() => {
              setWalletListOpen(false);
              setSelectedWallet(null);
              setVirtualAccountOpen(false);
              setDepositSheetOpen(false);
            }} />
          )}

          {walletListOpen && (
            <WalletListModal
              onSelect={handleWalletSelect}
              onClose={() => setWalletListOpen(false)}
            />
          )}

          {selectedWallet && (
            <WalletDetailsModal
              wallet={selectedWallet}
              onClose={() => setSelectedWallet(null)}
              onPrivateKey={handlePrivateKeyRequest}
            />
          )}

          {virtualAccountOpen && (
            <VirtualAccountModal
              onClose={() => setVirtualAccountOpen(false)}
            />
          )}

          {depositSheetOpen && (
            <DepositMethodSheet onClose={() => setDepositSheetOpen(false)} />
          )}
        </div>
      </div>
    </HomeLayoutContext.Provider>
  );
};

export default HomeLayout;
