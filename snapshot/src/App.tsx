import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Snapshot from "./pages/Snapshot";
import Tax from "./pages/Tax";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Sign_up from "./pages/Sign_up";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Snapshot" element={<Snapshot />} />
          <Route path="/Tax" element={<Tax />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Sign-up" element={<Sign_up />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
