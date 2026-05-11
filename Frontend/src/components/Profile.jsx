import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Profile({ setprofile }) {
  const sabdata = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Handlelogout = () => {
    dispatch(logout());
    localStorage.removeItem("mockUser");
    setprofile(false);
    navigate("/");
  };

  const HandleViewProfile = () => {
    setprofile(false);
    navigate("/profile");
  };

  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      initial={{ opacity: 0, scale: 0.8, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -10 }}
      transition={{ duration: 0.25 }}
      className="absolute right-0 mt-3 w-[260px] bg-black border border-gray-700 rounded-xl shadow-2xl p-4 z-50"
    >
      <div className="flex flex-col items-center border-b border-gray-700 pb-3">
        <img
          src={sabdata?.avatar || `https://ui-avatars.com/api/?name=${sabdata?.name}`}
          className="h-[60px] w-[60px] rounded-full border-2 border-orange-500"
          alt="profile"
        />
        <p className="mt-2 text-white font-semibold">{sabdata?.name}</p>
        <p className="text-gray-400 text-sm">{sabdata?.email}</p>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm">
        <span className="text-gray-400">Total Coins</span>
        <span className="text-orange-400 font-bold">{sabdata?.credit}</span>
      </div>

      <button
        onClick={Handlelogout}
        className="mt-4 w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 transition duration-200 text-white font-medium cursor-pointer"
      >
        Logout
      </button>
      <button
        onClick={HandleViewProfile}
        className="mt-2 w-full py-2 rounded-lg hover:bg-gray-800 transition duration-200 text-white font-medium border border-gray-700 cursor-pointer"
      >
        View Profile
      </button>
    </motion.div>
  );
}

export default Profile;
