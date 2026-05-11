import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Fetchdata from "../hooks/Fetchdata.jsx";
import { useSelector } from "react-redux";
import Dashbord from "./pages/Dashbord.jsx";
import Generate from "./pages/Generate.jsx";
import WebEditor from "./pages/WebEditor.jsx";
import LiveSite from "./pages/LiveSite.jsx";
import Pricing from "./pages/Pricing.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

function App() {
  const sabdata = useSelector((state) => state.user.userData);
  return (
    <>
      <Fetchdata />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashbord" element={sabdata ? <Dashbord /> : <Home />} />
          <Route path="/generate" element={sabdata ? <Generate /> : <Home />} />
          <Route path="/editor/:id" element={<WebEditor />} />
          <Route path="/site/:id" element={<LiveSite />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/profile" element={sabdata ? <ProfilePage /> : <Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
