import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import type { Recipient } from "../types";
import SheetShell from "./sheet-shell";

type ConfirmTransactionSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipient: Recipient;
  amountDisplay: string;
  processing: boolean;
  onMakePayment: () => void;
};

export default function ConfirmTransactionSheet({
  open,
  onOpenChange,
  recipient,
  amountDisplay,
  processing,
  onMakePayment,
}: ConfirmTransactionSheetProps) {
  return (
    <SheetShell open={open} onOpenChange={onOpenChange} title="Confirm transaction">
      <div className="space-y-4">
        <div className="rounded-3xl bg-zinc-800 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-base text-zinc-400">You Pay</p>
              <p className="mt-1 text-lg font-semibold leading-none text-white">{amountDisplay}</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-zinc-700 px-3 py-2 text-sm text-zinc-200">
              Naira
            </span>
          </div>
          <p className="mt-2 text-right text-sm text-zinc-500">20000.00 Naira</p>
        </div>

        <div className="rounded-3xl bg-zinc-800 p-5">
          <p className="text-base text-zinc-400">To:</p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-zinc-100" />
              <div>
                <p className="text-md text-white">{recipient.name}</p>
                <p className="text-sm text-zinc-500">{recipient.id}</p>
              </div>
            </div>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Check className="h-5 w-5" />
            </span>
          </div>
        </div>

        <div className="space-y-4 px-1 pt-2">
          <div className="flex items-center justify-between border-b border-dotted border-zinc-600 pb-3">
            <span className="text-md text-zinc-200">Amount</span>
            <span className="text-lg text-zinc-100">N{amountDisplay}</span>
          </div>
          <div className="flex items-center justify-between border-b border-dotted border-zinc-600 pb-3">
            <span className="text-md text-zinc-200">Bank</span>
            <span className="text-lg text-zinc-100">{recipient.bank}</span>
          </div>
          <div className="flex items-center justify-between border-b border-dotted border-zinc-600 pb-3">
            <span className="text-md text-zinc-200">Fee</span>
            <span className="text-lg text-zinc-100">0.1 USDC</span>
          </div>
        </div>

        <Button
          type="button"
          onClick={onMakePayment}
          disabled={processing}
          className={`mt-4 h-14 w-full rounded-xl text-lg font-medium ${
            processing
              ? "bg-violet-300 text-zinc-100 hover:bg-violet-300"
              : "bg-violet-500 text-white hover:bg-violet-400"
          }`}
        >
          {processing ? "Processing..." : "Make payment"}
        </Button>
      </div>
    </SheetShell>
  );
}
