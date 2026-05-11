import React from "react";
import { motion } from "framer-motion";
import { BiSolidLeftArrowSquare } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Pricing() {
  const navigate = useNavigate();

  const planes = [
    {
      id: 1,
      name: "Free",
      price: 0,
      credits: 100,
      description: "Basic plan suitable for starters with limited features.",
      features: [
        "Access to basic tools",
        "Single project",
        "100MB storage",
        "Community support",
        "Basic analytics",
        "Limited customizations",
      ],
      popular: false,
      // Free → only Get Started (no upgrade button)
      primaryBtn: "Get Started",
      upgradeBtn: null,
    },
    {
      id: 2,
      name: "Pro",
      price: 49,
      credits: 400,
      description: "Advanced plan for professionals with more storage and features.",
      features: [
        "Access to all tools",
        "5 projects",
        "5GB storage",
        "Priority support",
        "Advanced analytics",
        "Custom branding",
        "Export in high quality",
      ],
      popular: true,
      primaryBtn: "Upgrade to Pro",
      upgradeBtn: null,
    },
    {
      id: 3,
      name: "Enterprise",
      price: 149,
      credits: 1400,
      description: "Complete solution for businesses with unlimited projects and premium support.",
      features: [
        "Unlimited tools access",
        "Unlimited projects",
        "50GB storage",
        "24/7 dedicated support",
        "Advanced team collaboration",
        "Priority updates and features",
        "Custom integrations",
        "Custom templates",
        "Analytics dashboard",
        "Multi-user access",
        "White-label solutions",
        "Dedicated account manager",
        "High-level security and compliance",
      ],
      popular: true,
      primaryBtn: "Upgrade to Enterprise",
      upgradeBtn: null,
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen py-12 px-4">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full border-b border-white/10 mb-8"
      >
        <div
          className="max-w-6xl mx-auto flex items-center gap-2 cursor-pointer px-4 py-3"
          onClick={() => navigate(-1)}
        >
          <BiSolidLeftArrowSquare size={24} className="hover:text-gray-400 transition" />
          <span className="text-lg font-semibold cursor-pointer">Back</span>
        </div>
      </motion.div>

      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Transparent Pricing</h1>
        <p className="text-gray-400 text-sm md:text-base">Buy Credit once, Build anytime</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {planes.map((plane, index) => (
          <motion.div
            key={plane.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            className={`p-5 rounded-xl flex flex-col shadow-lg border-2 relative ${
              plane.popular
                ? "border-yellow-400 bg-gray-800"
                : "border-gray-700 bg-gray-850"
            }`}
          >
            {/* Glowing border for popular */}
            {plane.popular && (
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-yellow-400 pointer-events-none"
                animate={{ boxShadow: ["0 0 5px #FFD700", "0 0 20px #FFD700", "0 0 5px #FFD700"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
            )}

            {/* Popular badge */}
            {plane.popular && (
              <div className="bg-yellow-400 text-gray-900 font-semibold px-3 py-1 rounded-full text-xs self-start mb-2 z-10 relative">
                POPULAR
              </div>
            )}

            {/* Emoji icons */}
            {plane.id === 2 && (
              <motion.div
                className="text-3xl absolute -top-5 right-4 z-20"
                animate={{ rotate: [0, 15, -15, 0], y: [0, -5, 0, -5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >👑</motion.div>
            )}
            {plane.id === 3 && (
              <motion.div
                className="text-3xl absolute -top-5 right-4 z-20"
                animate={{ rotate: [0, 360], scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >✨</motion.div>
            )}

            <h2 className="text-xl md:text-2xl font-bold mb-1 z-10 relative">{plane.name}</h2>
            <p className="text-gray-400 text-sm mb-2 z-10 relative">{plane.description}</p>

            <div className="mb-2 z-10 relative">
              <span className="text-2xl md:text-3xl font-bold">${plane.price}</span>
              <span className="text-gray-400 text-sm ml-2">({plane.credits} credits)</span>
            </div>

            <div className="flex-1 mb-4 overflow-y-auto max-h-36 z-10 relative">
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs md:text-sm">
                {plane.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            </div>

            <div className="mt-auto z-10 relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/")}
                className="w-full bg-blue-600 hover:bg-blue-700 px-3 py-2.5 rounded-lg font-semibold text-sm cursor-pointer transition"
              >
                {plane.primaryBtn}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Pricing;
