import { useState, useRef, useEffect, useCallback, type RefObject, type ReactNode } from "react";
import "../../layouts/HomeLayout.css";
import "./AiChat.css";

import chatCloseIcon from "../../assets/chat/actions/close.svg";
import jumpaLogoMark from "../../assets/chat/actions/Group 85 (1).svg";
import ellipseDot from "../../assets/chat/actions/Ellipse 29.svg";
import docIcon from "../../assets/chat/actions/doc.svg";
import voiceIcon from "../../assets/chat/actions/voice.svg";
import sendBtnIcon from "../../assets/chat/actions/sendbtn.svg";
import vnIcon from "../../assets/chat/actions/vn.svg";
import deleteIcon from "../../assets/chat/actions/delete.svg";
import sendCheckIcon from "../../assets/chat/actions/send.svg";
import sendingIcon from "../../assets/chat/actions/sending.svg";
import userAvatarImg from "../../assets/images/avatars/prince.svg";
import botAvatarImg from "../../assets/chat/actions/bot.png";

type Screen =
  | "welcome"
  | "home"
  | "chat-empty"
  | "chat-responding"
  | "voice-recording"
  | "voice-processing";

type VoiceFlow = "none" | "recording" | "preview" | "sending";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  time?: string;
  isTransaction?: boolean;
  isVoice?: boolean;
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
  "Show my recent transfers and fees",
  "Buy AMA when price is -10% with 100$",
  "Exchange $30 to USDC Sol",
  "Exchange $30 to USDC ETh",
];

const WELCOME_BUBBLES = [
  { key: "1", cls: "welcome-bubble--1", text: "Send $20 to $Nita" },
  { key: "2", cls: "welcome-bubble--2", text: "Send two thousand naira to 9169495 opay" },
  { key: "3", cls: "welcome-bubble--3", text: "How much have i sent to Ola in two months ?" },
  { key: "4", cls: "welcome-bubble--4", text: "Send $2 to Lukas by 2pm tomorrow sol usdc" },
  { key: "5", cls: "welcome-bubble--5", text: "Send 2 Sol 7EcDhSYGxX" },
  { key: "6", cls: "welcome-bubble--6", text: "Send 2 ETh to 0x456d9347342" },
  { key: "7", cls: "welcome-bubble--7", text: "Send 2 Ama to AMa56d9347342" },
] as const;

