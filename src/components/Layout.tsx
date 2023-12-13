import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

function Layout() {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="w-full  overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
