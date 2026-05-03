"use client";

import { useState, useEffect, useRef } from "react";
import {
  Baby,
  Activity,
  Moon,
  Heart,
} from "lucide-react";

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  type BabyProfile = {
    age: string;
  };

  const [babyProfile, setBabyProfile] = useState<BabyProfile>({
    age: "",
  });


  const sendMessage = async () => {
    if (!input.trim()) return;


    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({
          message: input,
          history: updatedMessages.map((m) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.content,
          })),
        }),
      });
      const data = await res.json();

      // 🔥 update profile dari AI
      if (data.babyProfile) {
        setBabyProfile(data.babyProfile);
      }

      const aiMessage: Message = {
        id: Date.now().toString() + "-ai",
        role: "ai",
        content: "",
      };

      setMessages((prev) => [...prev, aiMessage]);

      await typeText(data.result, (val) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiMessage.id ? { ...m, content: val } : m
          )
        );
      });

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const typeText = async (text: string, callback: (val: string) => void) => {
    let current = "";

    for (let i = 0; i < text.length; i++) {
      current += text[i];
      callback(current);

      await new Promise((res) => setTimeout(res, 15)); // speed
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        background: "linear-gradient(135deg, #f8e0e1, #F9A8A8)",
      }}
    >
      <div
        style={{
          flex: "1 1 400px",
          padding: 20,
          position: "relative",
          minHeight: 300,
        }}
      >
        {/* BACKGROUND IMAGE */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundImage: `
      linear-gradient(to left, rgba(221, 192, 185, 0.9), rgba(255,247,245,0)),
      url('/images/nayanika-bg.jpeg')
    `,
            backgroundSize: "cover",
            backgroundPosition: "left center",
            backgroundRepeat: "no-repeat",
            opacity: 0.4,
          }}
        />

        {/* CONTENT */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: 56, lineHeight: 1.1, fontWeight: 700 }}>
            <span style={{ color: "#1F2937" }}>Gentle</span> <br />
            <span
              style={{
                background: "linear-gradient(90deg, #f39e9e, #FB7185)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              AI Care
            </span>{" "}
            <br />
            <span style={{ color: "#F87171" }}>for Moms</span>
          </h1>

          <div
            style={{
              borderLeft: "4px solid #F9A8A8",
              paddingLeft: 12,
              marginTop: 20,
            }}
          >
            <p style={{ color: "#555", lineHeight: 1.6 }}>
              Nayana AI helps you understand your baby with calm,
              clarity, and confidence—anytime you need it.
            </p>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            zIndex: 2, // 🔥 penting

          }}
        >
          <img
            src="/images/logo-nayana.png"
            style={{ width: 120 }}
          />
        </div>
      </div>

      {/* APP CARD */}
      <div
        style={{
          flex: "1 1 380px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <div
          style={{
            width: 380,
            height: 650,
            background: "#FFF7F5",
            borderRadius: 28,
            padding: 16,
            boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* HERO */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
            }}
          >
            {/* AVATAR + BADGE */}
            <div style={{ position: "relative" }}>
              <img
                src="/images/avatar-nayanika.jpeg"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                }}
              />

              {/* STATUS BADGE */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 10,
                  height: 10,
                  background: "#3B82F6", // biru
                  borderRadius: "50%",
                  border: "2px solid white",
                  display: "inline-block",
                  animation: "pulse 1.5s infinite",
                }}
              />

            </div>

            {/* TEXT */}
            <div>
              <h3 style={{ margin: 0, fontSize: 16 }}>Nayanika 👶</h3>

              <p style={{ margin: 0, fontSize: 12, color: "#888" }}>
                Your gentle AI babysitter
              </p>

              {/* ACTIVE TEXT */}
              {/* <div
              style={{
                marginTop: 2,
                fontSize: 11,
                color: "#3B82F6",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  background: "#3B82F6",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "pulse 1.5s infinite",
                }}
              />
              Active
            </div> */}
            </div>
          </div>

          {/* BABY PROFILE */}
          <input
            placeholder="Usia bayi (contoh: 3 bulan)"
            value={babyProfile.age || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBabyProfile({ ...babyProfile, age: e.target.value })
            }
            style={{
              marginBottom: 10,
              padding: 10,
              borderRadius: 12,
              border: "1px solid #eee",
              outline: "none",
            }}
          />

          {/* CHAT AREA */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "8px 4px",
            }}
          >
            {messages.length === 0 && (
              <p style={{ textAlign: "center", color: "#aaa" }}>
                Tell me what's going on with your little one 💛
              </p>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                  marginBottom: 10,
                }}
              >
                {/* AI Avatar kecil */}
                {msg.role === "ai" && (
                  <img
                    src="/images/avatar-nayanika.jpeg"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      marginRight: 6,
                    }}
                  />
                )}

                {/* Bubble */}
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: 18,
                    background:
                      msg.role === "user" ? "#F9A8A8" : "#ffffff",
                    color: "#333",
                    maxWidth: "75%",
                    fontSize: 14,
                    whiteSpace: "pre-wrap",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <p style={{ fontSize: 12, color: "#999" }}>
                Nayanika is gently thinking...
              </p>
            )}
          </div>

          {/* INPUT */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#fff",
              borderRadius: 30,
              padding: "6px 10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya tentang bayi..."
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                background: "#F87171",
                border: "none",
                borderRadius: "50%",
                width: 36,
                height: 36,
                color: "#fff",
                cursor: "pointer",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          flex: "1 1 300px",
          padding: 20,
          display: "flex",
          justifyContent: "flex-end", // kanan
          marginTop: "auto",
        }}
      >
        <div
          style={{
            width: 420,
            display: "flex",          // 🔥 WAJIB
            flexDirection: "row",
            gap: 10,

          }}
        >


          <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1  }}>
            <h4 style={{ marginBottom: 10 }}>Core Skills</h4>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Baby size={16} color="#F87171" />
              <span style={{ color: "#555", fontSize: 14 }}>
                Nutrition Guidance
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Activity size={16} color="#F87171" />
              <span style={{ color: "#555", fontSize: 14 }}>
                Cry Analysis
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Moon size={16} color="#F87171" />
              <span style={{ color: "#555", fontSize: 14 }}>
                Sleep Support
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Heart size={16} color="#F87171" />
              <span style={{ color: "#555", fontSize: 14 }}>
                Emotional Support
              </span>
            </div>

          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1  }}>
            <h4 style={{ marginBottom: 6 }}>How it works</h4>
            <p style={{ color: "#666", fontSize: 14, lineHeight: 1.6 }}>
              • Tell Nayanika what’s happening <br />
              • Get gentle guidance instantly <br />
              • Feel more confident every day
            </p>
          </div>
        </div>


      </div>
    </div>
  );
}