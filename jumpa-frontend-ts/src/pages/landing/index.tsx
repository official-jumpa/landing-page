import jumpaTypoLogo from "@/assets/logos/brand/Jumpa Typo I@4x.png";
import JumpaPhoneDemo from "./JumpaPhoneDemo";
import "./landing.css";

const CAPABILITIES = [
  { emoji: "💳", label: "Pay Bills", bg: "#22D9504d", color: "#22D950" },
  { emoji: "♾️", label: "Withdraw", bg: "#1D00FB4d", color: "#1D00FB" },
  { emoji: "🔄", label: "Swap", bg: "#DE00FB4d", color: "#DE00FB" },
  { emoji: "↑", label: "Send", bg: "#00BCFB4d", color: "#00BCFB" },
  { emoji: "🎯", label: "Save", bg: "#FB64004d", color: "#FB6400" },
  { emoji: "📈", label: "Invest", bg: "#FF19044d", color: "#FF1904" },
  { emoji: "📊", label: "Track", bg: "#22D9504d", color: "#22D950" },
  { emoji: "💰", label: "Budget", bg: "#FFC3004d", color: "#FFC300" },
] as const;

const MARQUEE_ITEMS = [...CAPABILITIES, ...CAPABILITIES, ...CAPABILITIES];

export default function Landing() {
  return (
    <main className="jumpa-landing flex h-dvh max-h-dvh flex-col overflow-hidden text-zinc-900 antialiased selection:bg-violet-200/60 selection:text-violet-950">
      {/*
        Pocket-style top: from sm, logo | phone | Coming Soon share one grid row (items-start).
        No tall header strip; phone wrapper margin tunes vertical position.
      */}
      <div className="jumpa-landing-reveal jumpa-landing-reveal--2 shrink-0 bg-white">
        <div className="mx-auto grid w-full max-w-[375px] grid-cols-2 grid-rows-[minmax(2.25rem,auto)_auto] items-center gap-x-3 gap-y-0 px-4 pt-4 pb-2 sm:max-w-[768px] sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:grid-rows-1 sm:items-start sm:gap-x-3 sm:px-10 sm:pt-5 sm:pb-0 lg:max-w-[1280px] lg:px-20 xl:max-w-[1440px] xl:px-[120px]">
          <img
            src={jumpaTypoLogo}
            alt="Jumpa"
            width={139}
            height={36}
            decoding="async"
            className="relative z-20 col-start-1 row-start-1 h-10 w-auto min-h-0 origin-left scale-[3] object-contain object-left justify-self-start self-center sm:col-start-1 sm:row-start-1 sm:h-11 sm:scale-[3.075] sm:self-start md:scale-[3.225] lg:scale-[3.3]"
          />
          <div className="col-span-2 row-start-2 mt-20 flex min-w-0 justify-center sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:mt-5 sm:justify-self-center">
            <JumpaPhoneDemo />
          </div>
          <span className="col-start-2 row-start-1 justify-self-end self-center text-right text-sm font-bold text-foreground whitespace-nowrap md:text-base lg:text-lg sm:col-start-3 sm:row-start-1 sm:justify-self-end sm:self-start sm:pt-1">
            Coming Soon
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <section className="jumpa-landing-reveal jumpa-landing-reveal--3 flex min-h-0 flex-1 flex-col items-stretch justify-start gap-4 overflow-hidden bg-white px-3 pt-14 pb-4 sm:gap-5 sm:px-6 sm:pt-6 sm:pb-6 md:gap-6 md:px-8 md:pb-8 lg:gap-3 lg:pt-6 lg:pb-6">
          <h1 className="shrink-0 text-center text-3xl font-bold leading-snug tracking-tight text-gray-900 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            An AI wallet that can
          </h1>

          <div className="jumpa-landing-marquee__viewport relative flex w-full min-w-0 flex-none items-center sm:min-h-[3rem] sm:flex-1 md:min-h-[3.25rem] lg:min-h-[3.25rem] lg:flex-none">
            <div
              className="jumpa-landing-marquee__fade jumpa-landing-marquee__fade--left"
              aria-hidden
            />
            <div
              className="jumpa-landing-marquee__fade jumpa-landing-marquee__fade--right"
              aria-hidden
            />
            <div className="jumpa-landing-marquee__track items-center">
              {MARQUEE_ITEMS.map((item, i) => (
                <span
                  key={`${item.label}-${i}`}
                  className="jumpa-landing-marquee__pill inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-black/[0.07] px-4 py-2 text-[15px] font-semibold leading-tight whitespace-nowrap shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:h-auto sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs sm:font-medium md:gap-2 md:px-3.5 md:py-2 md:text-sm lg:min-h-11 lg:gap-2 lg:px-4 lg:py-2.5 lg:text-base lg:font-semibold"
                  style={{
                    backgroundColor: item.bg,
                    color: item.color,
                  }}
                >
                  <span
                    className="inline-flex size-7 shrink-0 items-center justify-center text-[1.35rem] leading-none sm:h-auto sm:w-auto sm:min-w-0 sm:text-sm md:text-base lg:size-8 lg:text-xl"
                    aria-hidden
                  >
                    {item.emoji}
                  </span>
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          <p className="shrink-0 text-center text-3xl font-bold leading-snug tracking-tight text-gray-900 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            for you
          </p>
        </section>
      </div>
    </main>
  );
}
