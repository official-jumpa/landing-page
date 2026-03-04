import { useState, useEffect } from "react";
import {
  Settings,
  Bell,
  Copy,
  ChevronDown,
  EyeOff,
  TrendingUp,
  X,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function JumpaDashboard() {
  const [showBalance, setShowBalance] = useState(true);
  const navigate = useNavigate();

  // Modal States
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [depositView, setDepositView] = useState<"options" | "bank_transfer">("options");
  const [isCopied, setIsCopied] = useState(false);

  // Handle Copy Action
  const handleCopy = () => {
    setIsCopied(true);
    // Optional: Revert back to "Copy Number" after 3 seconds
    setTimeout(() => setIsCopied(false), 3000);
  };

  // Reset modal view when it closes
  useEffect(() => {
    if (!isDepositOpen) {
      setTimeout(() => {
        setDepositView("options");
        setIsCopied(false);
      }, 300); // Wait for exit animation
    }
  }, [isDepositOpen]);

  return (
    <div className="min-h-screen bg-black text-white flex justify-center pb-24 relative">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md bg-black overflow-hidden relative">

        {/* --- TOP NAVBAR --- */}
        <div className="flex items-center justify-between px-5 pt-8">
          <div className="w-10 h-10 rounded-full bg-[#E5E0FF] flex items-center justify-center text-black font-semibold text-lg">
            A
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-[#1C1C1E] flex items-center justify-center hover:bg-[#2C2C2E] transition">
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-10 h-10 rounded-full bg-[#1C1C1E] flex items-center justify-center hover:bg-[#2C2C2E] transition relative">
              <Bell className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* --- WALLET SELECTOR --- */}
        <div className="mx-5 mt-6 bg-[#1C1C1E] rounded-2xl p-3 flex items-center justify-between cursor-pointer hover:bg-[#2C2C2E] transition">
          <div className="flex items-center gap-3">
            <img src="/wallet.svg" className="w-10 h-10 rounded-full" alt="" />
            <div className="flex flex-col">
              <span className="text-white font-semibold text-base">Main wallet</span>
              <div className="flex items-center gap-1 text-gray-400 text-xs">
                0xB7...BY38 <Copy className="w-3 h-3 ml-1 cursor-pointer hover:text-white" />
              </div>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-400 mr-2" />
        </div>

        {/* --- BALANCE CARD CONTAINER --- */}
        <div className="mx-5 mt-4 flex gap-2 items-stretch">

          {/* 1. LEFT MAIN CARD */}
          <div className="bg-[#1C1C1E] rounded-3xl p-5 flex-1 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex -space-x-2">
                  <img src="/coins.svg" alt="" />
                </div>
                <div className="flex items-center gap-1 text-[11px] font-medium text-gray-300 bg-[#2C2C2E] px-2 py-1 rounded-md cursor-pointer">
                  USDC <ChevronDown className="w-3 h-3" />
                </div>
              </div>

              <div className="text-gray-400 text-sm mb-1">
                Wallet Balance
              </div>

              <div className="flex items-center gap-3">
                <h1 className="text-[40px] leading-none font-bold text-white tracking-tight">
                  $ {showBalance ? (
                    <>1<span className="text-gray-400">.00</span></>
                  ) : (
                    "****"
                  )}
                </h1>
                <EyeOff
                  className="w-5 h-5 text-gray-500 cursor-pointer hover:text-white transition"
                  onClick={() => setShowBalance(!showBalance)}
                />
              </div>
            </div>

            <div className="flex items-center gap-1 text-[#00C259] text-xs font-semibold mt-4">
              <TrendingUp className="w-4 h-4" /> 6.12%
            </div>
          </div>

          {/* 2. RIGHT SLIM CARD (USD Account) */}
          <div className="bg-[#1C1C1E] rounded-full w-12 flex flex-col items-center py-5 cursor-pointer hover:bg-[#2C2C2E] transition-colors">
            <div className="w-6 h-6 rounded-full flex flex-col items-center justify-center mb-auto">
              <img src="/Wallet-bag.svg" alt="" />
            </div>

            <div
              className="text-[#8B5CF6] text-md font-medium mt-4"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              USD Account
            </div>
          </div>

        </div>

        {/* --- VERIFICATION BANNER --- */}
        <div className="mx-5 mt-4 bg-[#1C1C1E] rounded-2xl p-4 flex items-center justify-between relative overflow-hidden">
          <img
            src="/verify-account.svg"
            alt="Verify"
            className="absolute left-0 top-0 h-full w-25 object-cover pointer-events-none z-0"
          />

          <div className="flex flex-col relative z-10 pl-12">
            <span className="text-white font-semibold text-sm">Verify your account</span>
            <span className="text-gray-400 text-xs mt-0.5">Verify your account to<br />unlock full access.</span>
          </div>

          <Button className="bg-black hover:bg-gray-900 text-white rounded-xl text-xs font-semibold px-4 h-9 border border-[#333333] z-10 relative">
            Verify account
          </Button>
        </div>

        {/* --- ACTION BUTTONS (Send / Receive / Swap) --- */}
        <div className="mx-5 mt-4 grid grid-cols-3 gap-3">
          <Button className="bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white rounded-2xl h-14 font-semibold text-sm flex items-center justify-center gap-2 shadow-none">
            Send <img src="/send.svg" alt="" />
          </Button>
          <Button
            onClick={() => setIsDepositOpen(true)}
            className="bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white rounded-2xl h-14 font-semibold text-sm flex items-center justify-center gap-2 shadow-none"
          >
            Receive <img src="/receive.svg" alt="" />
          </Button>
          <Button className="bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white rounded-2xl h-14 font-semibold text-sm flex items-center justify-center gap-2 shadow-none">
            Swap <img src="/swap.svg" alt="" />
          </Button>
        </div>

        {/* --- FEATURE GRID --- */}
        <div className="mx-6 mt-6 grid grid-cols-5 gap-2">
          <FeatureIcon icon={<img src="/prediction.svg" alt="" />} label="Prediction" color="bg-[#E5E0FF]" />
          <FeatureIcon icon={<img src="/group.svg" alt="" />} label="Group" color="bg-[#FFF0D4]" />
          <FeatureIcon icon={<img src="/bills.svg" alt="" />} label="Bills" color="bg-[#DBEAFE]" />
          <FeatureIcon
            onClick={() => navigate("/home/airtime")}
            icon={<img src="/data.svg" alt="Airtime" />}
            label="Airtime"
            color="bg-[#E5E0FF]"
          />
          <FeatureIcon icon={<img src="/more.svg" alt="" />} label="More" color="bg-white" />
        </div>

        {/* --- PROMO BANNERS --- */}
        <div className="mx-5 mt-6 space-y-4 mb-28">
          {/* Purple Banner */}
          <div className="w-full bg-[#EAE5FF] rounded-2xl p-5 flex items-center justify-between overflow-hidden relative">
            <div className="flex flex-col gap-3 z-10 w-2/3">
              <p className="text-[#5B3EE4] text-xs font-medium leading-snug">Enjoy amazing benefit when you<br />invite new users.</p>
              <Button className="bg-[#5B3EE4] hover:bg-[#4a32be] text-white rounded-xl h-8 w-fit text-xs px-4 shadow-none">
                Learn more
              </Button>
            </div>
            <img src="/purple-coin.svg" className="absolute right-0 bottom-0 text-6xl" alt="" />
            <img src="/yellow-coin.svg" className="absolute right-1 bottom-0 text-6xl" alt="" />
          </div>

          {/* Peach Banner */}
          <div className="w-full bg-[#FFEED4] rounded-2xl p-5 flex items-center justify-between overflow-hidden relative">
            <div className="flex flex-col gap-3 z-10 w-2/3">
              <p className="text-[#B45309] text-xs font-medium leading-snug">Get a virtual account to send, store<br />and manage money on Jumpa.</p>
              <Button className="bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white rounded-xl h-8 w-fit text-xs px-4 shadow-none">
                Enable virtual account
              </Button>
            </div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-32 h-32 bg-orange-400 rounded-full blur-sm opacity-50 pointer-events-none"></div>
            <div className="absolute -right-2 bottom-0 text-7xl">💰</div>
          </div>
        </div>

        {/* --- BOTTOM FLOATING NAV --- */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[400px] bg-white/70 backdrop-blur-xl border border-white/30 shadow-2xl px-2 py-2 flex justify-between items-center z-40 rounded-[2.5rem]">
          <NavItem iconSrc="/home.svg" label="Home" isActive />
          <NavItem iconSrc="/agent.svg" label="Agent" />
          <NavItem iconSrc="/dapps.svg" label="Dapps" />
          <NavItem iconSrc="/trade.svg" label="Trade" />
        </div>

        {/* --- DEPOSIT MODAL OVERLAY --- */}
        {isDepositOpen && (
          <div className="absolute inset-0 z-50  flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Modal Box */}
            <div className="bg-[#111111] mt-80 w-full max-w-sm rounded-3xl p-6 relative shadow-2xl border border-white/10 animate-in slide-in-from-bottom-8 duration-300">

              {/* Conditional Rendering based on view */}
              {depositView === "options" ? (
                <>
                  {/* Close Button */}
                  <button
                    onClick={() => setIsDepositOpen(false)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <X className="w-4 h-4 text-white/70" />
                  </button>

                  <div className="text-center mt-4">
                    <div className="w-16 h-16 rounded-full bg-[#FFF3E0] flex items-center justify-center mx-auto mb-5 shadow-inner">
                      <img src="/deposit.svg" className="w-full h-full" alt="" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Deposit</h2>
                    <p className="text-sm text-gray-400 mb-8 px-4">Choose a method below to add funds to your account.</p>
                  </div>

                  <div className="space-y-3">
                    {/* Bank Transfer Option */}
                    <div
                      onClick={() => setDepositView("bank_transfer")}
                      className="bg-[#1C1C1E] hover:bg-[#2C2C2E] cursor-pointer rounded-2xl p-4 flex items-center justify-between transition-colors border border-transparent hover:border-white/10"
                    >
                      <div className="flex flex-col">
                        <span className="text-white font-semibold text-[15px]">Bank Transfer</span>
                        <span className="text-gray-500 text-xs mt-0.5">Deposit from your bank account.</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </div>

                    {/* Crypto Option */}
                    <div className="bg-[#1C1C1E] hover:bg-[#2C2C2E] cursor-pointer rounded-2xl p-4 flex items-center justify-between transition-colors border border-transparent hover:border-white/10">
                      <div className="flex flex-col">
                        <span className="text-white font-semibold text-[15px]">Crypto</span>
                        <span className="text-gray-500 text-xs mt-0.5">Receive crypto coins.</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Top Actions (Back & Close) */}
                  <div className="flex justify-between items-center absolute top-4 left-4 right-4">
                    <button
                      onClick={() => setDepositView("options")}
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 text-white/70" />
                    </button>
                    <button
                      onClick={() => setIsDepositOpen(false)}
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <X className="w-4 h-4 text-white/70" />
                    </button>
                  </div>

                  <div className="text-center mt-8">
                    <div className="w-24 h-18 flex flex-col justify-center px-2 mx-auto mb-5 shadow-lg relative">
                      <img src="/card.svg" className="w-18 h-18" alt="" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Bank Transfer</h2>
                    <p className="text-sm text-gray-400 mb-8 px-4">Transfer to the account number below.</p>
                  </div>

                  {/* Account Details Block */}
                  <div className="bg-[#1C1C1E] rounded-2xl p-4 flex items-center justify-between border border-white/5">
                    <div className="flex flex-col gap-1">
                      <span className="text-white font-bold tracking-wider text-base">1235 3458 98</span>
                      <span className="text-gray-500 text-xs">GTBank - Ndukwe Anita</span>
                    </div>

                    <button
                      onClick={handleCopy}
                      className={`px-4 py-1.5 rounded-full text-[11px] font-medium transition-colors border ${isCopied
                        ? "border-[#00C259] text-[#00C259] bg-[#00C259]/10"
                        : "border-gray-600 text-gray-300 hover:bg-white/5"
                        }`}
                    >
                      {isCopied ? "Copied" : "Copy Number"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---
function FeatureIcon({
  icon,
  label,
  color,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
  onClick?: () => void;
}) {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-2 cursor-pointer group w-full">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${color} transition-transform group-hover:scale-105`}>
        {icon}
      </div>
      <span className="text-white text-[11px] font-medium text-center">{label}</span>
    </div>
  );
}
function NavItem({
  iconSrc,
  label,
  isActive = false
}: {
  iconSrc: string,
  label: string,
  isActive?: boolean
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-300 ${isActive
        ? "bg-[#EAE5FF] text-[#5B3EE4] px-5 py-1 rounded-3xl"
        : "text-gray-500 px-3 py-1 hover:text-gray-700"
        }`}
    >
      <img
        src={iconSrc}
        alt={label}
        className={`w-6 h-6 object-contain ${isActive ? "" : "opacity-60 grayscale"}`}
      />
      <span className="text-[11px] font-semibold">{label}</span>
    </div>
  );
}