import { useState, useRef } from "react";
import { Button } from "@/components/ui/button"; // Assuming Shadcn Button
import LoginDrawer from "../auth/login/login-drawer";
import CreateAccountDrawer from "../home/create-account/create-account-drawer";

const onboardingData = [
    {
        title: "Trade in chats.",
        description: "Jumpa lets you trade, send money, and move between stablecoins and local cash.",
        image: "/image-1.svg", // The foreground illustration
    },
    {
        title: "Trade together.",
        description: "Pool funds. Assign a trader. Automatically split profits. Built for communities.",
        image: "/onboarding-2.png",
    },
    {
        title: "Your Financial Agent.",
        description: "Set price alerts. Auto-execute trades. Split bills with voice. Save toward goals.",
        image: "/onboarding-3.png",
    },
    {
        title: "Smart Saving Agent.",
        description: "A smart savings agent that invests your funds to help you reach your goals.",
        image: "/onboarding-4.png",
    },
];

export default function Onboarding() {
    const [currentScreen, setCurrentScreen] = useState(0);
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
            setCurrentScreen((prev) => prev + 1);
        } else if (diff < -50 && currentScreen > 0) {
            setCurrentScreen((prev) => prev - 1);
        }

        touchStartX.current = null;
    };

    const handleNext = () => {
        if (currentScreen < onboardingData.length) {
            setCurrentScreen((prev) => prev + 1);
        }
    };

    const handleSkip = () => {
        setCurrentScreen(onboardingData.length);
    };

    // --- FINAL SCREEN (WALLET CREATION) ---
    if (currentScreen === onboardingData.length) {
        return (
            <div
                // Using the background image here as well
                className="fixed inset-0 w-full h-dvh bg-black bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center pb-10 px-6"
            >
                <div className="flex items-center justify-center mb-12">
                    <img
                        src="/large-logo.svg"
                        alt="Jumpa Logo"
                        className="w-full h-full object-contain"
                    />
                </div>

                <div className="w-full flex flex-col gap-3 max-w-md pb-6">
                    <CreateAccountDrawer />
                    <LoginDrawer />
                </div>
            </div>
        );
    }

    // --- ONBOARDING CAROUSEL SCREENS (1-4) ---
    const screenData = onboardingData[currentScreen];

    return (
        <div
            // Replaced CSS gradient with the background image
            className="fixed inset-0 w-full h-dvh bg-black bg-cover bg-center bg-no-repeat flex flex-col justify-between items-center pb-10 px-6 pt-14"
            style={{ backgroundImage: "url('/gradient-bg.svg')" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Top Bar with Skip Button */}
            <div className="w-full flex justify-end max-w-md z-10">
                <button
                    onClick={handleSkip}
                    className="bg-white/10 hover:bg-white/20 text-white text-[13px] font-medium px-4 py-2 rounded-xl backdrop-blur-md transition-colors"
                >
                    Skip
                </button>
            </div>

            {/* Foreground Image Area */}
            <div className="flex-1 w-full max-w-md flex flex-col items-center justify-center my-6 z-10">
                {/* When you have the real images, replace this placeholder div with:
                  <img src={screenData.image} alt={screenData.title} className="w-full max-w-[280px] h-auto object-contain" /> 
                */}
                <img src={screenData.image} className="w-full h-full" alt="" />

            </div>

            {/* Bottom Content (Text & Buttons) */}
            <div className="w-full max-w-md flex flex-col items-center pb-6 z-10">
                {/* Pagination Dots */}
                <div className="flex gap-2 justify-center mb-6">
                    {onboardingData.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${currentScreen === index
                                    ? "bg-white"
                                    : "bg-white/30"
                                }`}
                        />
                    ))}
                </div>

                {/* Inline Title & Description */}
                <div className="text-center mb-8 px-2 min-h-[60px]">
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
                    className="w-full h-12 rounded-xl bg-white hover:bg-gray-200 text-black text-[15px] font-semibold shadow-none transition-colors"
                >
                    Get started
                </Button>
            </div>
        </div>
    );
}