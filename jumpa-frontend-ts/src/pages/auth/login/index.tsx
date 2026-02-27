import { useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, ChevronRight } from "lucide-react";

// --- ZOD SCHEMA ---
const formSchema = z.object({
    pin: z.string().length(4, "PIN must be exactly 4 digits"),
});

export default function LoginForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { pin: "" },
    });

    const currentPin = form.watch("pin");

    // --- DUMMY API CALL ---
    const executeLogin = async (pinCode: string) => {
        setLoading(true);
        setHasError(false);

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Dummy authentication logic (assume '1234' is the correct pin)
        if (pinCode === "1234") {
            console.log("Login successful!");
            navigate("/home"); // Navigate to next screen
        } else {
            console.error("Login failed: Incorrect PIN");
            setHasError(true);
        }
        
        setLoading(false);
    };

    // --- KEYPAD LOGIC ---
    const handleKeyPress = (key: string) => {
        if (loading) return;

        let newPin = currentPin;

        // If the user types after an error, clear the board first
        if (hasError) {
            newPin = "";
            setHasError(false);
        }

        if (newPin.length < 4) {
            newPin += key;
            form.setValue("pin", newPin, { shouldValidate: true });

            // Auto-submit when 4 digits are reached
            if (newPin.length === 4) {
                executeLogin(newPin);
            }
        }
    };

    const handleDelete = () => {
        if (loading) return;
        
        if (hasError) {
            form.setValue("pin", "");
            setHasError(false);
            return;
        }

        if (currentPin.length > 0) {
            form.setValue("pin", currentPin.slice(0, -1), { shouldValidate: true });
        }
    };

    return (
        <div className="fixed inset-0 w-full h-dvh bg-black text-white flex flex-col items-center justify-between py-12">
            
            {/* --- HEADER --- */}
            <div className="flex flex-col items-center mt-16 w-full px-6 text-center">
                <h1 className="text-3xl font-bold mb-3">Welcome back!</h1>
                {hasError ? (
                    <p className="text-[#A1A1AA] text-[15px]">Confirm your 4 - digit passcode.</p>
                ) : (
                    <p className="text-[#A1A1AA] text-[15px]">Enter your 4 - digit passcode.</p>
                )}

                {/* --- PIN INDICATORS --- */}
                <div className="flex flex-col items-center mt-12 mb-4 h-16">
                    <div className="flex gap-4">
                        {[0, 1, 2, 3].map((index) => {
                            const isFilled = index < currentPin.length;
                            
                            // Determine dot color based on state
                            let dotClass = "bg-[#262626]"; // Empty state
                            if (isFilled) {
                                if (hasError) dotClass = "bg-red-500";
                                else dotClass = "bg-[#8B5CF6]"; // The purple color
                            }

                            return (
                                <div
                                    key={index}
                                    className={`w-4 h-4 rounded-full transition-colors duration-200 ${
                                        loading && isFilled && !hasError ? "animate-pulse" : ""
                                    } ${dotClass}`}
                                />
                            );
                        })}
                    </div>
                    
                    {/* Error Message Space */}
                    <div className="h-6 mt-4">
                        {hasError && (
                            <span className="text-red-500 text-sm font-medium">Wrong passcode.</span>
                        )}
                    </div>
                </div>
            </div>

            {/* --- CUSTOM KEYPAD --- */}
            <div className="w-full max-w-xs mx-auto mb-auto mt-8">
                <div className="grid grid-cols-3 gap-x-6 gap-y-6 justify-items-center">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <KeypadButton 
                            key={num} 
                            onClick={() => handleKeyPress(num.toString())}
                            disabled={loading}
                        >
                            {num}
                        </KeypadButton>
                    ))}
                    
                    {/* Empty spot bottom left */}
                    <div /> 

                    <KeypadButton onClick={() => handleKeyPress("0")} disabled={loading}>
                        0
                    </KeypadButton>
                    
                    {/* Backspace bottom right */}
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={loading || currentPin.length === 0}
                        className="w-20 h-20 rounded-full flex items-center justify-center text-white active:bg-[#333333] transition-colors disabled:opacity-50"
                    >
                        <X className="w-7 h-7" />
                    </button>
                </div>
            </div>

            {/* --- FOOTER LINK --- */}
            <div className="pb-6">
                <Link 
                    to="/forgot-password-email" 
                    className="text-[#A1A1AA] text-sm flex items-center gap-1 hover:text-white transition-colors"
                >
                    Forgot Password <ChevronRight className="w-4 h-4" />
                </Link>
            </div>

        </div>
    );
}

// --- SUB-COMPONENT: Keypad Button ---
interface KeypadButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
}

function KeypadButton({ children, onClick, disabled }: KeypadButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="w-20 h-20 rounded-full bg-[#1C1C1E] text-white text-3xl flex items-center justify-center active:bg-[#333333] transition-colors disabled:opacity-50"
        >
            {children}
        </button>
    );
}