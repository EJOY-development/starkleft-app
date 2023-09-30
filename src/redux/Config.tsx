import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./Reducers";

const store = configureStore({
  reducer: RootReducer,
  middleware: (defaultMiddleware) => defaultMiddleware({ serializableCheck: false }),
});

export default store;
