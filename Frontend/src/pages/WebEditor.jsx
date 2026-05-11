import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRocket, FaCode, FaEye, FaTimes, FaHome,
  FaFolder, FaSave, FaTerminal, FaPlay, FaExternalLinkAlt,
} from "react-icons/fa";
import { VscFiles, VscSearch, VscSourceControl, VscExtensions } from "react-icons/vsc";
import Editor from "@monaco-editor/react";
import { MOCK_WEBSITES_FREE, MOCK_WEBSITES_PRO } from "../services/mockData";

const ALL_MOCK = [...MOCK_WEBSITES_FREE, ...MOCK_WEBSITES_PRO.slice(2)];

// ══════════════════════════════════════════════════════════════
//  DEPLOY SYSTEM
//  Priority 1 → Real backend (if running)
//  Priority 2 → Netlify API (if VITE_NETLIFY_TOKEN set)
//  Priority 3 → Blob preview (always works, zero config)
// ══════════════════════════════════════════════════════════════
const deployWebsite = async (siteId, htmlCode, siteTitle) => {

  // ── 1. Try real backend ──────────────────────────────────────
  try {
    const res = await axios.get(
      `http://localhost:8000/website/deploy/${siteId}`,
      { withCredentials: true, timeout: 3000 }
    );
    if (res.data?.url) return { url: res.data.url, method: "backend" };
  } catch (_) {}

  // ── 2. Netlify API deploy ────────────────────────────────────
  const NETLIFY_TOKEN = import.meta.env.VITE_NETLIFY_TOKEN || "";
  if (NETLIFY_TOKEN) {
    try {
      const encoder = new TextEncoder();
      const encoded = encoder.encode(htmlCode);
      const hashBuffer = await crypto.subtle.digest("SHA-1", encoded);
      const sha1 = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0")).join("");

      // Create site
      const siteRes = await fetch("https://api.netlify.com/api/v1/sites", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${NETLIFY_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: siteTitle.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now(),
        }),
      });
      const site = await siteRes.json();

      // Create deploy
      const deployRes = await fetch(
        `https://api.netlify.com/api/v1/sites/${site.id}/deploys`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${NETLIFY_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ files: { "/index.html": sha1 } }),
        }
      );
      const deploy = await deployRes.json();

      // Upload file
      await fetch(
        `https://api.netlify.com/api/v1/deploys/${deploy.id}/files/index.html`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${NETLIFY_TOKEN}`,
            "Content-Type": "application/octet-stream",
          },
          body: encoded,
        }
      );

      return { url: `https://${site.name}.netlify.app`, method: "netlify" };
    } catch (err) {
      console.warn("Netlify deploy failed:", err);
    }
  }

  // ── 3. Blob preview fallback (no config needed) ──────────────
  const blob = new Blob([htmlCode], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  return { url, method: "blob" };
};
// ══════════════════════════════════════════════════════════════

function WebEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [website, setWebsite] = useState(null);
  const [code, setCode] = useState("");
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [deploying, setDeploying] = useState(false);
  const [deployResult, setDeployResult] = useState(null);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState(null);
  const chatEndRef = useRef(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      // Try mock data first
      const mockSite = ALL_MOCK.find((s) => s._id === id);
      if (mockSite) {
        setWebsite(mockSite);
        setCode(mockSite.latestcode);
        setLoading(false);
        return;
      }

      // Try backend
      try {
        const res = await axios.get(
          `http://localhost:8000/website/getwebsite/${id}`,
          { withCredentials: true }
        );
        setWebsite(res.data);
        setCode(res.data.latestcode);
        setMessages(res.data.converasation || []);
      } catch (_) {
        setWebsite({ title: "Untitled Website", _id: id });
        setCode("<!-- Start coding here -->");
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const handleDeploy = async () => {
    setDeploying(true);
    try {
      const result = await deployWebsite(id, code, website?.title || "my-site");
      setDeployResult(result);

      const msgs = {
        backend: "🚀 Deployed via backend!",
        netlify: "🌐 Live on Netlify!",
        blob:    "👁️ Preview opened in new tab!",
      };
      showToast(msgs[result.method], result.method === "blob" ? "info" : "success");
      window.open(result.url, "_blank");
    } catch (err) {
      showToast("❌ Deploy failed. Try again.", "error");
    } finally {
      setDeploying(false);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAsk = async () => {
    if (!prompt.trim()) return;
    setAiLoading(true);
    const userMsg = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setPrompt("");

    try {
      const result = await axios.post(
        `http://localhost:8000/website/update/${id}`,
        { prompt: userMsg.content },
        { withCredentials: true }
      );
      setMessages((prev) => [...prev, { role: "ai", content: result.data.message }]);
      setCode(result.data.code);
    } catch (_) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "⚠️ Backend not connected. Connect backend to use AI edits. You can still edit code manually!",
        },
      ]);
    }
    setAiLoading(false);
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#1e1e1e] text-white gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"
        />
        <p className="text-gray-400 text-sm">Loading Editor...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e] text-white overflow-hidden">

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-5 py-2.5 rounded-xl text-white text-sm font-semibold shadow-2xl ${
              toast.type === "error" ? "bg-red-600" :
              toast.type === "info" ? "bg-blue-600" : "bg-green-600"
            }`}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#323233] border-b border-black/40 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:opacity-80"
              onClick={() => navigate("/dashbord")} />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-gray-300 font-mono ml-2">
            {website?.title || "Untitled"} — Deploy.AI Editor
          </span>
        </div>

        <div className="flex items-center gap-2">
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleSave}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition ${
              saved ? "bg-green-600 text-white" : "bg-white/10 hover:bg-white/20 text-gray-300"
            }`}>
            <FaSave size={11} />{saved ? "Saved!" : "Save"}
          </motion.button>

          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowPreview(true)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-gray-300 transition">
            <FaEye size={11} /> Preview
          </motion.button>

          {/* Deploy button — shows method label */}
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleDeploy} disabled={deploying}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold transition disabled:opacity-60">
            <FaRocket size={11} />
            {deploying ? "Deploying..." : import.meta.env.VITE_NETLIFY_TOKEN ? "Deploy to Netlify" : "Deploy Preview"}
          </motion.button>

          {/* Live link if deployed via Netlify */}
          {deployResult?.method === "netlify" && (
            <a href={deployResult.url} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white transition">
              <FaExternalLinkAlt size={10} /> Live Link
            </a>
          )}

          <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-gray-300 transition">
            <FaHome size={11} /> Home
          </motion.button>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Activity bar */}
        <div className="w-12 bg-[#333333] flex flex-col items-center py-3 gap-5 border-r border-black/30 shrink-0">
          {[
            { icon: <VscFiles size={22} />, tab: "chat", label: "Chat" },
            { icon: <FaCode size={18} />, tab: "code", label: "Files" },
            { icon: <VscSearch size={20} />, tab: null, label: "Search" },
            { icon: <VscSourceControl size={20} />, tab: null, label: "Source" },
            { icon: <VscExtensions size={20} />, tab: null, label: "Extensions" },
          ].map((item, i) => (
            <button key={i} title={item.label}
              onClick={() => item.tab && setActiveTab(item.tab)}
              className={`p-2 rounded transition ${
                activeTab === item.tab
                  ? "text-white border-l-2 border-purple-500 bg-white/5"
                  : "text-gray-500 hover:text-gray-300"
              }`}>
              {item.icon}
            </button>
          ))}
        </div>

        {/* Left panel */}
        <div className="w-[300px] bg-[#252526] border-r border-black/30 flex flex-col shrink-0">
          <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-gray-500 font-semibold border-b border-white/5 flex items-center gap-2">
            <FaFolder size={10} />
            {activeTab === "chat" ? "AI Chat" : "Explorer"}
          </div>

          {activeTab === "code" ? (
            <div className="flex-1 overflow-y-auto py-2">
              <div className="px-4 py-1 text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">
                {website?.title}
              </div>
              <div className="flex items-center gap-2 px-6 py-1.5 text-xs text-blue-300 bg-white/5 cursor-pointer hover:bg-white/10">
                <FaCode size={10} className="text-orange-400" /> index.html
              </div>
              <div className="px-6 py-1.5 text-xs text-gray-600">style.css (embedded)</div>
              <div className="px-6 py-1.5 text-xs text-gray-600">script.js (embedded)</div>

              {/* Deploy info box */}
              <div className="mx-3 mt-4 p-3 rounded-lg bg-purple-900/20 border border-purple-500/20 text-[10px] text-gray-400 leading-relaxed">
                <p className="text-purple-400 font-bold mb-1">🚀 Deploy Options</p>
                {import.meta.env.VITE_NETLIFY_TOKEN
                  ? "✅ Netlify token detected — live deploy enabled!"
                  : "📌 No token — using blob preview. Add VITE_NETLIFY_TOKEN for live Netlify deploy."}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.length === 0 && (
                  <div className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-3 text-xs text-gray-300 leading-relaxed">
                    👋 <strong>AI Assistant</strong><br />
                    Ask me to modify your website!<br />
                    <span className="text-purple-300">"Make hero section blue"</span><br />
                    <span className="text-purple-300">"Add a contact form"</span><br />
                    <span className="text-purple-300">"Make it dark themed"</span>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className={`text-xs rounded-lg p-3 leading-relaxed ${
                      msg.role === "user"
                        ? "bg-blue-600/80 text-white ml-4"
                        : "bg-[#3c3c3c] text-gray-200 mr-4"
                    }`}>
                    {msg.role === "ai" && (
                      <span className="text-purple-400 font-bold text-[10px] block mb-1">AI</span>
                    )}
                    {msg.content}
                  </motion.div>
                ))}
                {aiLoading && (
                  <div className="bg-[#3c3c3c] rounded-lg p-3 flex items-center gap-2 text-xs text-gray-400 mr-4">
                    <motion.div animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="w-3 h-3 border border-purple-500 border-t-transparent rounded-full" />
                    Thinking...
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <div className="p-3 border-t border-white/5">
                <div className="flex gap-2">
                  <input value={prompt} onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleAsk()}
                    type="text" placeholder="Ask AI to modify..."
                    className="flex-1 bg-[#3c3c3c] border border-white/10 rounded px-3 py-2 text-xs outline-none focus:border-purple-500 transition placeholder-gray-600" />
                  <button onClick={handleAsk} disabled={aiLoading}
                    className="bg-purple-600 hover:bg-purple-500 px-3 py-2 rounded text-xs font-semibold transition disabled:opacity-50">
                    <FaPlay size={10} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Monaco editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center bg-[#2d2d2d] border-b border-black/30 px-2 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-[#1e1e1e] border-t border-purple-500 text-xs text-white font-mono">
              <FaCode size={10} className="text-orange-400" /> index.html
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <Editor height="100%" language="html" theme="vs-dark" value={code}
              onChange={(val) => setCode(val || "")}
              onMount={(editor) => {
                setTimeout(() => {
                  try { editor.getAction("editor.action.formatDocument").run(); } catch (_) {}
                }, 300);
              }}
              options={{
                wordWrap: "on", minimap: { enabled: true }, fontSize: 13,
                automaticLayout: true, scrollBeyondLastLine: false,
                lineNumbers: "on", folding: true, formatOnPaste: true, tabSize: 2,
              }}
            />
          </div>
          {/* Status bar */}
          <div className="flex items-center justify-between px-4 py-1 bg-[#007acc] text-white text-[10px] shrink-0">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><FaTerminal size={8} /> Deploy.AI Editor</span>
              <span>HTML</span>
            </div>
            <div className="flex items-center gap-3">
              {deployResult && (
                <a href={deployResult.url} target="_blank" rel="noreferrer"
                  className="underline hover:text-yellow-200 flex items-center gap-1">
                  <FaExternalLinkAlt size={8} />
                  {deployResult.method === "netlify" ? "netlify.app" :
                   deployResult.method === "backend" ? "Backend Live" : "Preview"}
                </a>
              )}
              <span>UTF-8</span>
              <span>Ln 1</span>
            </div>
          </div>
        </div>

        {/* Right live preview */}
        <div className="w-[400px] border-l border-black/30 flex flex-col shrink-0">
          <div className="flex items-center justify-between px-3 py-2 bg-[#2d2d2d] border-b border-black/30 text-xs text-gray-400 shrink-0">
            <span className="flex items-center gap-1.5"><FaEye size={10} /> Live Preview</span>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowPreview(true)}
              className="hover:text-white transition text-xs">
              ⛶ Fullscreen
            </motion.button>
          </div>
          <div className="flex-1 bg-white overflow-hidden">
            <iframe srcDoc={code} title="live-preview" className="w-full h-full border-none" />
          </div>
        </div>
      </div>

      {/* Full preview modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col">
            <div className="flex items-center justify-between px-6 py-3 bg-[#1e1e1e] border-b border-white/10 shrink-0">
              <span className="text-sm font-semibold">Full Preview — {website?.title}</span>
              <button onClick={() => setShowPreview(false)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-4 py-1.5 rounded text-sm transition">
                <FaTimes size={12} /> Close
              </button>
            </div>
            <div className="flex-1 bg-white">
              <iframe srcDoc={code} title="fullpreview" className="w-full h-full border-none" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default WebEditor;
