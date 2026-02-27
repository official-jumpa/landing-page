import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function SaveRecoveryPhrase() {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 w-full h-dvh bg-black text-white flex flex-col px-6 py-12">
            
            <div className="flex-1 flex flex-col mt-8 w-full max-w-md mx-auto">
                <h1 className="text-3xl font-bold tracking-tight mb-4 leading-snug">
                    Save your Secret<br />Recovery Phrase
                </h1>
                
                <p className="text-[#A1A1AA] text-[15px] leading-relaxed mb-8">
                    This is your <span className="text-[#8B5CF6]">Secret Recovery Phrase</span>. Write 
                    it down in the correct order and keep it safe. If someone has your Secret Recovery 
                    Phrase, they can access your wallet. Don't share it with anyone, ever.
                </p>

                {/* Dark empty box for the phrase */}
                <div className="w-full aspect-4/3 bg-[#18181A] rounded-xl border border-[#262626]">
                    {/* The 12 or 24 phrase words will map here in the future */}
                </div>
            </div>

            {/* Bottom Button */}
            <div className="mt-auto pb-6 w-full max-w-md mx-auto">
                <Button
                    onClick={() => navigate("/notifications")}
                    className="w-full h-14 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-base transition-colors shadow-none"
                >
                    Continue
                </Button>
            </div>
            
        </div>
    );
}