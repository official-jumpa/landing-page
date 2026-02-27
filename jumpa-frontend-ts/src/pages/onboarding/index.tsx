import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Assuming Shadcn Button
import LoginDrawer from "../auth/login/login-drawer";

const onboardingData = [
    {
        title: "Trade in chats.",
        description: "Jumpa lets you trade, send money, and move between stablecoins and local cash.",
    },
    {
        title: "Trade together.",
        description: "Pool funds Assign a trader. Automatically split profits. Built for communities.",
    },
    {
        title: "Your Financial Agent.",
        description: "Set price alerts. Auto-execute trades. Split bills with voice. Save toward goals.",
    },
    {
        title: "Smart Saving Agent.",
        description: "A smart savings agent that invests your funds to help you reach your goals.",
    },
];

export default function Onboarding() {
    const [currentScreen, setCurrentScreen] = useState(0);
    const navigate = useNavigate();
    const touchStartX = useRef<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        if (touchStartX.current === null) return;

        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX.current - touchEndX;

        // Swipe threshold
        if (diff > 50 && currentScreen < onboardingData.length) {
            // Swipe left → next
            setCurrentScreen((prev) => prev + 1);
        } else if (diff < -50 && currentScreen > 0) {
            // Swipe right → previous
            setCurrentScreen((prev) => prev - 1);
        }

        touchStartX.current = null;
    };

    const handleNext = () => {
        if (currentScreen < onboardingData.length) {
            setCurrentScreen((prev) => prev + 1);
        }
    };

    // --- FINAL SCREEN (WALLET CREATION) ---
    if (currentScreen === onboardingData.length) {
        return (
            <div className="fixed inset-0 w-full h-dvh bg-black flex flex-col justify-center items-center pb-10 px-6 ">
                {/* Logo positioned just above the buttons */}
                <div className="flex items-center justify-center mb-12">
                    <img
                        src="/large-logo.svg"
                        alt="Jumpa Logo"
                        className="w-full h-full object-contain "
                    />
                </div>

                {/* Bottom Buttons */}
                <div className="w-full flex flex-col gap-3 max-w-md pb-6">
                    <Button
                        onClick={() => navigate("/create-account")}
                        className="w-full h-12 rounded-xl bg-white hover:bg-gray-200 text-black text-base shadow-none transition-colors"
                    >
                        Create a new wallet
                    </Button>

                    <LoginDrawer />
                </div>
            </div>
        );
    }

    // --- ONBOARDING CAROUSEL SCREENS (1-4) ---
    const screenData = onboardingData[currentScreen];

    return (
        <div
            className="fixed inset-0 w-full h-dvh bg-black flex flex-col justify-end items-center pb-10 px-6"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="w-full max-w-md flex flex-col items-center pb-6">

                {/* Pagination Dots */}
                <div className="flex gap-2 justify-center mb-4">
                    {onboardingData.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${currentScreen === index ? "bg-white" : "bg-[#333333]"
                                }`}
                        />
                    ))}
                </div>

                {/* Inline Title & Description */}
                <div className="text-center mb-8 px-2">
                    <p className="text-[15px] leading-relaxed tracking-wide text-[#9CA3AF]">
                        <span className="font-bold text-white pr-1">
                            {screenData.title}
                        </span>
                        {screenData.description}
                    </p>
                </div>

                {/* Get Started Button */}
                <Button
                    onClick={handleNext}
                    className="w-full h-12 rounded-xl bg-white hover:bg-gray-200 text-black text-[15px] shadow-none transition-colors"
                >
                    Get started
                </Button>
            </div>
            <LoginDrawer />
        </div>
        
    );
}