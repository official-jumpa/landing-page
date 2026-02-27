// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { useNavigate } from "react-router-dom";
// import {
//   ArrowUpRight,
//   Plus,
//   Hourglass,
//   Home,
//   Bell,
//   User,
//   Send,
//   ArrowDown
// } from "lucide-react";
// import DepositModal from "../deposit";
// import WithdrawOptions from "../withdraw/options";

// export default function DriverDashboard() {
//   const navigate = useNavigate();
//   const [changeCurrency, setChangeCurrency] = useState(true);
//   const [verificationStatus, setVerificationStatus] = useState<
//     "not_started" | "in_progress" | "approved"
//   >("not_started");

//   // State to control the modals
//   const [isDepositOpen, setIsDepositOpen] = useState(false);
//   const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false); // State for the overlay menu

//   useEffect(() => {
//     const status = localStorage.getItem("verificationStatus") as
//       | "not_started"
//       | "in_progress"
//       | "approved";

//     if (status) {
//       setVerificationStatus(status);
//     }
//   }, []);

//   const handleLoan = () => {
//     navigate('/driver/loan')
//   };

//   const handleSavings = () => {
//     navigate('/driver/savings')
//   };
//   const handleInvestment = () => {
//     navigate('/driver/investment')
//   };
//   const handleVerification = () => {
//     navigate('/driver/verification')
//   };
//   const handle3rikeAi = () => {
//     navigate('/driver/3rikeAi')
//   };
//   const handleNotification = () => {
//     navigate('/driver/notification')
//   };
//   const handleSettings = () => {
//     navigate('/driver/settings')
//   };

//   return (
//     <div className="min-h-screen bg-white flex justify-center">
//       {/* Mobile Frame Container */}
//       <div className="w-full max-w-100 bg-white shadow-2xl overflow-hidden min-h-200 relative pb-10">

//         {/* Header Profile */}
//         <div className="px-6 flex items-center justify-between pt-6 mb-4">
//           <div className="flex items-center gap-3 bg-white rounded-full">
//             {/* Replace with actual user image */}
//             <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white">
//               <img src="/profile.png" alt="User" />
//             </div>
//             <span className="font-light text-sm -mr-5">Welcome, Effiong Musa</span>
//             <Button variant="link">
//               <img src="arrow.svg" alt="Arrow" className="w-5 h-5" />
//             </Button>
//           </div>
//         </div>

//         {/* Main Content Scroll Area */}
//         <div className="px-5 space-y-4">

//           {/* 1. GREEN BALANCE CARD */}
//           <div className="relative w-full rounded-3xl p-6 text-white overflow-hidden">
//             {/* Background Gradient & Blobs */}
//             <img
//               src="/earnings-banner.svg"
//               alt="Card Background"
//               className="absolute inset-0 w-full h-full bg-[#00C258] object-cover z-0"
//             />

//             <div className="relative z-10">
//               <div className="flex justify-between items-start mb-2">
//                 <span className="text-green-100 text-sm font-light">Total Lifetime Earnings</span>
//               </div>

//               <div className="flex flex-row justify-between mb-6">
//                 <h1 className="text-4xl font-bold ">
//                   {changeCurrency ? "$ 0.00" : "₵ 0.00"}
//                 </h1>

//                 {/* Custom Toggle Switch */}
//                 <div className="flex items-center rounded-full ">
//                   <Switch
//                     checked={changeCurrency}
//                     onCheckedChange={setChangeCurrency}
//                     className="data-[state=checked]:bg-black/25 data-[state=unchecked]:bg-black/25 h-6 w-10 border-5 border-transparent -rotate-90"
//                   />
//                 </div>
//               </div>


//               <div className="flex gap-4">

//                 <Button
//                   onClick={() => setIsDepositOpen(true)}
//                   className="flex-1 bg-transparent hover:bg-white/30 text-white border border-white rounded-full h-12 gap-2 text-sm font-medium backdrop-blur-sm"
//                 >
//                   <div className="bg-white text-[#00C258] rounded-full p-0.5 w-5 h-5 flex items-center justify-center">
//                     <Plus size={14} strokeWidth={4} />
//                   </div>
//                   Deposit
//                 </Button>

//                 <Button onClick={() => setIsWithdrawOpen(true)} className="flex-1 bg-transparent hover:bg-white/30 text-white border border-white rounded-full h-12 gap-2 text-sm font-medium backdrop-blur-sm">
//                   <div className="bg-white text-[#00C258] rounded-full p-0.5 w-5 h-5 flex items-center justify-center">
//                     <ArrowUpRight size={14} strokeWidth={4} />
//                   </div>
//                   Withdraw
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* 2. STATS ROW */}
//           <div className="grid grid-cols-2 gap-4">
//             {/* Savings Balance */}
//             <div className="bg-white border-3 border-dashed border-gray-100 rounded-2xl p-4 flex flex-col gap-3">
//               <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
//                 <img src="wallet.svg" alt="Back" className="w-6 h-6" />
//               </div>
//               <div>
//                 <p className="text-xs text-gray-400 mb-1">Savings Balance</p>
//                 <h3 className="text-xl font-light text-gray-800">$ 0.00</h3>
//               </div>
//             </div>

