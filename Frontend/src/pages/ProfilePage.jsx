import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BiSolidLeftArrowSquare } from "react-icons/bi";
import { LuCoins } from "react-icons/lu";
import { logout } from "../redux/userSlice";

function ProfilePage() {
  const sabdata = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!sabdata) {
    navigate("/");
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("mockUser");
    navigate("/");
  };

  const stats = [
    { label: "Plan", value: sabdata.plan ? sabdata.plan.toUpperCase() : "FREE" },
    { label: "Credits", value: sabdata.credit ?? 0 },
    { label: "Member Since", value: new Date().getFullYear() },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full border-b border-white/10 px-6 py-4 flex items-center gap-3"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition cursor-pointer"
        >
          <BiSolidLeftArrowSquare size={24} />
          <span className="text-lg font-semibold">Back</span>
        </button>
        <span className="text-white/20">|</span>
        <span className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          My Profile
        </span>
      </motion.div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Avatar & Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-10"
        >
          <div className="relative">
            <img
              src={sabdata.avatar || `https://ui-avatars.com/api/?name=${sabdata.name}&size=120`}
              alt="avatar"
              className="h-28 w-28 rounded-full border-4 border-orange-500 shadow-lg shadow-orange-500/30"
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -bottom-1 -right-1 bg-orange-500 rounded-full p-1.5"
            >
              <LuCoins className="text-white" size={16} />
            </motion.div>
          </div>
          <h1 className="mt-4 text-3xl font-bold">{sabdata.name}</h1>
          <p className="text-gray-400 mt-1">{sabdata.email}</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04 }}
              className="bg-gray-900 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-1"
            >
              <span className="text-gray-400 text-xs uppercase tracking-widest">{s.label}</span>
              <span className="text-orange-400 font-bold text-xl">{s.value}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900 border border-white/10 rounded-xl p-6 mb-6 space-y-4"
        >
          <h2 className="text-lg font-semibold text-white/80 mb-2">Account Details</h2>
          {[
            { label: "Full Name", value: sabdata.name },
            { label: "Email", value: sabdata.email },
            { label: "Plan", value: sabdata.plan ? sabdata.plan.toUpperCase() : "FREE" },
            { label: "Credits Remaining", value: `${sabdata.credit ?? 0} coins` },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
              <span className="text-gray-400 text-sm">{item.label}</span>
              <span className="text-white font-medium">{item.value}</span>
            </div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-3"
        >
          <button
            onClick={() => navigate("/pricing")}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 font-semibold text-white transition cursor-pointer"
          >
            Upgrade Plan
          </button>
          <button
            onClick={() => navigate("/dashbord")}
            className="w-full py-3 rounded-xl border border-gray-700 hover:bg-gray-900 font-semibold text-white transition cursor-pointer"
          >
            Go to Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 font-semibold text-white transition cursor-pointer"
          >
            Logout
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default ProfilePage;
