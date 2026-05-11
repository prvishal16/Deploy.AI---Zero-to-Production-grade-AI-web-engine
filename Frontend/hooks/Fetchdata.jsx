import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../src/redux/userSlice";

function Fetchdata() {
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      // 1. Restore mock user from localStorage (works fully offline)
      const stored = localStorage.getItem("mockUser");
      if (stored) {
        try {
          dispatch(setUserData(JSON.parse(stored)));
        } catch (_) {}
      }

      // 2. Try real backend (silently fails if not running)
      try {
        const result = await axios.get("http://localhost:8000/user/currentData", {
          withCredentials: true,
        });
        if (result.data.sabdata) {
          dispatch(setUserData(result.data.sabdata));
          localStorage.setItem("mockUser", JSON.stringify(result.data.sabdata));
        }
      } catch (error) {
        // Backend not running — mock user already restored above, no action needed
      }
    };

    init();
  }, []);

  return null;
}

export default Fetchdata;
