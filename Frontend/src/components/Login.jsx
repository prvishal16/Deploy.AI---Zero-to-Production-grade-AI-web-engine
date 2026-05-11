import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../firebase.jsx";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";

// ─── DUMMY TEST ACCOUNTS ──────────────────────────────────────────────────────
const DUMMY_ACCOUNTS = [
  {
    label: "Test User 1",
    badge: "FREE",
    badgeColor: "bg-blue-500",
    data: {
      _id: "mock_user_001",
      name: "Alex Johnson",
      email: "alex@test.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      credit: 10,
      plan: "free",
    },
  },
  {
    label: "Test User 2",
    badge: "PRO",
    badgeColor: "bg-purple-500",
    data: {
      _id: "mock_user_002",
      name: "Sara Mitchell",
      email: "sara@test.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
      credit: 50,
      plan: "pro",
    },
  },
];
// ─────────────────────────────────────────────────────────────────────────────

function Login({ open, closelogin, setopenlogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ── Mock login (no Firebase, no backend) ──────────────────────────────────
  const handleMockLogin = (account) => {
    dispatch(setUserData(account.data));
    localStorage.setItem("mockUser", JSON.stringify(account.data));
    setopenlogin(false);
    navigate("/dashbord");
  };

  // ── Real Google login (needs Firebase + backend) ──────────────────────────
  const HandleGoogleauth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        {
          name: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        },
        { withCredentials: true }
      );
      setopenlogin(false);
      dispatch(setUserData(response.data.sabdata));
    } catch (error) {
      console.log(`Login error: ${error}`);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex justify-center items-center bg-black/80 backdrop-blur-md z-50"
          onClick={closelogin}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 text-white w-[400px] p-8 rounded-2xl shadow-2xl relative"
          >
            <h2 className="text-2xl font-bold text-center mb-6">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Deploy.AI
              </span>
            </h2>

            {/* ── Test Accounts Panel ── */}
            <div className="mb-5 rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3 text-center">
                🧪 Test Accounts — No backend needed
              </p>
              <div className="grid grid-cols-2 gap-3">
                {DUMMY_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.data._id}
                    onClick={() => handleMockLogin(acc)}
                    className="flex flex-col items-start gap-1 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 p-3 text-left transition-all duration-200 hover:scale-[1.02]"
                  >
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${acc.badgeColor}`}>
                      {acc.badge}
                    </span>
                    <span className="font-semibold text-white text-sm">{acc.data.name}</span>
                    <span className="text-white/40 text-xs">{acc.data.email}</span>
                    <span className="text-orange-400 text-xs font-medium">⚡ {acc.data.credit} credits</span>
                  </button>
                ))}
              </div>
            </div>
            {/* ─────────────────────────── */}

            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-white/30 uppercase tracking-widest">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <button
              className="w-full h-[50px] bg-white text-black rounded-xl flex items-center justify-center gap-3 font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              onClick={HandleGoogleauth}
            >
              <FcGoogle size={22} />
              <span>Continue with Google</span>
            </button>

            <button
              className="mt-3 w-full border border-gray-600 py-2 rounded-lg hover:bg-gray-800 transition duration-200 cursor-pointer text-red-500 font-bold"
              onClick={closelogin}
            >
              Cancel
            </button>

            <div className="mt-4 text-center text-gray-500 text-xs">
              By continuing you agree to our{" "}
              <span className="underline cursor-pointer hover:text-gray-400">Terms of Service</span>{" "}
              &{" "}
              <span className="underline cursor-pointer hover:text-gray-400">Privacy Policy</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Login;
