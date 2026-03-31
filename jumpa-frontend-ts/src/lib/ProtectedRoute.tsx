import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { hasWallet } from "@/lib/wallet-store";
import { getMe } from "@/lib/api";

type AuthState = "checking" | "authenticated" | "no-wallet" | "no-session";

/**
 * Wraps routes that require both:
 * 1. A wallet in localStorage (device is set up)
 * 2. An active server-side session (user is logged in)
 */
export default function ProtectedRoute() {
    const location = useLocation();
    const [authState, setAuthState] = useState<AuthState>("checking");

    useEffect(() => {
        // No wallet on device → send to onboarding
        if (!hasWallet()) {
            console.log("[ProtectedRoute] No wallet in localStorage");
            setAuthState("no-wallet");
            return;
        }

        // Check for active session
        console.log("[ProtectedRoute] Wallet found — checking session...");
        getMe().then((res) => {
            if (res.data) {
                console.log("[ProtectedRoute] Session valid — access granted");
                setAuthState("authenticated");
            } else {
                console.log("[ProtectedRoute] No active session — redirecting to /login");
                setAuthState("no-session");
            }
        });
    }, []);

    if (authState === "checking") {
        return (
            <div className="fixed inset-0 bg-black flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    if (authState === "no-wallet") {
        return <Navigate to="/onboarding" replace />;
    }

    if (authState === "no-session") {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}
