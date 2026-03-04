import { useState } from "react";
import { ArrowLeft, Clock, Search, X, Delete } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Mock Data
const MOCK_BENEFICIARIES = [
    { id: 1, name: "0904 567 6784", network: "Airtel", type: "new" },
    { id: 2, name: "me", phone: "0912 678 4565", network: "MTN", type: "saved" },
    { id: 3, name: "0945 879 098", network: "Glo", type: "saved" },
    { id: 4, name: "080 456 678", network: "MTN", type: "saved" },
];

const QUICK_AMOUNTS = [
    { amount: 100, pay: 98 },
    { amount: 200, pay: 196 },
    { amount: 300, pay: 294 },
    { amount: 1000, pay: 980 },
    { amount: 2000, pay: 1960 },
    { amount: 5000, pay: 4900 },
];

export default function AirtimeFlow() {
    // Flow State
    const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Number, 2: Amount, 3: Success
    const [phone, setPhone] = useState("");
    const [search, setSearch] = useState("");
    const [amount, setAmount] = useState("");
    const [network, setNetwork] = useState<"MTN" | "Airtel" | "Glo">("MTN");
    const navigate = useNavigate();

    // Modal States
    const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    // Computed
    const filteredBeneficiaries = MOCK_BENEFICIARIES.filter(b =>
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        (b.phone && b.phone.includes(search))
    );

    const discountAmount = amount ? Math.max(0, parseInt(amount) - 2) : 0; // Simple flat -2 or 2% logic based on your design

    // Handlers
    const handleKeypadPress = (val: string) => {
        if (val === "delete") {
            setAmount(prev => prev.slice(0, -1));
        } else {
            setAmount(prev => prev + val);
        }
    };

    const handlePay = () => {
        setIsConfirmModalOpen(false);
        setStep(3);
    };

    // --- RENDERS ---

    return (
        <div className="fixed inset-0 w-full h-dvh bg-[#050505] text-white flex justify-center pb-10">
            <div className="w-full max-w-md bg-[#050505] flex flex-col relative overflow-hidden h-full mt-5">

                {/* --- STEP 1: SELECT PHONE & BENEFICIARY --- */}
                {step === 1 && (
                    <div className="flex flex-col h-full px-5 py-6 overflow-y-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-[#1C1C1E] flex items-center justify-center hover:bg-[#2C2C2E] transition">
                                <ArrowLeft className="w-5 h-5 text-gray-300" />
                            </button>
                            <h1 className="text-lg font-semibold">Airtime</h1>
                            <button className="w-10 h-10 rounded-full bg-[#1C1C1E] flex items-center justify-center hover:bg-[#2C2C2E] transition">
                                <Clock className="w-5 h-5 text-gray-300" />
                            </button>
                        </div>

                        {/* Promo Banner */}
                        <div
                            className="w-full h-20 rounded-2xl p-4 mb-6 relative overflow-hidden bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: "url('/airtime_bg.svg')" }}
                        >
                            <div className="relative z-10 w-2/3 h-full flex items-center">
                                <p className="text-white font-semibold text-sm leading-tight">
                                    Enjoy 2 Naira discount on all recharge
                                </p>
                            </div>
                        </div>

                        {/* Phone Input */}
                        <div className="mb-6">
                            <label className="text-sm text-gray-400 mb-2 block">Enter phone number</label>
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    placeholder="0901 000 0000"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-[#1C1C1E] border border-white/5 rounded-2xl h-14 pl-4 pr-14 text-white placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6] transition-colors"
                                />
                                <button className="absolute right-2 w-10 h-10 rounded-full bg-[#2C2C2E] flex items-center justify-center text-[#8B5CF6]">
                                    <img src="/phone.svg" alt="" />
                                </button>
                            </div>

                            {/* Network Selector Chip (Appears when typing) */}
                            {phone.length > 3 && (
                                <div
                                    onClick={() => setIsNetworkModalOpen(true)}
                                    className="mt-3 inline-flex items-center gap-2 bg-[#1C1C1E] border border-white/10 rounded-full px-3 py-1.5 cursor-pointer hover:bg-[#2C2C2E]"
                                >
                                    <img
                                        src={
                                            network === 'MTN' ? '/mtn.svg' :
                                                network === 'Airtel' ? '/airtel.svg' : '/glo.svg'
                                        }
                                        alt={`${network} logo`}
                                        className="w-5 h-5 rounded-full object-cover bg-white"
                                    />
                                    <span className="text-xs font-semibold">{network}</span>
                                </div>
                            )}
                        </div>

                        {/* Beneficiaries List */}
                        <div className="flex-1 flex flex-col">
                            <label className="text-sm text-gray-400 mb-3 block">Select beneficiary</label>

                            <div className="relative mb-4">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search here"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full bg-[#1C1C1E] border border-white/5 rounded-2xl h-12 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6]"
                                />
                            </div>

                            <div className="bg-[#1C1C1E] border border-white/5 rounded-3xl p-2 flex-1 overflow-y-auto">
                                {filteredBeneficiaries.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                                        <div className="flex -space-x-3 mb-3">
                                            <img src="/group_airtime.svg" />
                                        </div>
                                        <span>No beneficiary</span>
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        {filteredBeneficiaries.map((b) => (
                                            <div
                                                key={b.id}
                                                onClick={() => { setPhone(b.phone || b.name); setStep(2); }}
                                                className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#2C2C2E] cursor-pointer transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden flex items-center justify-center border border-white/10">
                                                        {b.type === 'saved' ? <img src="/avatar_1.svg" alt="" /> : <img src="/avatar_2.svg" alt="" />}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-semibold">{b.name}</span>
                                                        <span className="text-xs text-gray-500">{b.network} {b.phone && `• ${b.phone}`}</span>
                                                    </div>
                                                </div>
                                                <div className="w-5 h-5 rounded-full border border-gray-600"></div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Absolute Continue button when phone is typed */}
                        {phone.length >= 10 && (
                            <div className="mt-4">
                                <Button onClick={() => setStep(2)} className="w-full h-14 rounded-2xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-base shadow-none">
                                    Continue
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {/* --- STEP 2: ADD AMOUNT --- */}
                {step === 2 && (
                    <div className="flex flex-col h-full px-5 py-6 relative">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-8">
                            <button onClick={() => setStep(1)} className="w-10 h-10 rounded-full bg-[#1C1C1E] flex items-center justify-center hover:bg-[#2C2C2E] transition">
                                <ArrowLeft className="w-5 h-5 text-gray-300" />
                            </button>
                            <h1 className="text-lg font-semibold ml-16">Add amount</h1>
                        </div>

                        {/* Selected Network Info */}
                        <div className="flex items-center justify-center gap-2 mb-8 text-sm">
                            <img
                                src={`/${network.toLowerCase()}.svg`}
                                alt={`${network} logo`}
                                className="w-5 h-5 rounded-full object-cover bg-white"
                            />
                            <span className="text-blue-500 font-semibold">{network}</span>
                            <span className="text-gray-400">{phone}</span>
                        </div>

                        {/* Big Amount Input Display */}
                        <div className="text-center mb-8">
                            <h1 className={`text-5xl font-bold tracking-tight mb-2 ${amount ? 'text-white' : 'text-gray-600'}`}>
                                ₦ {amount || "0"}
                            </h1>
                            <p className="text-gray-500 text-xs">Allowed limit: ₦100 - ₦ 500,000</p>
                        </div>

                        {/* Quick Amounts Grid - UPDATED DESIGN */}
                        <div className="grid grid-cols-3 gap-y-5 gap-x-3 mb-auto pt-2">
                            {QUICK_AMOUNTS.map((q) => {
                                const saveAmount = q.amount - q.pay;
                                return (
                                    <div
                                        key={q.amount}
                                        onClick={() => setAmount(q.amount.toString())}
                                        className={`relative bg-[#1C1C1E] rounded-2xl p-3 pt-5 flex flex-col items-center justify-center cursor-pointer border transition-colors ${
                                            amount === q.amount.toString() 
                                                ? "border-[#8B5CF6] bg-[#8B5CF6]/10" 
                                                : "border-transparent hover:bg-[#2C2C2E]"
                                        }`}
                                    >
                                        <div className="absolute -top-3 left-3 bg-[#EAE5FF] text-[#5B3EE4] text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                            Save ₦ {saveAmount}
                                        </div>
                                        <span className="font-bold text-2xl text-white mb-1">₦ {q.amount}</span>
                                        <span className="text-[13px] text-gray-500 font-medium tracking-wide">Pay ₦ {q.pay}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Continue Button & Custom Keypad */}
                        <div className="mt-auto">
                            <Button
                                onClick={() => setIsConfirmModalOpen(true)}
                                disabled={!amount}
                                className={`w-full h-14 rounded-2xl font-semibold text-base shadow-none mb-6 ${amount ? "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white" : "bg-[#2C2C2E] text-gray-500"
                                    }`}
                            >
                                Continue
                            </Button>

                            {/* Custom Numeric Keypad */}
                            <div className="bg-[#1C1C1E] -mx-5 -mb-6 p-5 pt-4 rounded-t-3xl border-t border-white/5">
                                <div className="flex justify-between items-center mb-4 px-2">
                                    <span className="text-xs text-gray-500">Jumpa Secure Numeric Keypad</span>
                                    <button className="text-[#8B5CF6] text-xs font-semibold">Done</button>
                                </div>
                                <div className="grid grid-cols-3 gap-x-2 gap-y-3">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                        <button key={num} onClick={() => handleKeypadPress(num.toString())} className="h-12 bg-[#2C2C2E] rounded-xl text-xl font-medium active:bg-[#3C3C3E] transition-colors">{num}</button>
                                    ))}
                                    <div className="h-12"></div> {/* Empty slot bottom left */}
                                    <button onClick={() => handleKeypadPress("0")} className="h-12 bg-[#2C2C2E] rounded-xl text-xl font-medium active:bg-[#3C3C3E] transition-colors">0</button>
                                    <button onClick={() => handleKeypadPress("delete")} className="h-12 bg-[#2C2C2E] rounded-xl flex items-center justify-center active:bg-[#3C3C3E] transition-colors">
                                        <Delete className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- STEP 3: SUCCESS --- */}
                {step === 3 && (
                    <div className="flex flex-col items-center justify-center h-full px-5 py-6 relative">
                        <button onClick={() => navigate("/home")} className="absolute top-6 left-5 w-10 h-10 rounded-full bg-[#1C1C1E] flex items-center justify-center hover:bg-[#2C2C2E] transition">
                            <X className="w-5 h-5 text-gray-300" />
                        </button>

                        <div className="flex flex-col items-center">
                            {/* Custom jagged starburst shape (approximated with a rotated div layer) */}
                           <img src="/airtime_success.svg" alt="" />

                            <h2 className="text-4xl mb-2">Successful</h2>
                            <h3 className="text-gray-400 text-2xl font-medium">₦ {amount}.00</h3>
                        </div>
                    </div>
                )}

                {/* --- MODALS --- */}

                {/* Change Network Modal */}
                {isNetworkModalOpen && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                        {/* Modal Box */}
                        <div className="bg-[#111111] mt-130 w-full max-w-sm rounded-3xl p-6 relative shadow-2xl border border-white/10 animate-in slide-in-from-bottom-8 duration-300">

                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold">Change mobile network</h3>
                                <button onClick={() => setIsNetworkModalOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                    <X className="w-4 h-4 text-gray-400" />
                                </button>
                            </div>

                            <div className="space-y-3">
                                {[
                                    { name: "MTN", icon: "/mtn.svg", isBest: true },
                                    { name: "Airtel", icon: "/airtel.svg", isBest: false },
                                    { name: "Glo", icon: "/glo.svg", isBest: false }
                                ].map(n => (
                                    <div
                                        key={n.name}
                                        onClick={() => { setNetwork(n.name as any); setIsNetworkModalOpen(false); }}
                                        className="bg-[#1C1C1E] p-4 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-[#2C2C2E] border border-transparent hover:border-white/10 transition-all"
                                    >
                                        <img
                                            src={n.icon}
                                            alt={`${n.name} logo`}
                                            className="w-8 h-8 rounded-full object-cover bg-white"
                                        />
                                        <span className="font-semibold text-[15px]">{n.name}</span>
                                        {n.isBest && <span className=" bg-orange-100/90 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded-md">Suggested</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Confirm Payment Modal - UPDATED DESIGN */}
                {isConfirmModalOpen && (
                    <div className="absolute inset-0 z-50 flex items-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-[#111111] w-full rounded-t-3xl p-6 relative animate-in slide-in-from-bottom-8 duration-300 pb-10 border-t border-white/10">
                            <button onClick={() => setIsConfirmModalOpen(false)} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                <X className="w-4 h-4 text-gray-400" />
                            </button>

                            <div className="text-center mt-6 mb-8 flex flex-col items-center">
                                <h2 className="text-4xl font-bold text-white mb-2">
                                    ₦ {parseInt(amount) - discountAmount}
                                </h2>
                                <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                                    <span>N{amount}</span>
                                    <span className="bg-[#EAE5FF] text-[#5B3EE4] px-2 py-0.5 rounded-md text-[11px] font-bold">
                                        Save ₦ {discountAmount}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 mb-6 bg-[#18181B] border border-white/5 p-4 rounded-xl">
                                <span className="text-sm text-gray-500 font-medium">TO:</span>
                                <img
                                    src={`/${network.toLowerCase()}.svg`}
                                    alt={`${network} logo`}
                                    className="w-5 h-5 rounded-full object-cover bg-white"
                                />
                                <span className="text-blue-500 text-sm font-semibold">{network}</span>
                                <span className="text-gray-400 text-sm ml-auto">"{phone}"</span>
                            </div>

                            <div className="space-y-3 mb-8">
                                <div className="bg-[#1C1C1E] p-5 rounded-2xl space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Airtime Value</span>
                                        <span className="font-medium text-white">₦ {amount}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Discount Applied</span>
                                        <span className="font-medium text-[#8B5CF6]">₦ {discountAmount}</span>
                                    </div>
                                </div>

                                <div className="bg-[#1C1C1E] p-5 rounded-2xl">
                                    <div className="flex justify-between items-center text-[15px] font-bold">
                                        <span className="text-gray-400 font-normal">Total debit</span>
                                        <span className="text-[#8B5CF6]">₦ {parseInt(amount) - discountAmount}</span>
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={handlePay}
                                className="w-full h-14 rounded-2xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-[17px] shadow-none"
                            >
                                Pay ₦{parseInt(amount) - discountAmount}
                            </Button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}