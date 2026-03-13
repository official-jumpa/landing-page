import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft} from "lucide-react";

// Mocking the 12-word phrase
const ACTUAL_WORDS = [
    "purchase", "alert", "foster", "cupboard", 
    "dilemma", "wealth", "frequent", "village", 
    "gospel", "rocket", "margin", "pioneer"
];

// Indices of the words to hide (0-based: 2 = 3rd word, 3 = 4th word, 6 = 7th word)
const MISSING_INDICES = [2, 3, 6];

export default function SaveRecoveryPhrase() {
    const navigate = useNavigate();
    const [step, setStep] = useState<1 | 2>(1);
    const [isRevealed, setIsRevealed] = useState(false);

    // State for Drag and Drop
    const [bankWords, setBankWords] = useState<string[]>(() => {
        // Extract the missing words and shuffle them for the bank
        const words = MISSING_INDICES.map(i => ACTUAL_WORDS[i]);
        return words.sort(() => Math.random() - 0.5);
    });
    
    // State to track which word is in which slot
    const [filledSlots, setFilledSlots] = useState<Record<number, string | null>>({
        2: null, 3: null, 6: null
    });

    // Determine if Step 2 is fully filled out
    const isStep2Complete = MISSING_INDICES.every(index => filledSlots[index] !== null);

    const handleContinue = () => {
        if (step === 1 && isRevealed) {
            setStep(2);
        } else if (step === 2 && isStep2Complete) {
            // Validate the words (optional logic here) then proceed
            navigate("/create-account");
        }
    };

    const handleBack = () => {
        if (step === 2) {
            setStep(1);
        } else {
            navigate(-1);
        }
    };

    // --- Drag and Drop Handlers ---
    const handleDragStart = (e: React.DragEvent, word: string, sourceIndex: number | null = null) => {
        e.dataTransfer.setData("word", word);
        if (sourceIndex !== null) {
            e.dataTransfer.setData("sourceIndex", sourceIndex.toString());
        }
    };

    const handleDrop = (e: React.DragEvent, targetIndex: number) => {
        e.preventDefault();
        const word = e.dataTransfer.getData("word");
        const sourceIndexRaw = e.dataTransfer.getData("sourceIndex");
        const sourceIndex = sourceIndexRaw ? parseInt(sourceIndexRaw) : null;

        if (!word) return;

        setFilledSlots(prev => {
            const newSlots = { ...prev };
            const existingWordInSlot = newSlots[targetIndex];

            // 1. Place the new word in the drop target
            newSlots[targetIndex] = word;

            // 2. Manage the Bank
            setBankWords(prevBank => {
                let newBank = [...prevBank];
                // If it came from the bank, remove it
                if (sourceIndex === null) {
                    newBank = newBank.filter(w => w !== word);
                }
                // If the slot we dropped into already had a word, send that old word back to the bank
                if (existingWordInSlot) {
                    newBank.push(existingWordInSlot);
                }
                return newBank;
            });

            // 3. If dragged from another slot, clear the source slot
            if (sourceIndex !== null && sourceIndex !== targetIndex) {
                newSlots[sourceIndex] = null;
            }

            return newSlots;
        });
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault(); // Required to allow a drop
    };

    // Allows users to tap a filled slot to remove the word back to the bank
    const handleRemoveFromSlot = (index: number, word: string) => {
        setFilledSlots(prev => ({ ...prev, [index]: null }));
        setBankWords(prev => [...prev, word]);
    };

    return (
        <div className="fixed inset-0 w-full h-dvh bg-[#050505] text-white flex flex-col px-6 py-12">
            <div className="flex-1 flex flex-col mt-2 w-full max-w-md mx-auto">
                
                {/* Back Button */}
                <button 
                    onClick={handleBack}
                    className="w-10 h-10 rounded-full bg-[#18181A] flex items-center justify-center mb-6 hover:bg-[#262626] transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-white/70" />
                </button>

                <h1 className="text-3xl font-bold tracking-tight mb-4 leading-snug">
                    {step === 1 ? (
                        <>Save your Secret<br />Recovery Phrase</>
                    ) : (
                        <>Confirm your Secret<br />Recovery Phrase</>
                    )}
                </h1>
                
                <p className="text-[#A1A1AA] text-[15px] leading-relaxed mb-8">
                    {step === 1 ? (
                        <>
                            This is your <span className="text-[#8B5CF6]">Secret Recovery Phrase</span>. Write 
                            it down in the correct order and keep it safe. If someone has your Secret Recovery 
                            Phrase, they can access your wallet. Don't share it with anyone, ever.
                        </>
                    ) : (
                        "Select and drag the missing words in the correct order."
                    )}
                </p>

                {/* Phrase Container */}
                <div className="w-full bg-[#141414] rounded-xl p-4 border border-[#262626] relative overflow-hidden">
                    
                    {/* STEP 1: View Phrase Grid */}
                    {step === 1 && (
                        <>
                            <div className={`grid grid-cols-3 gap-2 transition-all duration-300 ${!isRevealed ? 'blur-md select-none opacity-50' : 'blur-0 opacity-100'}`}>
                                {ACTUAL_WORDS.map((word, index) => (
                                    <div key={index} className="bg-black border border-[#262626] rounded-lg px-2 py-2.5 text-[13px] font-medium flex items-center">
                                        <span className="text-white/50 w-4 mr-1">{index + 1}.</span> {word}
                                    </div>
                                ))}
                            </div>

                            {!isRevealed && (
                                <div 
                                    className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-10 bg-[A7A3A3]/30 backdrop-blur-[1px]"
                                    onClick={() => setIsRevealed(true)}
                                >
                                    <img src="/eye_lid.svg" alt="" />
                                    <span className="font-semibold text-sm mb-1 text-white">Tap to reveal</span>
                                    <span className="text-xs text-white/60">Make sure no one is watching with you</span>
                                </div>
                            )}
                        </>
                    )}

                    {/* STEP 2: Confirm Phrase Grid */}
                    {step === 2 && (
                        <div className="grid grid-cols-3 gap-2">
                            {ACTUAL_WORDS.map((_, index) => {
                                const isMissing = MISSING_INDICES.includes(index);
                                const filledWord = filledSlots[index];

                                // Missing & Fillable Slot
                                if (isMissing) {
                                    return (
                                        <div 
                                            key={index}
                                            onDrop={(e) => handleDrop(e, index)}
                                            onDragOver={handleDragOver}
                                            onClick={() => filledWord && handleRemoveFromSlot(index, filledWord)}
                                            draggable={!!filledWord}
                                            onDragStart={(e) => filledWord && handleDragStart(e, filledWord, index)}
                                            className={`rounded-lg px-2 py-2.5 text-[13px] font-medium flex items-center transition-colors
                                                ${filledWord 
                                                    ? "bg-[#18181A] border border-[#8B5CF6] text-white cursor-grab active:cursor-grabbing" 
                                                    : "bg-transparent border border-dashed border-[#52525B] text-white"
                                                }`}
                                        >
                                            <span className="w-4 mr-1 text-white/50">{index + 1}.</span> 
                                            {filledWord || ""}
                                        </div>
                                    );
                                }

                                // Static Masked Slot
                                return (
                                    <div key={index} className="bg-black border border-[#262626] rounded-lg px-2 py-2.5 text-[13px] font-medium flex items-center text-white/50">
                                        <span className="w-4 mr-1">{index + 1}.</span> ********
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* STEP 2: Word Selection Bank (Draggable Items) */}
                {step === 2 && (
                    <div className="grid grid-cols-3 gap-2 mt-8 min-h-[50px]">
                        {bankWords.map((word, index) => (
                            <div 
                                key={`bank-${index}`}
                                draggable
                                onDragStart={(e) => handleDragStart(e, word)}
                                className="bg-[#18181A] cursor-grab active:cursor-grabbing hover:bg-[#262626] border border-[#262626] rounded-lg px-3 py-2.5 text-[13px] font-medium flex justify-center items-center transition-colors shadow-sm"
                            >
                                {word}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-auto pb-6 w-full max-w-md mx-auto flex flex-col gap-4">
                <Button
                    onClick={handleContinue}
                    disabled={(step === 1 && !isRevealed) || (step === 2 && !isStep2Complete)}
                    className={`w-full h-14 rounded-xl font-semibold text-base transition-colors shadow-none 
                        ${(step === 1 && !isRevealed) || (step === 2 && !isStep2Complete)
                            ? "bg-[#C4B5FD] text-black hover:bg-[#C4B5FD] opacity-70" 
                            : "bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
                        }`}
                >
                    Continue
                </Button>
                
                <button className="text-[#6366F1] font-medium text-sm hover:text-[#4F46E5] transition-colors">
                    Remind me later
                </button>
            </div>
            
        </div>
    );
}