//             {/* Pending Payout */}
//             <div className="bg-white border-3 border-dashed border-gray-100 rounded-2xl p-4 flex flex-col gap-3 ">
//               <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
//                 <Hourglass className="w-4 h-4 text-orange-500" />
//               </div>
//               <div>
//                 <p className="text-xs text-gray-400 mb-1">Pending Payout</p>
//                 <h3 className="text-xl font-light text-gray-800">$ 0.00</h3>
//               </div>
//             </div>
//           </div>

//           {/* to simulate approval */}
//           <button
//             type="button"
//             onClick={() => setVerificationStatus("approved")}
//             className="ml-2 text-xs text-[#1B8036] underline hover:[#1B8036] bg-transparent border-none cursor-pointer"
//           >
//             (Simulate Approval)
//           </button>
//           {/* 3. VERIFICATION BANNER */}
//           <div onClick={handleVerification} className="relative w-full bg-[#1B8036] rounded-2xl p-5 overflow-hidden text-white flex items-center justify-between">

//             {/* Abstract Background Pattern (Simulated with SVG) */}
//             <img
//               src="/verification-banner.svg"
//               alt="Card Background"
//               className="absolute inset-0 w-full h-full bg-[#1E8A32] object-cover z-0"
//             />

//             <div className="relative z-10">
//               <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center mb-2 backdrop-blur-md">
//                 {/* Icon simulating the scooter/delivery icon */}
//                 <img
//                   src="/verification-bike.svg"
//                   alt="Card Background"
//                   className="absolute inset-0 w-full h-full  object-cover z-0"
//                 />
//               </div>

//               <h3 className="font-bold text-lg leading-tight">
//                 {verificationStatus === "not_started" && "Start Verification"}
//                 {verificationStatus === "in_progress" && "Verification in Progress"}
//                 {verificationStatus === "approved" && "Own a 3rike"}
//               </h3>

//               <p className="text-sm text-white mt-0.5">
//                 {verificationStatus === "not_started" && "Complete Kyc and be eligible."}
//                 {verificationStatus === "in_progress" && "Details received. We’ll be in touch soon."}
//                 {verificationStatus === "approved" && "Register and own a 3rike"}
//               </p>
//             </div>

//             <div className="absolute bottom-4 right-4 z-10 w-8 h-8 bg-[#00C258] rounded-full flex items-center justify-center shadow-lg">
//               <Button variant="link">
//                 <img
//                   src="/arrow-right.svg"
//                   alt="Card Background"
//                   className="absolute inset-0 w-full h-full  object-cover z-0"
//                 />
//               </Button>
//             </div>
//           </div>

//           {/* 4. BOTTOM GRID MENU */}
//           <div className="grid grid-cols-2 gap-4">
//             {/* Savings */}
//             <div onClick={handleSavings} className="bg-white border-3 border-dashed border-gray-100 rounded-2xl p-4 flex flex-col  gap-2 ">
//               <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center mb-2 backdrop-blur-md">
//                 <img
//                   src="/piggy.svg"
//                   alt="piggy"
//                   className="absolute inset-0 w-full h-full  object-cover z-0"
//                 />
//               </div>
//               <span className="text-gray-800 text-lg">Savings</span>
//             </div>

//             {/* Investment */}
//             <div onClick={handleInvestment} className="bg-white border-3 border-dashed border-gray-100 rounded-2xl p-4 flex flex-col gap-2 ">
//               <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center mb-2 backdrop-blur-md">
//                 <img
//                   src="/invest.svg"
//                   alt="invest"
//                   className="absolute inset-0 w-full h-full  object-cover z-0"
//                 />
//               </div>
//               <span className="text-gray-800 text-lg">Investment</span>
//             </div>

//             {/* Earn */}
//             <div className="bg-white border-3 border-dashed border-gray-100 rounded-2xl p-4 flex flex-col gap-2 ">
//               <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center mb-2 backdrop-blur-md">
//                 <img
//                   src="/chart.svg"
//                   alt="chart"
//                   className="absolute inset-0 w-full h-full  object-cover z-0"
//                 />
//               </div>
//               <span className="text-gray-800 text-lg">Earn</span>
//             </div>

