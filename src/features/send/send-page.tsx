import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronLeft,
  PencilLine,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  defaultRecipient,
  defaultToken,
  mockRecipients,
  mockTokens,
} from "./mock-data";
import ConfirmTransactionSheet from "./components/confirm-transaction-sheet";
import PinSheet from "./components/pin-sheet";
import RecipientSelectSheet from "./components/recipient-select-sheet";
import SendMethodSheet from "./components/send-method-sheet";
import SuccessSheet from "./components/success-sheet";
import TokenSearchSheet from "./components/token-search-sheet";
import type { Recipient, Token } from "./types";

const quickAmounts = ["50", "200", "100"];
const expectedPin = "1234";

function appendToAmount(current: string, key: string) {
  if (key === ".") {
    return current.includes(".") ? current : `${current}.`;
  }
  if (current === "0") {
    return key;
  }
  return `${current}${key}`;
}

export default function SendPage() {
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState<Recipient>(defaultRecipient);
  const [token, setToken] = useState<Token>(defaultToken);
  const [amount, setAmount] = useState("0");
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");

  const [sendMethodOpen, setSendMethodOpen] = useState(true);
  const [tokenSearchOpen, setTokenSearchOpen] = useState(false);
  const [recipientSheetOpen, setRecipientSheetOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  const timerRef = useRef<number | null>(null);
  const amountValue = Number(amount) || 0;
  const composeAmount = amount === "" ? "0" : amount;
  const confirmAmount = amountValue.toFixed(2);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const verifyPin = (inputPin: string) => {
    if (inputPin.length !== 4) {
      setPinError("PIN must be 4 digits.");
      return;
    }
    if (inputPin !== expectedPin) {
      setPinError("Incorrect PIN.");
      return;
    }
    setPinError("");
    setPin("");
    setPinOpen(false);
    setSuccessOpen(true);
  };

  const handleConfirmPayment = () => {
    if (processing) return;
    setProcessing(true);
    timerRef.current = window.setTimeout(() => {
      setProcessing(false);
      setConfirmOpen(false);
      setPinOpen(true);
    }, 1300);
  };

  const handleNumberPress = (key: string) => {
    setAmount((prev) => appendToAmount(prev, key));
  };

  const handleBackspaceAmount = () => {
    setAmount((prev) => {
      if (prev.length <= 1) return "0";
      const updated = prev.slice(0, -1);
      return updated === "" ? "0" : updated;
    });
  };

  const handlePinDigit = (digit: string) => {
    setPinError("");
    setPin((prev) => {
      if (prev.length >= 4) return prev;
      const updated = `${prev}${digit}`;
      if (updated.length === 4) {
        verifyPin(updated);
      }
      return updated;
    });
  };

  const handleDoneFlow = () => {
    setSuccessOpen(false);
    setPin("");
    setAmount("0");
  };

  return (
    <div className="min-h-screen bg-[#16171d] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-32 pt-5">
        <header className="relative flex items-center justify-between pb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-zinc-300 transition hover:bg-white/20"
            aria-label="Go back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold">
            Send Money
          </h1>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-base"
          >
            Naira
            <ChevronDown className="h-4 w-4 text-zinc-500" />
          </button>
        </header>

        <section className="rounded-3xl bg-white/10 p-4">
          <p className="text-sm text-zinc-200">To:</p>
          <div className="mt-2 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-zinc-100" />
              <div>
                <p className="text-md font-medium text-white">{recipient.name}</p>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <span>{recipient.id}</span>
                  <PencilLine className="h-4 w-4 text-violet-500" />
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setRecipientSheetOpen(true)}
              className="rounded-full bg-white/10 px-3 py-2 text-sm text-zinc-200 transition hover:bg-white/20"
            >
              Change
            </button>
          </div>
        </section>

        <section className="mt-4 rounded-3xl bg-white/10 p-5">
          <button
            type="button"
            onClick={() => setSendMethodOpen(true)}
            className="mx-auto inline-flex items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-sm"
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-[10px] font-bold">
              N
            </span>
            {token.id === "naira" ? recipient.address : token.symbol}
            <ChevronDown className="h-4 w-4 text-zinc-500" />
          </button>

          <div className="mt-5 text-center">
            <div className="inline-flex items-center text-4xl font-semibold leading-none">
              <span className="mr-2 text-zinc-300">{"\u20A6"}</span>
              {composeAmount}
            </div>
            <p className="mt-2 text-md text-zinc-300">81.07</p>
            {amountValue > 0 ? (
              <p className="mt-2 text-md text-green-500">Available</p>
            ) : null}
            <div className="mt-2 flex justify-end">
              <PencilLine className="h-4 w-4 text-violet-500" />
            </div>
          </div>
        </section>

        <section className="mt-4 flex gap-3">
          {quickAmounts.map((quickAmount) => (
            <button
              key={quickAmount}
              type="button"
              onClick={() => setAmount(quickAmount)}
              className="inline-flex h-7 items-center rounded-full border border-zinc-400 px-4 text-xs text-zinc-100"
            >
              {"\u20A6"}
              {quickAmount}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setAmount("1")}
            className="inline-flex h-7 items-center rounded-full border border-zinc-400 px-4 text-xs text-zinc-100"
          >
            Max
          </button>
        </section>

        <section className="mt-6 grid grid-cols-3 gap-4 rounded-t-3xl bg-white/10 p-6 pb-10">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => handleNumberPress(key)}
              className="h-12 text-xl text-zinc-100"
            >
              {key}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleNumberPress(".")}
            className="h-12 text-xl text-zinc-100"
            aria-label="Decimal point"
          >
            .
          </button>
          <button
            type="button"
            onClick={() => handleNumberPress("0")}
            className="h-12 text-xl text-zinc-100"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleBackspaceAmount}
            className="h-12 text-lg text-zinc-100"
            aria-label="Delete amount digit"
          >
            Back
          </button>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-md bg-[#16171d] px-5 pb-6 pt-3">
        <Button
          type="button"
          onClick={() => setConfirmOpen(true)}
          disabled={amountValue <= 0}
          className="h-14 w-full rounded-xl bg-violet-500 text-lg text-white hover:bg-violet-400"
        >
          Send
        </Button>
      </div>

      <SendMethodSheet
        open={sendMethodOpen}
        onOpenChange={setSendMethodOpen}
        onSelectMethod={(method) => {
          if (method === "crypto") {
            setSendMethodOpen(false);
            setTokenSearchOpen(true);
          } else {
            setSendMethodOpen(false);
            setConfirmOpen(true);
          }
        }}
      />

      <TokenSearchSheet
        open={tokenSearchOpen}
        onOpenChange={setTokenSearchOpen}
        tokens={mockTokens}
        onSelectToken={(selectedToken) => {
          setToken(selectedToken);
          setTokenSearchOpen(false);
          setConfirmOpen(false);
        }}
      />

      <RecipientSelectSheet
        open={recipientSheetOpen}
        onOpenChange={setRecipientSheetOpen}
        recipients={mockRecipients}
        selectedRecipientId={recipient.id}
        onSelectRecipient={(selectedRecipient) => {
          setRecipient(selectedRecipient);
          setRecipientSheetOpen(false);
        }}
      />

      <ConfirmTransactionSheet
        open={confirmOpen}
        onOpenChange={(open) => {
          if (processing) return;
          setConfirmOpen(open);
        }}
        recipient={recipient}
        amountDisplay={confirmAmount}
        processing={processing}
        onMakePayment={handleConfirmPayment}
      />

      <PinSheet
        open={pinOpen}
        onOpenChange={setPinOpen}
        pin={pin}
        error={pinError}
        onDigitPress={handlePinDigit}
        onBackspace={() => setPin((prev) => prev.slice(0, -1))}
        onDone={() => verifyPin(pin)}
      />

      <SuccessSheet open={successOpen} onOpenChange={setSuccessOpen} onDone={handleDoneFlow} />
    </div>
  );
}
