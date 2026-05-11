import React, { useEffect, useState } from "react";
import { BiSolidLeftArrowSquare } from "react-icons/bi";
import { FaRocket, FaExternalLinkAlt, FaSpinner } from "react-icons/fa";
import { RiAiGenerate } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MOCK_WEBSITES_FREE, MOCK_WEBSITES_PRO } from "../services/mockData";

// ── Frontend-only deploy (no API, no token needed) ───────────────────────────
const deployLocally = (htmlCode) => {
  const blob = new Blob([htmlCode], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  return url;
};
// ─────────────────────────────────────────────────────────────────────────────

function Dashbord() {
  const sabdata = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deployingId, setDeployingId] = useState(null);
  const [deployedUrls, setDeployedUrls] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Load mock websites based on plan, then try backend
  useEffect(() => {
    const init = async () => {
      // 1. Load mock data immediately based on plan
      const isPro = sabdata?.plan === "pro";
      const mockSites = isPro ? MOCK_WEBSITES_PRO : MOCK_WEBSITES_FREE;

      // Restore any deployed states from localStorage
      const savedDeployed = JSON.parse(localStorage.getItem("deployedUrls") || "{}");
      setDeployedUrls(savedDeployed);
      setWebsites(mockSites);
      setLoading(false);

      // 2. Try real backend silently
      try {
        const res = await axios.get("http://localhost:8000/website/getall", {
          withCredentials: true,
        });
        if (res.data && res.data.length > 0) {
          setWebsites(res.data);
        }
      } catch (_) {
        // Backend not running — mock data already shown
      }
    };

    init();
  }, [sabdata]);

  const handleDeploy = (site) => {
    setDeployingId(site._id);
    try {
      // Try real backend first
      axios.get(`http://localhost:8000/website/deploy/${site._id}`, { withCredentials: true })
        .then((result) => {
          if (result.data.url) {
            const newUrls = { ...deployedUrls, [site._id]: result.data.url };
            setDeployedUrls(newUrls);
            localStorage.setItem("deployedUrls", JSON.stringify(newUrls));
            showToast("🚀 Deployed successfully!");
            window.open(result.data.url, "_blank");
          }
        })
        .catch(() => {
          // Backend not running — open preview in new tab (no API needed)
          const url = deployLocally(site.latestcode);
          const newUrls = { ...deployedUrls, [site._id]: url };
          setDeployedUrls(newUrls);
          localStorage.setItem("deployedUrls", JSON.stringify(newUrls));
          showToast("👁️ Preview opened in new tab!", "info");
          window.open(url, "_blank");
        })
        .finally(() => setDeployingId(null));
    } catch (err) {
      showToast("❌ Something went wrong.", "error");
      setDeployingId(null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl font-semibold shadow-2xl text-white text-sm ${
              toast.type === "error" ? "bg-red-600" : toast.type === "info" ? "bg-blue-600" : "bg-green-600"
            }`}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <BiSolidLeftArrowSquare size={28} className="hover:text-gray-400 transition" />
            <span className="text-lg font-semibold tracking-wide">Dashboard</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/generate")}
            className="flex items-center gap-2 px-5 py-2 rounded-lg border border-yellow-500/40 hover:border-yellow-400 transition"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <RiAiGenerate size={22} className="text-yellow-400" />
            </motion.div>
            <span className="text-sm font-semibold text-yellow-400">Generate</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome — name fixed, no overflow */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold mb-1 truncate"
        >
          Welcome Back
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-400 mb-10 truncate"
        >
          {sabdata?.name}
        </motion.p>

        {/* Plan badge */}
        <div className="flex items-center gap-3 mb-10">
          <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
            sabdata?.plan === "pro" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300"
          }`}>
            {sabdata?.plan === "pro" ? "⚡ Pro Plan" : "🆓 Free Plan"}
          </span>
          <span className="text-gray-500 text-sm">
            {sabdata?.plan === "pro" ? "4 websites" : "2 websites"} available
          </span>
        </div>

        {loading ? (
          <div className="flex items-center gap-3 text-gray-400">
            <FaSpinner className="animate-spin" />
            <span>Loading websites...</span>
          </div>
        ) : websites.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">No websites created yet</p>
            <button
              onClick={() => navigate("/generate")}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl transition"
            >
              Generate Your First Website
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {websites.map((site, index) => {
              const liveUrl = deployedUrls[site._id] || site.deployUrl;
              const isDeployed = !!liveUrl;
              const isDeploying = deployingId === site._id;

              return (
                <motion.div
                  key={site._id}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.12 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer
                    bg-gradient-to-br from-purple-600/30 via-blue-500/20 to-pink-500/30
                    border border-white/10 backdrop-blur-xl shadow-xl hover:shadow-2xl transition"
                >
                  {/* Preview */}
                  <div className="relative w-full h-[170px] bg-black overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-7 bg-neutral-900 flex items-center gap-2 px-3 z-10">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="absolute top-7 left-0 w-full h-[calc(100%-28px)] overflow-hidden">
                      <iframe
                        srcDoc={site.latestcode}
                        title="preview"
                        loading="lazy"
                        className="w-[1200px] h-[900px] scale-[0.35] origin-top-left pointer-events-none"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h2 className="text-base font-semibold text-white mb-1 line-clamp-1">
                      {site.title}
                    </h2>
                    <p className="text-xs text-gray-400 mb-4">
                      {new Date(site.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {/* Editor button */}
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate(`/editor/${site._id}`)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold
                          bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:opacity-90 transition cursor-pointer"
                      >
                        ✏️ Editor
                      </motion.button>

                      {/* Deploy / Share button */}
                      {!isDeployed ? (
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          disabled={isDeploying}
                          onClick={() => handleDeploy(site)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold
                            bg-gradient-to-r from-green-400 to-emerald-500 text-black hover:opacity-90 transition cursor-pointer disabled:opacity-60"
                        >
                          {isDeploying ? (
                            <><FaSpinner className="animate-spin" /> Deploying...</>
                          ) : (
                            <><FaRocket /> Deploy</>
                          )}
                        </motion.button>
                      ) : (
                        <motion.a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold
                            bg-gradient-to-r from-blue-400 to-cyan-500 text-black hover:opacity-90 transition"
                        >
                          <FaExternalLinkAlt /> Live Link
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashbord;
