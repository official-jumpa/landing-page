import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerClose,
} from "@/components/ui/drawer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// --- ZOD SCHEMA ---
const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
});

export default function LoginDrawer() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "" },
        mode: "onChange",
    });

    const currentEmail = form.watch("email");
    const isEmailValid = z.string().email().safeParse(currentEmail).success;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setLoading(true);
        console.log("Submitting Email:", data.email);

        // Dummy API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
        setIsOpen(false);

        // Navigate to the Success Screen
        navigate("/login-success");
    };

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <Button className="w-full h-14 rounded-xl bg-[#3F443F] hover:bg-[#323632] text-white font-medium text-base shadow-none">
                    I have an existing wallet
                </Button>
            </DrawerTrigger>

            {/* ---> APPLIED THE FONT DIRECTLY HERE <--- */}
            <DrawerContent 
                style={{ fontFamily: "Geist" }} 
                className="bg-[#121212] border-t border-[#262626] text-white px-6 pb-8 pt-4 rounded-t-3xl"
            >
                <div className="mx-auto w-full max-w-md">

                    {/* Close Button */}
                    <div className="flex justify-end mb-6">
                        <DrawerClose asChild>
                            <button className="w-8 h-8 rounded-full bg-[#262626] flex items-center justify-center hover:bg-[#333333] transition-colors">
                                <X className="w-4 h-4 text-gray-400" />
                            </button>
                        </DrawerClose>
                    </div>

                    {/* Email Form */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Email address"
                                                className="h-14 bg-transparent border-[#333333] rounded-xl focus-visible:ring-1 focus-visible:ring-[#8B5CF6] focus-visible:border-[#8B5CF6] text-white placeholder:text-[#52525B]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                disabled={!isEmailValid || loading}
                                className={`w-full h-14 rounded-xl text-white font-semibold text-base transition-colors ${isEmailValid
                                        ? "bg-[#8B5CF6] hover:bg-[#7C3AED]"
                                        : "bg-[#A78BFA]/60 cursor-not-allowed"
                                    }`}
                            >
                                {loading ? "Please wait..." : "Continue"}
                            </Button>
                        </form>
                    </Form>

                    {/* Divider */}
                    <hr className="border-[#262626] my-6" />

                    {/* Secondary Login Options */}
                    <div className="space-y-3">
                        <Button
                            type="button"
                            className="w-full h-14 rounded-xl bg-white hover:bg-gray-200 text-black font-semibold text-base flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Sign in with Google
                        </Button>

                        <Button
                            type="button"
                            className="w-full h-14 rounded-xl bg-[#262626] hover:bg-[#333333] text-white font-semibold text-base"
                        >
                            Import using Secret Recovery Phrase
                        </Button>
                    </div>

                    {/* Footer Links */}
                    <div className="mt-8 text-center text-xs text-[#A1A1AA]">
                        <p>By continuing you agree to Jumpa's{" "}
                            <a href="#" className="text-[#8B5CF6] hover:underline">Terms of use</a>
                            {" "}and{" "}
                            <a href="#" className="text-[#8B5CF6] hover:underline">Privacy notice</a>
                        </p>
                    </div>

                </div>
            </DrawerContent>
        </Drawer>
    );
}