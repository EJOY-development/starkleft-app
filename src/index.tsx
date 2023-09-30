import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./styles/reset.scss";
import "./styles/index.scss";
import { Provider } from "react-redux";
import store from "./redux/Config";
import SocketContext from "./contexts/SocketContext";
import { io } from "socket.io-client";
import RootRouter from "./routers/RootRouter";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const socket = io("http://192.168.219.173:3930");

socket.on("connect", () => {
  console.log(`Socket connected!`);
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const persistor = persistStore(store);

root.render(
  <SocketContext.Provider value={socket}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootRouter />
      </PersistGate>
    </Provider>
  </SocketContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
