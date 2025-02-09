import { configureStore } from "@reduxjs/toolkit";
import routesReducer from "./routesSlice";

const store = configureStore({
  reducer: {
    routes: routesReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