function useAutosizeTextArea(textAreaRef: RefObject<HTMLTextAreaElement | null>, value: string) {
  useEffect(() => {
    const el = textAreaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(160, Math.max(40, el.scrollHeight))}px`;
  }, [value, textAreaRef]);
}

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

function WelcomeOverlay({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="chat-welcome-backdrop" aria-hidden />
      <div
        className="chat-welcome-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="chat-welcome-title"
        aria-modal="true"
      >
        <button type="button" className="chat-welcome-close" onClick={onClose} aria-label="Close">
          <img src={chatCloseIcon} alt="" width={12} height={12} />
        </button>
        <img src={jumpaLogoMark} alt="" className="chat-welcome-logo" width={118} height={67} />
        <div className="chat-welcome-headings">
          <h2 id="chat-welcome-title" className="chat-welcome-title">
            Welcome to Jumpa
          </h2>
          <p className="chat-welcome-subtitle">Text our Ai to run all transactions</p>
        </div>
        <div className="chat-welcome-bubbles" aria-hidden>
          {WELCOME_BUBBLES.map((b) => (
            <div key={b.key} className={`welcome-bubble ${b.cls}`}>
              <p className="welcome-bubble-text">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ChatHomePanel({ onPromptClick }: { onPromptClick: (p: string) => void }) {
  return (
    <div className="chat-home-panel-inner">
      <header className="chat-home-header">
        <div className="chat-home-title-block">
          <p className="chat-home-title-line">HI Anita</p>
          <p className="chat-home-title-line">Start your transactions..</p>
        </div>
        <p className="chat-home-subtitle">Prompt our Ai to make any transaction .</p>
      </header>
      <div className="chat-suggestions">
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            type="button"
            className="chat-suggestion-row"
            onClick={() => onPromptClick(s)}
          >
            <img src={ellipseDot} alt="" className="chat-suggestion-dot" width={12} height={12} />
            <div className="chat-suggestion-text-wrap">
              <p className="chat-suggestion-text">{s}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function barsFromRecordingTick(tick: number) {
  return Math.min(14, Math.max(2, 2 + Math.floor(tick / 4)));
}

interface ChatComposerProps {
  value: string;
  onChange: (v: string) => void;
  voiceFlow: VoiceFlow;
  recordingTick: number;
  voicePreviewBars: number;
  textAreaRef: RefObject<HTMLTextAreaElement | null>;
  onMic: () => void;
  onDoc: () => void;
  onTypingSend: () => void;
  onIdleSendClick: () => void;
  onRecordingCancel: () => void;
  onRecordingStopToPreview: () => void;
  onPreviewCancel: () => void;
  onPreviewSend: () => void;
}

function ChatComposer({
  value,
  onChange,
  voiceFlow,
  recordingTick,
  voicePreviewBars,
  textAreaRef,
  onMic,
  onDoc,
  onTypingSend,
  onIdleSendClick,
  onRecordingCancel,
  onRecordingStopToPreview,
  onPreviewCancel,
  onPreviewSend,
}: ChatComposerProps) {
  useAutosizeTextArea(textAreaRef, value);

  const isVoice = voiceFlow !== "none";
  const isTyping = !isVoice && value.trim().length > 0;

  const wrapClass = isTyping ? "chat-input-gradient-wrap chat-input-gradient-wrap--expanded" : "chat-input-gradient-wrap";

  let row: ReactNode;

  if (voiceFlow === "recording") {
    const n = barsFromRecordingTick(recordingTick);
    row = (
      <div className="chat-input-row chat-input-row--voice">
        <div className="chat-vn-strip">
          {Array.from({ length: n }, (_, i) => (
            <img key={`${n}-${i}`} src={vnIcon} alt="" className="chat-vn-icon" />
          ))}
        </div>
        <div className="chat-input-icons" style={{ width: "auto", gap: 8 }}>
          <button type="button" className="chat-composer-voice-btn" onClick={onRecordingCancel} aria-label="Cancel recording">
            <img src={deleteIcon} alt="" />
          </button>
          <button type="button" className="chat-composer-voice-btn" onClick={onRecordingStopToPreview} aria-label="Stop and preview">
            <img src={sendCheckIcon} alt="" />
          </button>
        </div>
      </div>
    );
  } else if (voiceFlow === "preview" || voiceFlow === "sending") {
    const sending = voiceFlow === "sending";
    row = (
      <div className="chat-input-row chat-input-row--voice">
        <div className="chat-vn-strip">
          {Array.from({ length: voicePreviewBars }, (_, i) => (
            <img key={i} src={vnIcon} alt="" className="chat-vn-icon" />
          ))}
        </div>
        <div className="chat-input-icons" style={{ width: "auto", gap: 8 }}>
          <button
            type="button"
            className="chat-composer-voice-btn"
            onClick={onPreviewCancel}
            disabled={sending}
            aria-label="Discard voice note"
          >
            <img src={deleteIcon} alt="" />
          </button>
          <button
            type="button"
            className="chat-composer-voice-btn"
            onClick={onPreviewSend}
            disabled={sending}
            aria-label={sending ? "Sending" : "Send voice note"}
          >
            <img src={sending ? sendingIcon : sendCheckIcon} alt="" />
          </button>
        </div>
      </div>
    );
  } else if (isTyping) {
    row = (
      <div className="chat-input-row chat-input-row--typing">
        <textarea
          ref={textAreaRef}
          className="chat-input-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Send a message..."
          rows={1}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onTypingSend();
            }
          }}
        />
        <button type="button" className="chat-composer-send-large" onClick={onTypingSend} aria-label="Send message">
          <img src={sendBtnIcon} alt="" />
        </button>
      </div>
    );
  } else {
    row = (
      <div className="chat-input-row">
        <textarea
          ref={textAreaRef}
          className="chat-input-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Send a message..."
          rows={1}
          style={{ minHeight: 38, maxHeight: 44 }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && value.trim()) {
              e.preventDefault();
              onTypingSend();
            }
          }}
        />
        <div className="chat-input-icons">
          <button type="button" className="chat-input-icon-btn" onClick={onDoc} aria-label="Attach document">
            <img src={docIcon} alt="" />
          </button>
          <button type="button" className="chat-input-icon-btn" onClick={onMic} aria-label="Voice note">
            <img src={voiceIcon} alt="" />
          </button>
          <button type="button" className="chat-input-icon-btn" onClick={onIdleSendClick} aria-label="Send">
            <img src={sendBtnIcon} alt="" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-composer-section">
      <div className={wrapClass}>
        <div className="chat-input-inner">
          {row}
        </div>
      </div>
    </div>
  );
}

function ChatScreen({
  messages,
  showTyping,
  composer,
}: {
  messages: Message[];
  showTyping: boolean;
  composer: ReactNode;
}) {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showTyping]);

  return (
    <div className="ai-chat-chat-screen">
      <div className="ai-chat-messages">
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: 18 }}>
            {m.role === "user" ? (
              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", gap: 8 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <div
                    style={{
                      background: "#F0EEFA",
                      color: "#6A59CE",
                      padding: "12px 16px",
                      borderRadius: "18px 18px 4px 18px",
                      fontSize: 13,
                      maxWidth: 260,
                      lineHeight: 1.5,
                    }}
                  >
                    {m.isVoice ? "🎤 Voice message" : m.text}
                  </div>
                  {m.time && (
                    <span style={{ color: "#25AD3E", fontSize: 11 }}>
                      Read • {m.time}
                    </span>
                  )}
                </div>
                <img src={userAvatarImg} alt="" className="chat-msg-avatar chat-msg-avatar--user" />
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-end", gap: 8 }}>
                <img src={botAvatarImg} alt="" className="chat-msg-avatar chat-msg-avatar--bot" />
                {m.isTransaction ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div
                      style={{
                        background: "#FF4F9A",
                        color: "#fff",
                        padding: "8px 16px",
                        borderRadius: 20,
                        fontSize: 13,
                        fontWeight: 600,
                        display: "inline-block",
                      }}
                    >
                      {m.transactionDetails?.label}
                    </div>
                    <div
                      style={{
                        background: "#FFD6EC",
                        color: "#8B0043",
                        padding: "12px 16px",
                        borderRadius: "4px 18px 18px 18px",
                        fontSize: 13,
                        maxWidth: 260,
                        lineHeight: 1.7,
                      }}
                    >
                      <div style={{ fontWeight: 700 }}>Withdrawal initiated!</div>
                      <div>{m.transactionDetails?.sent}</div>
                      <div>{m.transactionDetails?.to}</div>
                      <div style={{ color: "#3EC6C6", fontWeight: 600 }}>{m.transactionDetails?.result}</div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      background: "#FFD6EC",
                      color: "#AA0055",
                      padding: "12px 16px",
                      borderRadius: "4px 18px 18px 18px",
                      fontSize: 13,
                      maxWidth: 260,
                      lineHeight: 1.6,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {m.text}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {showTyping && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
            <img src={botAvatarImg} alt="" className="chat-msg-avatar chat-msg-avatar--bot" />
            <div style={{ background: "#FF4F9A22", borderRadius: "4px 18px 18px 18px", padding: "8px 14px" }}>
              <TypingDots />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      {composer}
    </div>
  );
}

function VoiceScreen({ processing }: { processing: boolean }) {
  return (
    <div className="ai-chat-voice-screen">
      <div style={{ flex: 1 }} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 16px 20px",
          borderTop: "1px solid #2A2A3A",
          background: "#0A0A0F",
          flexShrink: 0,
        }}
      >
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
        <button
          type="button"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "none",
            background: "#1A1A24",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8888AA" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <button
          type="button"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "none",
            background: "#7B5CF5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {processing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#fff" }} />
          )}
        </button>
      </div>
    </div>
  );
}

export default function AiChat() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [voiceFlow, setVoiceFlow] = useState<VoiceFlow>("none");
  const [recordingTick, setRecordingTick] = useState(0);
  const [voicePreviewBars, setVoicePreviewBars] = useState(8);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const showWelcomeOverlay = screen === "welcome";

  useEffect(() => {
    if (voiceFlow !== "recording") return;
    const id = window.setInterval(() => setRecordingTick((t) => t + 1), 110);
    return () => window.clearInterval(id);
  }, [voiceFlow]);

  const resetVoice = useCallback(() => {
    setVoiceFlow("none");
    setRecordingTick(0);
  }, []);

  const hideHomeDiscover =
    screen === "chat-empty" ||
    screen === "chat-responding" ||
    (screen === "home" && (inputValue.length > 0 || voiceFlow !== "none"));

  const enterThreadIfNeeded = useCallback(() => {
    if (screen === "home") setScreen("chat-empty");
  }, [screen]);

  const handleSendText = useCallback(() => {
    const t = inputValue.trim();
    if (!t) return;
    enterThreadIfNeeded();
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      text: t,
      time: "2m ago",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    resetVoice();
    setScreen("chat-responding");
    setShowTyping(true);
    window.setTimeout(() => {
      setShowTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "ai",
          text: "Processing... sending $50 to mum confirm this order enter your withdrawal pin.",
        },
      ]);
    }, 1400);
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `a2-${Date.now()}`,
          role: "ai",
          text: "",
          isTransaction: true,
          transactionDetails: {
            label: "Withdrawal",
            sent: "Sent: 20$",
            to: "To: Ndukwe Anita",
            result: "Account credited successfully",
          },
        },
      ]);
    }, 2800);
  }, [inputValue, enterThreadIfNeeded, resetVoice]);

  const handleVoiceSendFinal = useCallback(() => {
    setVoiceFlow("sending");
    window.setTimeout(() => {
      enterThreadIfNeeded();
      setMessages((prev) => [
        ...prev,
        {
          id: `v-${Date.now()}`,
          role: "user",
          text: "",
          isVoice: true,
          time: "2m ago",
        },
      ]);
      resetVoice();
      setScreen("chat-responding");
      setShowTyping(true);
      window.setTimeout(() => {
        setShowTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: "ai",
            text: "Got it — I heard your voice note.",
          },
        ]);
      }, 1200);
    }, 1600);
  }, [enterThreadIfNeeded, resetVoice]);

  const composerEl = (
    <ChatComposer
      value={inputValue}
      onChange={setInputValue}
      voiceFlow={voiceFlow}
      recordingTick={recordingTick}
      voicePreviewBars={voicePreviewBars}
      textAreaRef={textAreaRef}
      onDoc={() => {}}
      onMic={() => {
        if (inputValue.trim()) return;
        enterThreadIfNeeded();
        setRecordingTick(0);
        setVoiceFlow("recording");
      }}
      onTypingSend={handleSendText}
      onIdleSendClick={() => {
        if (inputValue.trim()) handleSendText();
      }}
      onRecordingCancel={resetVoice}
      onRecordingStopToPreview={() => {
        setVoicePreviewBars(barsFromRecordingTick(recordingTick));
        setVoiceFlow("preview");
      }}
      onPreviewCancel={resetVoice}
      onPreviewSend={handleVoiceSendFinal}
    />
  );

  const showHomeShell = screen === "welcome" || screen === "home";
  const showThread = screen === "chat-empty" || screen === "chat-responding";

  const renderMain = () => {
    if (showHomeShell) {
      return (
        <>
          <div className="chat-main-panel">
            {!hideHomeDiscover ? <ChatHomePanel onPromptClick={(p) => {
              setInputValue(p);
              setMessages([]);
              setShowTyping(false);
              setScreen("chat-empty");
              resetVoice();
            }} /> : <div className="chat-blank-main" aria-hidden />}
          </div>
          {composerEl}
        </>
      );
    }
    if (showThread) {
      return (
        <ChatScreen
          messages={messages}
          showTyping={showTyping}
          composer={composerEl}
        />
      );
    }
    if (screen === "voice-recording" || screen === "voice-processing") {
      return <VoiceScreen processing={screen === "voice-processing"} />;
    }
    return null;
  };

  return (
    <>
      <style>{`
        @keyframes jbounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes vwave{from{transform:scaleY(0.3)}to{transform:scaleY(1)}}
        .ai-chat-root *{box-sizing:border-box}
        .ai-chat-messages::-webkit-scrollbar{width:4px}
        .ai-chat-messages::-webkit-scrollbar-thumb{background:#2A2A3A;border-radius:2px}
      `}</style>
      <div className="jumpa-theme-wrapper">
        <div className="phone-frame">
          <div
            className="app-content"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              height: "100%",
              overflow: "hidden",
            }}
          >
            <div className="ai-chat-root">
              {renderMain()}
              {showWelcomeOverlay && <WelcomeOverlay onClose={() => setScreen("home")} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
