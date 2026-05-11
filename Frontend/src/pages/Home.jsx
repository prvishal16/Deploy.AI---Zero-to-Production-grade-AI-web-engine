import { useState } from "react";
import Login from "../components/Login.jsx";
import { useSelector } from "react-redux";
import { LuCoins } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";
import Profile from "../components/Profile.jsx";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: "🤖",
    title: "AI Generated Code",
    desc: "Describe your idea in plain English — Deploy.AI writes the full HTML, CSS & JS for you instantly.",
    gradient: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/30",
  },
  {
    icon: "📱",
    title: "Fully Responsive",
    desc: "Every generated website is mobile-first and looks pixel-perfect on all screen sizes.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
  },
  {
    icon: "🚀",
    title: "Production Ready",
    desc: "From prompt to live website in seconds. Clean, optimized code ready to ship.",
    gradient: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/30",
  },
];

function Home() {
  const [openlogin, setopenlogin] = useState(false);
  const sabdata = useSelector((state) => state.user.userData);
  const [openp, setprofile] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen w-full bg-black">

        {/* ── Navbar ── */}
        <div className="text-white flex justify-between items-center px-6 py-4 border-b border-white/5">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer flex items-center gap-2"
          >
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Deploy.AI
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <button
              className="h-[38px] px-5 border border-gray-600 rounded-lg bg-transparent text-white text-sm cursor-pointer hover:border-gray-400 transition whitespace-nowrap"
              onClick={() => navigate("/pricing")}
            >
              Pricing
            </button>

            {/* Credits badge */}
            {sabdata && (
              <div className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-black border border-orange-500 overflow-hidden cursor-pointer">
                <motion.span
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-orange-500 blur-xl"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="relative text-orange-400 text-xl drop-shadow-[0_0_15px_orange]"
                >
                  <LuCoins />
                </motion.div>
                <span className="relative text-orange-300 font-semibold text-sm tracking-wide">
                  Credits
                </span>
                <motion.span
                  key={sabdata?.credit}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="relative font-bold text-white bg-orange-600 px-3 py-0.5 rounded-full text-sm"
                >
                  {sabdata?.credit}
                </motion.span>
              </div>
            )}

            {/* Auth button */}
            {!sabdata ? (
              <button
                onClick={() => setopenlogin(true)}
                className="h-[38px] px-5 font-bold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 transition rounded-lg text-white text-sm cursor-pointer whitespace-nowrap"
              >
                Get Started
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setprofile(!openp)}
                  className="relative h-[46px] w-[46px] flex items-center justify-center cursor-pointer"
                >
                  <span className="absolute inset-0 rounded-full border-[2px] border-pink-500 animate-pulse pointer-events-none" />
                  <img
                    className="h-[36px] w-[36px] rounded-full object-cover border-2 border-white z-10"
                    src={sabdata?.avatar || `https://ui-avatars.com/api/?name=${sabdata.name}`}
                    alt="profile"
                  />
                </button>
                <AnimatePresence>
                  {openp && <Profile setprofile={setprofile} />}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* ── Hero ── */}
        <div className="flex flex-col justify-center items-center text-center px-6 py-24 text-white">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 px-4 py-1.5 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300 text-xs font-semibold uppercase tracking-widest"
          >
            ⚡ AI-Powered Website Generation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-black text-5xl md:text-6xl leading-tight mb-4"
          >
            Zero Prompt to
            <br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Production Website
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-xl leading-relaxed mb-10"
          >
            Describe your idea — Deploy.AI writes, previews, and launches your
            fully responsive website in seconds.
          </motion.p>

          {!sabdata ? (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setopenlogin(true)}
              className="px-8 py-3.5 font-bold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-xl text-white text-base cursor-pointer shadow-lg shadow-purple-900/40 transition"
            >
              Start Building Free →
            </motion.button>
          ) : (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/dashbord")}
              className="px-8 py-3.5 font-bold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-xl text-white text-base cursor-pointer shadow-lg shadow-purple-900/40 transition"
            >
              Go to Dashboard →
            </motion.button>
          )}
        </div>

        {/* ── Feature Cards ── */}
        <div className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`bg-gradient-to-br ${f.gradient} border ${f.border} rounded-2xl p-6 backdrop-blur-sm`}
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Footer ── */}
        <hr className="border-white/5" />
        <div className="flex justify-center items-center p-6">
          <footer className="text-gray-500 text-sm text-center">
            &copy; 2026{" "}
            <span className="text-gray-400 font-medium">P R Vishal</span>
            {" — "}
            <span>Zero to Production AI Web Forge & Launch Engine.</span>
            {" "}All rights reserved.
          </footer>
        </div>

        {/* Login modal */}
        {openlogin && (
          <Login
            open={openlogin}
            closelogin={() => setopenlogin(false)}
            setopenlogin={setopenlogin}
          />
        )}
      </div>
    </>
  );
}

export default Home;