//             {/* Loan */}
//             <div onClick={handleLoan} className="bg-white border-3 border-dashed border-gray-100 rounded-2xl p-4 flex flex-col gap-2 ">
//               <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center mb-2 backdrop-blur-md">
//                 <img
//                   src="/loan.svg"
//                   alt="loan"
//                   className="absolute inset-0 w-full h-full  object-cover z-0"
//                 />
//               </div>
//               <span className="text-gray-800 text-lg">Loan</span>
//             </div>
//           </div>

//         </div>

//         {/* BOTTOM NAVIGATION BAR */}
//         <div className="absolute w-full flex items-center justify-between px-6 -mt-7">
//           {/* Left pill navigation */}
//           <div className="bg-white rounded-full shadow-lg px-1 py-1 flex items-center -space-x-2">
//             <Button
//               variant="link"
//               size="icon"
//               className="hover:bg-transparent text-black"
//             >
//               <Home className="w-6 h-6 fill-current" />
//             </Button>

//             <Button
//               onClick={handleNotification}
//               variant="link"
//               size="icon"
//               className="hover:bg-transparent text-[#909090]"
//             >
//               <Bell className="w-6 h-6 fill-current" />
//             </Button>

//             <Button
//               variant="link"
//               onClick={handleSettings}
//               size="icon"
//               className="hover:bg-transparent text-gray-400"
//             >
//               <img
//                 src="/settings.svg"
//                 alt="settings"
//                 className=" w-5 h-5"
//               />
//             </Button>
//           </div>

//           {/* Right floating action button (TRIGGER) */}
//           <Button
//             variant="link"
//             size="icon"
//             onClick={() => setIsMenuOpen(true)} // Open modal on click
//             className="hover:bg-transparent w-full h-full text-gray-400"
//           >
//             <img
//               src="/add.svg"
//               alt="add"
//               className="ml-25 w-15 h-15"
//             />
//           </Button>
//         </div>

//         {/* --- OVERLAY MODAL --- */}
//         {isMenuOpen && (
//           <div className="absolute inset-0 z-50 bg-[#F3F5F9]/95 backdrop-blur-sm flex flex-col justify-end items-end p-2 animate-in fade-in duration-200">

//             {/* Menu Items Container */}
//             <div className="flex flex-col gap-6 mb-10 mr-20 items-start">

//               {/* Option 1: Pay 3rike Ai */}
//               <div onClick={handle3rikeAi} className="flex items-center gap-4 cursor-pointer group">
//                 <User className="w-6 h-6 text-[#00C259]" fill="#00C259" />
//                 <span className="text-lg font-light text-black group-hover:text-gray-700">Pay 3rike Ai</span>
//               </div>

//               {/* Option 2: Send */}
//               <div className="flex items-center gap-4 cursor-pointer group">
//                 <Send className="w-6 h-6 text-[#9747FF]" fill="#9747FF" />
//                 <span className="text-lg font-light text-black group-hover:text-gray-700">Send</span>
//               </div>

//               {/* Option 3: Recieve */}
//               <div className="flex items-center gap-4 cursor-pointer group">
//                 <ArrowDown className="w-6 h-6 text-[#FF9900]" strokeWidth={3} />
//                 <span className="text-lg font-light text-black group-hover:text-gray-700">Recieve</span>
//               </div>
//             </div>

//             {/* Close Button (Replaces the Add Button position) */}
//             <Button
//               onClick={() => setIsMenuOpen(false)}
//               className="w-25 h-25 pb-6 bg-transparent rounded-full flex items-end justify-end transition-transform hover:scale-105"
//             >
//               <img
//                 src="/subtract.svg"
//                 alt="subtract"
//                 className="w-15 h-15 -mr-2"
//               />
//             </Button>
//           </div>
//         )}

//       </div>

//       {/* deposit modal */}
//       <DepositModal
//         isOpen={isDepositOpen}
//         onClose={() => setIsDepositOpen(false)}
//       />

