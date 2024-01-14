import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import { useAppSelector } from "./redux/store/hooks";
import { useEffect, useState } from "react";
import Login from "./pages/Login/Login";
import ForgotPass from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Layout from "./components/Layout";

import ErrorPage from "./pages/404";
import Profile from "./pages/Profile/Profile";
import ProfileSettings from "./pages/ProfileSettings/ProfileSettings";
import User from "./pages/User/User";
import Explore from "./pages/Explore/Explore";
import { socket } from "./socket";
import Messages from "./pages/Messages/Messages";

function App() {
  const user = useAppSelector((state) => state.user.user);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    // function onFooEvent(value) {
    //   setFooEvents(previous => [...previous, value]);
    // }
    // console.log("SOCKET CONNCTION");

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    // socket.on('foo', onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      // socket.off('foo', onFooEvent);
    };
  }, []);
  return (
    <Routes>
      <Route element={<ProtectedRoute shouldAuth={true} />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/settings" element={<ProfileSettings />} />
          <Route path="/messages" element={<Messages />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute shouldAuth={false} />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
      </Route>
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
