import SheetShell from "./sheet-shell";

type PinSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pin: string;
  error: string;
  onDigitPress: (digit: string) => void;
  onBackspace: () => void;
  onDone: () => void;
};

export default function PinSheet({
  open,
  onOpenChange,
  pin,
  error,
  onDigitPress,
  onBackspace,
  onDone,
}: PinSheetProps) {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <SheetShell open={open} onOpenChange={onOpenChange} title="Enter your pin" showHandle>
      <div className="space-y-5 pb-3">
        <div className="flex justify-center gap-3">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-500"
            >
              {pin.length > index ? <span className="h-4 w-4 rounded-full bg-black" /> : null}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>Jumpa Secure Numeric Keypad</span>
          <button
            type="button"
            onClick={onDone}
            className="text-violet-500 transition hover:text-violet-400"
          >
            Done
          </button>
        </div>
        {error ? <p className="text-center text-sm text-red-400">{error}</p> : null}
        <div className="grid grid-cols-3 gap-2">
          {numbers.map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => onDigitPress(number)}
              className="h-14 rounded-lg bg-zinc-700 text-lg text-white transition hover:bg-zinc-600"
            >
              {number}
            </button>
          ))}
          <button
            type="button"
            onClick={() => onDigitPress("0")}
            className="col-start-2 h-14 rounded-lg bg-zinc-700 text-lg text-white transition hover:bg-zinc-600"
          >
            0
          </button>
          <button
            type="button"
            onClick={onBackspace}
            className="h-14 rounded-lg bg-zinc-700 text-lg text-white transition hover:bg-zinc-600"
            aria-label="Delete last digit"
          >
            Back
          </button>
        </div>
      </div>
    </SheetShell>
  );
}