//       {/* Withdraw modal */}
//       <WithdrawOptions
//         isOpen={isWithdrawOpen}
//         onClose={() => setIsWithdrawOpen(false)}
//       />
//     </div>
//   );
// }
import { useState } from "react";
import {
  Settings,
  Bell,
  Copy,
  ChevronDown,
  EyeOff,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JumpaDashboard() {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white flex justify-center pb-24">
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
            {/* Gradient Circle */}
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
              {/* Currency Icons & Selector */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex -space-x-2">
                  <img src="/coins.svg" alt="" />
                </div>
                <div className="flex items-center gap-1 text-[11px] font-medium text-gray-300 bg-[#2C2C2E] px-2 py-1 rounded-md cursor-pointer">
                  USDC <ChevronDown className="w-3 h-3" />
                </div>
              </div>

              {/* Wallet Balance Label */}
              <div className="text-gray-400 text-sm mb-1">
                Wallet Balance
              </div>

              {/* Balance Amount & Eye Icon */}
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

            {/* Percentage Yield */}
            <div className="flex items-center gap-1 text-[#00C259] text-xs font-semibold mt-4">
              <TrendingUp className="w-4 h-4" /> 6.12%
            </div>
          </div>

          {/* 2. RIGHT SLIM CARD (USD Account) */}
          <div className="bg-[#1C1C1E] rounded-full w-12 flex flex-col items-center py-5 cursor-pointer hover:bg-[#2C2C2E] transition-colors">
            {/* Top Custom Icon */}
            <div className="w-6 h-6 rounded-full  flex flex-col items-center justify-center mb-auto">
               <img src="/Wallet-bag.svg" alt="" />
            </div>

            {/* Vertical Text */}
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
          
          {/* Absolutely positioned image to take full height on the left */}
          <img 
            src="/verify-account.svg" 
            alt="Verify"
            className="absolute left-0 top-0 h-full w-25 object-cover pointer-events-none z-0" 
          />
          
          {/* Text Content (Added pl-12 to push text past the absolute image) */}
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
          <Button className="bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white rounded-2xl h-14 font-semibold text-sm flex items-center justify-center gap-2 shadow-none">
            Receive <img src="/receive.svg" alt="" />
          </Button>
          <Button className="bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white rounded-2xl h-14 font-semibold text-sm flex items-center justify-center gap-2 shadow-none">
            Swap <img src="/swap.svg" alt="" />
          </Button>
        </div>

        {/* --- FEATURE GRID --- */}
        <div className="mx-6 mt-6 flex justify-between items-start">
          <FeatureIcon icon={<img src="/prediction.svg" alt=""/>} label="Prediction" color="bg-[#E5E0FF]" />
          <FeatureIcon icon={<img src="/group.svg" alt=""/>} label="Group" color="bg-[#FFF0D4]" />
          <FeatureIcon icon={<img src="/bills.svg" alt=""/>} label="Bills" color="bg-[#DBEAFE]" />
          <FeatureIcon icon={<img src="/data.svg" alt=""/>} label="Data" color="bg-[#FCE7F3]" />
          <FeatureIcon icon={<img src="/more.svg" alt=""/>} label="More" color="bg-white" />
        </div>

        {/* --- PROMO BANNERS --- */}
        <div className="mx-5 mt-6 space-y-4 mb-8">
          {/* Purple Banner */}
          <div className="w-full bg-[#EAE5FF] rounded-2xl p-5 flex items-center justify-between overflow-hidden relative">
            <div className="flex flex-col gap-3 z-10 w-2/3">
              <p className="text-[#5B3EE4] text-xs font-medium leading-snug">Enjoy amazing benefit when you<br />invite new users.</p>
              <Button className="bg-[#5B3EE4] hover:bg-[#4a32be] text-white rounded-xl h-8 w-fit text-xs px-4 shadow-none">
                Learn more
              </Button>
            </div>
            {/* Placeholder for Coins Image */}
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
            {/* Placeholder for Money Bag Image */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-32 h-32 bg-orange-400 rounded-full blur-sm opacity-50 pointer-events-none"></div>
            <div className="absolute -right-2 bottom-0 text-7xl">💰</div>
          </div>
        </div>

        {/* --- BOTTOM FLOATING NAV --- */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[400px] bg-white/70 backdrop-blur-xl border border-white/30 shadow-2xl px-2 py-2 flex justify-between items-center z-50 rounded-[2.5rem]">
          <NavItem iconSrc="/home.svg" label="Home" isActive />
          <NavItem iconSrc="/agent.svg" label="Agent" />
          <NavItem iconSrc="/dapps.svg" label="Dapps" />
          <NavItem iconSrc="/trade.svg" label="Trade" />
        </div>

      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function FeatureIcon({ icon, label, color }: { icon: React.ReactNode, label: string, color: string }) {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer group">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${color} transition-transform group-hover:scale-105`}>
        {icon}
      </div>
      <span className="text-white text-[11px] font-medium">{label}</span>
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
      className={`flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-300 ${
        isActive 
          ? "bg-[#EAE5FF] text-[#5B3EE4] px-5 py-1 rounded-3xl" 
          : "text-gray-500 px-3 py-1 hover:text-gray-700"
      }`}
    >
      <img 
        src={iconSrc} 
        alt={label} 
        // If you are using colored images, the CSS filter below will make inactive ones gray
        className={`w-6 h-6 object-contain ${isActive ? "" : "opacity-60 grayscale"}`} 
      />
      <span className="text-[11px] font-semibold">{label}</span>
    </div>
  );
}