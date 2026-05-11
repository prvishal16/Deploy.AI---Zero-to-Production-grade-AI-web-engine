import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiSolidLeftArrowSquare } from "react-icons/bi";
import { motion } from "framer-motion";
import axios from "axios";

function LiveSite() {
  const { id } = useParams();
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const navigate = useNavigate();

  const liveUrl = `${window.location.origin}/site/${id}`;

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/website/getbyslug/${id}`,
          { withCredentials: true },
        );
        setHtml(res.data.latestcode);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Website Not Found or Error Loading");
        setLoading(false);
      }
    };
    fetchWebsite();
  }, [id]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(liveUrl);
      setCopySuccess("URL copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    } catch {
      setCopySuccess("Failed to copy URL");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-xl">
        Loading website...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={handleBack}
          >
            <BiSolidLeftArrowSquare
              size={28}
              className="hover:text-gray-400 transition"
            />
            <span className="text-lg font-semibold tracking-wide">
              Dashboard
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleCopyUrl}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Copy URL
            </button>
            {copySuccess && (
              <span className="text-sm text-green-400">{copySuccess}</span>
            )}
          </div>
        </div>
      </motion.div>

      <div className="h-20" />

      <motion.h1
        className="text-3xl font-bold text-white text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Live Website Preview
      </motion.h1>

      <div className="w-full max-w-6xl mx-auto h-[80vh] border border-gray-700 rounded-xl overflow-hidden shadow-xl">
        <iframe
          srcDoc={html}
          title="Live Website"
          className="w-full h-full"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>

      <motion.p
        className="text-gray-400 mt-4 text-center text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Share this page URL: <span className="text-blue-400">{liveUrl}</span>
      </motion.p>
    </div>
  );
}

export default LiveSite;

//now i am going to push the pricing and the total credite featre in the page simply s
