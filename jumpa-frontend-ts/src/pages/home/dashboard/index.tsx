import '../HomePage.css';
import '../home.css';
import WalletSelectorCard from '../components/WalletSelectorCard';
import WalletBalanceCard from '../components/WalletBalanceCard';
import QuickActionRow from '../components/QuickActionRow';
import ServiceShortcutGrid from '../components/ServiceShortcutGrid';
import QuickTransferList from '../components/QuickTransferList';
import PromoBannerCard from '../components/PromoBannerCard';
import VirtualAccountBanner from '../components/VirtualAccountBanner';
import { useHomeLayout } from '../../../layouts/HomeLayout';

export default function JumpaDashboard() {
  const {
    balanceHidden,
    onToggleBalance,
    onWalletDropdown,
    onVirtualAccount,
    onWithdrawal,
    onTrade,
    onDApp
  } = useHomeLayout();

  return (
    <div className="home-page">
      <WalletSelectorCard onDropdown={onWalletDropdown} />
      <WalletBalanceCard hidden={balanceHidden} onToggle={onToggleBalance} />
      <QuickActionRow 
        onSend={() => {}} 
        onReceive={onWalletDropdown} 
        onSwap={onTrade} 
      />
      <ServiceShortcutGrid 
        onWithdraw={onWithdrawal}
        onDApp={onDApp}
      />
      <QuickTransferList />
      <PromoBannerCard />
      <VirtualAccountBanner onClick={onVirtualAccount} />
      <div className="home-bottom-spacer" />
    </div>
  );
}