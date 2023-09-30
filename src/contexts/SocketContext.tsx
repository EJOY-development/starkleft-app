import { createContext } from "react";
import { Socket, io } from "socket.io-client";
const SocketContext = createContext<Socket | null>(null);

export default SocketContext;
