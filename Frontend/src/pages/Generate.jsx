import React, { useState } from "react";
import { BiSolidLeftArrowSquare } from "react-icons/bi";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Generate() {
  const navigate = useNavigate();
  const sabdata = useSelector((state) => state.user.userData);
  const [prompt, setPrompt] = useState("");
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const steps = [
    "…thinking",
    "Memorizing patterns...",
    "Adding style...",
    "Writing logic...",
    "Adding interactive elements...",
    "Optimizing performance...",
    "Finalizing website...",
  ];

  const totalTime = 60;
  const stepTime = totalTime / steps.length;

  const Handlegeneratewebsite = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setProgress(0);
    setStatusMessage(steps[0]);

    for (let i = 0; i < steps.length; i++) {
      setStatusMessage(steps[i]);
      const newProgress = ((i + 1) / steps.length) * 100;
      setProgress(newProgress);
      await new Promise((resolve) => setTimeout(resolve, stepTime * 1000));
    }

    try {
      const result = await axios.post(
        "http://localhost:8000/website/generate",
        { prompt },
        { withCredentials: true },
      );
      console.log(result);
      setStatusMessage("Completed! Redirecting...");
      setTimeout(() => {
        setIsGenerating(false);
        setProgress(0);
        setStatusMessage("");
      }, 1500);
    } catch (error) {
      console.log("Error generating website: " + error);
      setStatusMessage("Error occurred!");
      setIsGenerating(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-black w-full text-white">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <BiSolidLeftArrowSquare
              size={28}
              className="hover:text-gray-400 transition"
            />
            <span className="text-lg font-semibold tracking-wide">
              Generate.AI
            </span>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl"
          >
            <motion.img
              src={sabdata?.avatar}
              alt="profile"
              className="h-9 w-9 rounded-full object-cover"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium">{sabdata?.name}</span>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4"
        >
          Build Website with
          <span className="text-yellow-400"> Real AI Power</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 mb-10"
        >
          Describe your website idea and let AI generate it instantly with
          BasirTechnosoft.Ai
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter Your Prompt or Idea To Get Your Website..."
            className="w-full h-[140px] bg-black border border-white/10 rounded-lg p-4 outline-none focus:border-yellow-400 resize-none"
          />

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(255,215,0,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-8 py-3 bg-gray-900 text-white rounded-lg cursor-pointer font-bold relative overflow-hidden"
            onClick={Handlegeneratewebsite}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Website"}
          </motion.button>

          {isGenerating && (
            <div className="mt-4 mb-2 text-center text-white font-medium">
              {statusMessage}
            </div>
          )}

          {isGenerating && (
            <div className="mt-2 w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-3 rounded-full bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
              />
            </div>
          )}

          {isGenerating && (
            <div className="mt-1 text-xs text-white/60">
              Estimated time: {Math.ceil(((100 - progress) / 100) * totalTime)}{" "}
              sec
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Generate;
