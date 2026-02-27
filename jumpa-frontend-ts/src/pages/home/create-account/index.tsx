import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";

// --- ZOD SCHEMA ---
const formSchema = z.object({
    pin: z.string().max(4),
});

export default function CreateAccountForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    
    // --- STEP MANAGEMENT ---
    const [step, setStep] = useState<1 | 2>(1);
    const [createdPin, setCreatedPin] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { pin: "" },
    });

    const currentPin = form.watch("pin");

    // --- DUMMY API CALL ---
    const executeSubmit = async (finalPin: string) => {
        setLoading(true);
        setHasError(false);

        // Simulate network delay for account creation/pin setting
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        console.log("Pin successfully created & confirmed:", finalPin);
        setLoading(false);
        
        // Navigate to the next page upon success
        navigate("/import-options"); 
    };

    // --- KEYPAD LOGIC ---
    const handleKeyPress = (key: string) => {
        if (loading) return;

        let newPin = currentPin;

        // If user types after an error, clear the board and send them back to Step 1
        if (hasError) {
            newPin = "";
            setHasError(false);
            setStep(1);
            setCreatedPin("");
        }

        if (newPin.length < 4) {
            newPin += key;
            form.setValue("pin", newPin);

            // Trigger logic when 4 digits are reached
            if (newPin.length === 4) {
                if (step === 1) {
                    // STEP 1 COMPLETE: Save pin and move to Step 2
                    // We use a tiny 300ms timeout so the user actually sees the 4th dot fill up before it clears
                    setTimeout(() => {
                        setCreatedPin(newPin);
                        setStep(2);
                        form.setValue("pin", "");
                    }, 300);
                } else if (step === 2) {
                    // STEP 2 COMPLETE: Compare pins
                    if (newPin === createdPin) {
                        executeSubmit(newPin);
                    } else {
                        // Mismatch
                        setHasError(true);
                    }
                }
            }
        }
    };

    const handleDelete = () => {
        if (loading) return;
        
        if (hasError) {
            form.setValue("pin", "");
            setHasError(false);
            setStep(1);
            setCreatedPin("");
            return;
        }

        if (currentPin.length > 0) {
            form.setValue("pin", currentPin.slice(0, -1));
        }
    };

    return (
        <div className="min-h-dvh w-full bg-black text-white flex flex-col justify-between py-8 overflow-y-auto">
            
            <div className="w-full max-w-sm mx-auto flex flex-col flex-1">
                {/* --- HEADER --- */}
                <div className="mt-8 sm:mt-16 w-full px-6 text-left">
                    <h1 className="text-[28px] sm:text-3xl font-bold leading-tight">
                        {step === 1 ? "Create your 4-digit passcode." : "Confirm your 4-digit passcode."}
                    </h1>
                </div>

                {/* --- PIN INDICATORS --- */}
                <div className="flex flex-col items-center justify-center mt-12 mb-4 h-24">
                    <div className="flex gap-4">
                        {[0, 1, 2, 3].map((index) => {
                            const isFilled = index < currentPin.length;
                            
                            // Determine dot color based on state
                            let dotClass = "bg-[#262626]"; // Empty state (Dark Grey)
                            if (isFilled) {
                                if (hasError) dotClass = "bg-red-500";
                                else dotClass = "bg-[#8B5CF6]"; // Solid Purple
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
                            <span className="text-red-500 text-xs font-medium">Does not match</span>
                        )}
                    </div>
                </div>

                {/* --- CUSTOM KEYPAD --- */}
                <div className="w-full mt-auto mb-8 flex-1 flex flex-col justify-end">
                    <div className="grid grid-cols-3 gap-x-6 gap-y-4 sm:gap-y-6 justify-items-center">
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
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white active:bg-[#333333] transition-colors disabled:opacity-50"
                        >
                            <X className="w-6 h-6 sm:w-7 sm:h-7" />
                        </button>
                    </div>
                </div>
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
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1C1C1E] text-white text-2xl sm:text-3xl flex items-center justify-center active:bg-[#333333] transition-colors disabled:opacity-50 font-medium"
        >
            {children}
        </button>
    );
}