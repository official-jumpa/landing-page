import { useState, useRef, useEffect } from "react";

type Screen =
  | "welcome"
  | "home"
  | "chat-empty"
  | "chat-responding"
  | "chat-transaction"
  | "voice-recording"
  | "voice-processing";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  time?: string;
  isTransaction?: boolean;
  transactionDetails?: {
    label: string;
    sent: string;
    to: string;
    result: string;
  };
}

const SUGGESTIONS = [
  "How do i invest $100 ?",
  "Analyze my portfolio and suggest investment",
  "Analyze my portfolio and suggest investment",
  "Buy AMA when price is -10% with 100$",
  "Exchange $30 to USDC Sol",
  "Exchange $30 to USDC ETh",
];

const DEMO_MESSAGES: Message[] = [
  {
    id: "1",
    role: "user",
    text: "Send $30 to my mum also schedule to send $20 to her today by 12pm",
    time: "2m ago",
  },
  {
    id: "2",
    role: "ai",
    text: "Processing...\nsending $50 to mum confirm this order enter your withdrawal pin.",
  },
  {
    id: "3",
    role: "user",
    text: "1111",
    time: "2m ago",
  },
  {
    id: "4",
    role: "ai",
    text: "",
    isTransaction: true,
    transactionDetails: {
      label: "Processing Withdrawal",
      sent: "Sent: 20$",
      to: "To: Ndukwe Anita",
      result: "Account credited successfully",
    },
  },
];

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 5, alignItems: "center", padding: "4px 2px" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 11,
            height: 11,
            borderRadius: "50%",
            background: "#FF4F9A",
            display: "inline-block",
            animation: `jbounce 1.2s ${i * 0.2}s infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}

function WelcomeScreen({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#DDDDF0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 20px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#E8E8F8",
          borderRadius: 28,
          padding: "28px 24px 32px",
          width: "100%",
          maxWidth: 380,
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "2px solid #7777AA",
            background: "transparent",
            cursor: "pointer",
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#7777AA",
          }}
        >
          ×
        </button>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
          <div style={{ display: "flex" }}>
            {[{ dot: "#EE3333" }, { dot: "#22BB66" }].map((c, i) => (
              <div key={i} style={{
                width: 80, height: 80, borderRadius: "50%",
                background: "#BBBBD8",
                marginLeft: i === 1 ? -24 : 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{
                  width: 58, height: 58, borderRadius: "50%",
                  background: "#E8E8F8",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: c.dot }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ textAlign: "center", color: "#1A1A2E", fontSize: 20, margin: "0 0 6px", fontWeight: 700 }}>
          Welcome to Jumpa
        </h2>
        <p style={{ textAlign: "center", color: "#6666AA", fontSize: 13, margin: "0 0 20px" }}>
          Text our AI to run all transactions
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { text: "Send $20 to $Nita", dir: "left" },
            { text: "Send two thousand naira to 9169495 opay", dir: "right" },
            { text: "How much have i sent to Ola in two months ?", dir: "left" },
            { text: "Send $2 to Lukas by 2pm tomorrow sol usdc", dir: "right" },
            { text: "Send 2 Sol 7EcDhSYGxX", dir: "left" },
            { text: "Send 2 ETh to 0x456d9347342", dir: "right" },
            { text: "Send 2 Ama to AMa56d9347342", dir: "left" },
          ].map((p, i) => (
            <div key={i} style={{ display: "flex", justifyContent: p.dir === "right" ? "flex-end" : "flex-start" }}>
              <div style={{
                background: "#D8D8F0",
                color: "#7777BB",
                padding: "10px 16px",
                borderRadius: 20,
                fontSize: 13,
                maxWidth: "75%",
                lineHeight: 1.4,
              }}>
                {p.text}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: i === 0 ? 20 : 8,
                height: 8,
                borderRadius: 4,
                background: i === 0 ? "#7B5CF5" : "#CCCCDD",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function HomeScreen({ onPromptClick }: { onPromptClick: (p: string) => void }) {
  const [input, setInput] = useState("");
  return (
    <div style={{ width: "100%", height: "100%", background: "#0A0A0F", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "32px 24px 0" }}>
        <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
          HI Anita<br />Start your transactions..
        </h1>
        <p style={{ color: "#8888AA", fontSize: 13, marginTop: 6 }}>Prompt our AI to make any transaction.</p>
      </div>
      <div style={{ flex: 1, padding: "28px 24px 0", overflowY: "auto" }}>
        {SUGGESTIONS.map((s, i) => (
          <div
            key={i}
            onClick={() => onPromptClick(s)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "15px 0",
              borderBottom: "1px dashed #2A2A3A",
              cursor: "pointer",
            }}
          >
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#7B5CF5", flexShrink: 0 }} />
            <span style={{ color: "#CCCCDD", fontSize: 14 }}>{s}</span>
          </div>
        ))}
      </div>
      <BottomBar value={input} onChange={setInput} />
    </div>
  );
}

function ChatScreen({
  messages,
  showTyping,
  inputValue,
  onInputChange,
}: {
  messages: Message[];
  showTyping: boolean;
  inputValue: string;
  onInputChange: (v: string) => void;
}) {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, showTyping]);

  return (
    <div style={{ width: "100%", height: "100%", background: "#0A0A0F", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 8px" }}>
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: 18 }}>
            {m.role === "user" ? (
              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", gap: 8 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <div
                    style={{
                      background: "#CCCCEE",
                      color: "#1A1A2E",
                      padding: "12px 16px",
                      borderRadius: "18px 18px 4px 18px",
                      fontSize: 13,
                      maxWidth: 240,
                      lineHeight: 1.5,
                    }}
                  >
                    {m.text}
                  </div>
                  {m.time && <span style={{ color: "#8888AA", fontSize: 11 }}>Read • {m.time}</span>}
                </div>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#9999CC", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
                  👤
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-end", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#3EC6C6", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
                  🤖
                </div>
                {m.isTransaction ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ background: "#FF4F9A", color: "#fff", padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, display: "inline-block" }}>
                      {m.transactionDetails?.label}
                    </div>
                    <div style={{ background: "#FFD6EC", color: "#8B0043", padding: "12px 16px", borderRadius: "4px 18px 18px 18px", fontSize: 13, maxWidth: 220, lineHeight: 1.7 }}>
                      <div style={{ fontWeight: 700 }}>Withdrawal initiated!</div>
                      <div>{m.transactionDetails?.sent}</div>
                      <div>{m.transactionDetails?.to}</div>
                      <div style={{ color: "#3EC6C6", fontWeight: 600 }}>{m.transactionDetails?.result}</div>
                    </div>
                  </div>
                ) : (
                  <div style={{ background: "#FFD6EC", color: "#AA0055", padding: "12px 16px", borderRadius: "4px 18px 18px 18px", fontSize: 13, maxWidth: 240, lineHeight: 1.6, whiteSpace: "pre-line" }}>
                    {m.text}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {showTyping && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#3EC6C6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
              🤖
            </div>
            <div style={{ background: "#FF4F9A22", borderRadius: "4px 18px 18px 18px", padding: "8px 14px" }}>
              <TypingDots />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <BottomBar value={inputValue} onChange={onInputChange} placeholder="1255" />
    </div>
  );
}

function VoiceScreen({ processing }: { processing: boolean }) {
  return (
    <div style={{ width: "100%", height: "100%", background: "#0A0A0F", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1 }} />
      <VoiceBar processing={processing} />
    </div>
  );
}

function BottomBar({ value, onChange, placeholder = "Send a message..." }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px 20px", borderTop: "1px solid #2A2A3A", background: "#0A0A0F", flexShrink: 0 }}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#CCCCDD", fontSize: 14, fontFamily: "inherit" }}
      />
      {[
        { bg: "#1A1A24", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8888AA" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg> },
        { bg: "#7B5CF5", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" /></svg> },
        { bg: "#7B5CF5", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg> },
      ].map((b, i) => (
        <button key={i} style={{ width: 38, height: 38, borderRadius: "50%", border: "none", background: b.bg, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
          {b.icon}
        </button>
      ))}
    </div>
  );
}

function VoiceBar({ processing }: { processing: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px 20px", borderTop: "1px solid #2A2A3A", background: "#0A0A0F", flexShrink: 0 }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 2, height: 36 }}>
        {Array.from({ length: 45 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 3,
              borderRadius: 2,
              background: processing ? "#7B5CF5" : "#8888AA",
              height: `${16 + Math.abs(Math.sin(i * 0.7)) * 20}px`,
              opacity: 0.6 + Math.abs(Math.sin(i * 0.5)) * 0.4,
              animation: processing ? `vwave 1s ${i * 0.02}s infinite alternate ease-in-out` : "none",
            }}
          />
        ))}
      </div>
      <button style={{ width: 40, height: 40, borderRadius: "50%", border: "none", background: "#1A1A24", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8888AA" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </button>
      <button style={{ width: 40, height: 40, borderRadius: "50%", border: "none", background: "#7B5CF5", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        {processing
          ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
          : <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#fff" }} />
        }
      </button>
    </div>
  );
}

export default function AiChat() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const goTo = (s: Screen) => {
    setScreen(s);
    if (s === "chat-empty") { setMessages([]); setShowTyping(false); setInputValue(""); }
    if (s === "chat-responding") {
      setMessages([{ id: "u1", role: "user", text: "Send $30 to my mum also schedule to send $20 to her today by 12pm", time: "2m ago" }]);
      setShowTyping(true);
      setInputValue("");
    }
    if (s === "chat-transaction") { setMessages(DEMO_MESSAGES); setShowTyping(false); }
  };

  const renderScreen = () => {
    switch (screen) {
      case "welcome": return <WelcomeScreen onClose={() => setScreen("home")} />;
      case "home": return <HomeScreen onPromptClick={(p) => { setInputValue(p); setMessages([]); setShowTyping(false); setScreen("chat-empty"); }} />;
      case "chat-empty":
      case "chat-responding":
      case "chat-transaction":
        return <ChatScreen messages={messages} showTyping={showTyping} inputValue={inputValue} onInputChange={setInputValue} />;
      case "voice-recording": return <VoiceScreen processing={false} />;
      case "voice-processing": return <VoiceScreen processing={true} />;
    }
  };

  return (
    <>
      <style>{`
        @keyframes jbounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes vwave{from{transform:scaleY(0.3)}to{transform:scaleY(1)}}
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#2A2A3A;border-radius:2px}
      `}</style>
      <div style={{ width: "100vw", height: "100vh", background: "#0A0A0F", display: "flex", flexDirection: "column", fontFamily: "'DM Sans','Segoe UI',sans-serif", overflow: "hidden" }}>
        {/* Top nav — hidden on welcome */}
        {screen !== "welcome" && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderBottom: "1px solid #2A2A3A", flexShrink: 0, flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex" }}>
              {[{ dot: "#FF4F4F" }, { dot: "#3EC6C6" }].map((c, i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: "#9999CC", border: `2px solid ${c.dot}`, marginLeft: i === 1 ? -8 : 0 }} />
              ))}
            </div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Jumpa AI</span>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {([["welcome","1. Welcome"],["home","2. Home"],["chat-empty","3. Chat"],["chat-responding","4. Responding"],["chat-transaction","5. Transaction"],["voice-recording","6. Voice"],["voice-processing","7. Processing"]] as [Screen,string][]).map(([s, label]) => (
              <button key={s} onClick={() => goTo(s)} style={{ padding: "6px 12px", borderRadius: 20, border: "none", background: screen === s ? "#7B5CF5" : "#1A1A24", color: screen === s ? "#fff" : "#8888AA", fontSize: 12, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
                {label}
              </button>
            ))}
          </div>
        </div>
        )}

        {/* Content */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {renderScreen()}
        </div>
      </div>
    </>
  );
}
