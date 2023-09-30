import { useDispatch, useSelector } from "react-redux";
import { authCurrent, clearAuth } from "../store/AuthSlice";
import Home from "../pages/Home";
import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import { verifyToken } from "../thunks/AuthThunk";
import SocketContext from "../contexts/SocketContext";

const AuthRouter = () => {
  const dispatch = useDispatch();
  const auth = useSelector(authCurrent);
  const socket = useContext(SocketContext);
  const { accessToken, refreshToken, uid } = auth;
  const [authorizeStatus, setAuthorizeStatus] = useState(0);
  // console.log(auth);

  const hasToken = useMemo(() => {
    return accessToken != null && uid != null;
  }, [accessToken, uid]);

  useEffect(() => {
    if (!hasToken) {
      setAuthorizeStatus(1);
      return;
    }
    const onVerifyToken = (success: boolean) => {
      if (success) setAuthorizeStatus(2);
      else {
        setAuthorizeStatus(1);
        dispatch(clearAuth());
      }
    };
    socket?.emit("verify-token", { accessToken, refreshToken });
    socket?.on("verify-token", onVerifyToken);
    return () => {
      socket?.off("verify-token", onVerifyToken);
    };
  }, [hasToken, accessToken, refreshToken]);

  switch (authorizeStatus) {
    case 2:
      return <Outlet />;
    case 1:
      return <Navigate to="/login" />;
    default:
      return <div>loading...</div>;
  }
};

export default AuthRouter;
