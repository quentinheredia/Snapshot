import { Outlet } from "react-router";
import Navbar from "./Navbar";

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "1rem" }}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
