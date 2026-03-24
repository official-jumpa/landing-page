"use client"

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginDrawer from "../auth/login/login-drawer";
import CreateAccountDrawer from "../home/create-account/create-account-drawer";
import "./Onboarding.css";

// Assets
import onboardOne from "../../assets/images/illustrations/onboard-one.svg";
import nairaIcon from "../../assets/images/illustrations/naira.svg";
import onboardTwo from "../../assets/images/illustrations/onboard-two.svg";
import coinImg from "../../assets/images/illustrations/IMG_5094 1.svg";
import dollarIcon from "../../assets/images/illustrations/Dollar coin - Gold@4x 1.svg";
import chartRing from "../../assets/images/illustrations/IMG_5091 1.svg";
import listCards from "../../assets/images/illustrations/Group 120 (2).png";
import goldCoinSecondary from "../../assets/images/illustrations/Dollar coin - Gold@4x 1 (1).svg";
import chartMockup from "../../assets/images/illustrations/Chart Mockup III 1.svg";

const onboardingData = [
    {
        title: "Trade in chats.",
        description: "Jumpa lets you trade, send money, and move between stablecoins and local cash.",
    },
    {
        title: "Trade together.",
        description: "Pool funds. Assign a trader. Automatically split profits. Built for communities.",
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
                // Reduced padding on small screens (px-4, pb-6)
                className="fixed inset-0 w-full h-dvh bg-black bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center pb-6 sm:pb-10 px-4 sm:px-6"
            >
                {/* Scaled down bottom margin on small screens to prevent crowding */}
                <div className="flex items-center justify-center mb-8 sm:mb-12 w-[80%] sm:w-full max-w-[250px]">
                    <img
                        src="/large-logo.svg"
                        alt="Jumpa Logo"
                        className="w-full h-full object-contain"
                    />
                </div>

                <div className="w-full flex flex-col gap-3 max-w-md pb-4 sm:pb-6">
                    <CreateAccountDrawer />
                    <LoginDrawer />
                </div>
            </div>
        );
    }

    // --- ONBOARDING CAROUSEL SCREENS (1-4) ---
    const screenData = onboardingData[currentScreen];

    const renderIllustration = () => {
        switch (currentScreen) {
            case 0:
                return (
                    <div className="onboarding-illustration-container">
                        <img src={onboardOne} className="onboarding-img-one" alt="" />
                        <img src={nairaIcon} className="onboarding-naira-icon" alt="" />
                    </div>
                );
            case 1:
                return (
                    <div className="onboarding-illustration-container">
                        <img src={onboardTwo} className="onboarding-img-two" alt="" />
                        <img src={coinImg} className="onboarding-coin-left" alt="" />
                        <img src={dollarIcon} className="onboarding-coin-right" alt="" />
                    </div>
                );
            case 2:
                return (
                    <div className="onboarding-illustration-container">
                        <img src={chartRing} className="onboarding-chart-ring" alt="" />
                        <img src={listCards} className="onboarding-list-cards" alt="" />
                        <img src={goldCoinSecondary} className="onboarding-gold-coin-alt" alt="" />
                    </div>
                );
            case 3:
                return (
                    <div className="onboarding-illustration-container">
                        <img src={chartMockup} className="onboarding-chart-mockup" alt="" />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div
            className="fixed inset-0 w-full h-dvh bg-black bg-cover bg-center bg-no-repeat flex flex-col items-center pb-6 sm:pb-10 overflow-hidden"
            style={{ backgroundImage: "url('/gradient-bg.svg')" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Top Bar with Skip Button - Positioned with 4x literal top offset */}
            <div className="w-full flex justify-end max-w-md z-50 px-4 sm:px-6" style={{ marginTop: "107px" }}>
                <button
                    onClick={handleSkip}
                    className="onboarding-skip-button"
                >
                    <span className="onboarding-skip-text">Skip</span>
                </button>
            </div>

            {/* Foreground Image Area - Removed max-w-md to allow edge-to-edge */}
            <div className="flex-1 w-full flex flex-col items-center justify-center my-4 sm:my-6 z-10 min-h-0 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentScreen}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        {renderIllustration()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom Content (Text & Buttons) - Added px-4 back here */}
            <div className="w-full max-w-md flex flex-col items-center pb-2 sm:pb-6 z-10 shrink-0 px-4 sm:px-6">
                {/* Pagination Dots */}
                <div className="flex gap-2 justify-center mb-4 sm:mb-6">
                    {onboardingData.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                                currentScreen === index ? "bg-white" : "bg-white/30"
                            }`}
                        />
                    ))}
                </div>

                {/* Inline Title & Description */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentScreen}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="onboarding-text-container"
                    >
                        <p className="inline-block px-4">
                            <span className="onboarding-title">{screenData.title} </span>
                            <span className="onboarding-description">{screenData.description}</span>
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Get Started Button */}
                <button
                    onClick={handleNext}
                    className="onboarding-get-started-button"
                >
                    <span className="onboarding-get-started-text">Get started</span>
                </button>
            </div>
        </div>
    );
}