import { useContext, useEffect, useState } from "react";
import SocketContext from "../contexts/SocketContext";
import "./ServerStatus.scss";
import { Socket } from "socket.io-client";
import { v4 } from "uuid";
import { fastInterval } from "../util/common";

const ServerStatus = () => {
  const socket = useContext(SocketContext);
  const [currentPing, setCurrentPing] = useState(0);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const t = fastInterval(() => {
      socket?.emit("t-ping", {
        id: v4(),
        timestamp: Date.now(),
      });
    }, 1000);

    const onPong = (data: any) => {
      const { id, timestamp } = data;
      const pingDiff = Date.now() - timestamp;
      setCurrentPing(pingDiff);
    };
    socket?.on("t-pong", onPong);

    return () => {
      clearInterval(t);
      socket?.off("t-pong", onPong);
    };
  }, []);

  useEffect(() => {
    setConnected(socket?.connected ?? false);
  }, [socket?.connected]);

  return (
    <div className="server-status">
      <div className={"status" + (connected ? " connected" : "")}></div>
      <div className="ping">{connected ? currentPing : 0} ms</div>
    </div>
  );
};

export default ServerStatus;
