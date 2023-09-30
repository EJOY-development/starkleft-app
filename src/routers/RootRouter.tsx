import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import Battle from "../pages/Battle";
import Home from "../pages/Home";
import Login from "../pages/Login";

const RootRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRouter />}>
          <Route path="/battle" element={<Battle />} />
          <Route path="*" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<div>404 Page</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootRouter;
