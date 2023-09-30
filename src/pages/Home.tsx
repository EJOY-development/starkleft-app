import { useContext, useEffect, useMemo, useState } from "react";
import "./Home.scss";
import { toRelativeTime } from "../util/common";
import ServerStatus from "../components/ServerStatus";
import SocketContext from "../contexts/SocketContext";
import { useDispatch } from "react-redux";
import { clearAuth } from "../store/AuthSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [c, setC] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [findingGame, setFindingGame] = useState(false);
  const [findGameStartTime, setFindGameStartTime] = useState<number>(0);
  const [onlineUsers, setOnlineUsers] = useState({});
  const socket = useContext(SocketContext);

  const elapsedTime = useMemo(() => {
    if (!findingGame) return "0";
    return toRelativeTime(Date.now() - findGameStartTime);
  }, [findGameStartTime, findingGame, c]);

  const findGame = () => {
    // request to server

    setFindingGame(true);
    setFindGameStartTime(Date.now());
  };

  const cancelGame = () => {
    // request to server

    setFindingGame(false);
    setFindGameStartTime(0);
  };

  // debug
  const fastFindGame = (e: any) => {
    e.preventDefault();
    navigate("/battle");
  };

  const logout = () => {
    dispatch(clearAuth());
    navigate("/");
  };

  useEffect(() => {
    const t = setInterval(() => {
      setC((c) => c + 1);
    }, 100);

    return () => {
      clearInterval(t);
    };
  }, []);

  useEffect(() => {
    if (!socket?.connected) return;

    const onOnlineUsers = (data: any) => {
      setOnlineUsers(data);
    };

    socket?.emit("online-users");
    socket?.on("online-users", onOnlineUsers);
    return () => {
      socket?.off("online-users", onOnlineUsers);
    };
  }, [socket?.connected]);

  useEffect(() => {
    if (!socket?.connected) return;

    const onUserOnline = (userInfo: any) => {
      setOnlineUsers((users) => {
        const newUsers = { ...users } as any;
        newUsers[userInfo.id] = userInfo;
        return newUsers;
      });
    };
    const onUserOffline = (userId: string) => {
      setOnlineUsers((users) => {
        const newUsers = { ...users } as any;
        delete newUsers[userId];
        return newUsers;
      });
    };

    socket?.on("join", onUserOnline);
    socket?.on("leave", onUserOffline);
    return () => {
      socket?.off("join", onUserOnline);
      socket?.off("leave", onUserOffline);
    };
  }, [socket?.connected, onlineUsers]);

  return (
    <div className="home page">
      <ServerStatus />
      <div className="title">Stark-Left</div>
      <div className="online-users">
        {Object.values(onlineUsers).map((e: any) => {
          return (
            <div className="online-user">
              <div className="username">{e?.nickname}</div>
              <div className="status">온라인</div>
            </div>
          );
        })}
      </div>
      <div className="find-game-status">
        {findingGame && <div className="elapsed-time">대전 찾는중... {elapsedTime}</div>}
        <div className="find-game" onClick={findingGame ? cancelGame : findGame} onContextMenu={fastFindGame}>
          {findingGame ? "취소" : "대전 찾기"}
        </div>
      </div>
      <button className="logout" onClick={logout}>
        로그아웃
      </button>
    </div>
  );
};

export default Home;
