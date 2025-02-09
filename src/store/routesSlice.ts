import { createSlice } from "@reduxjs/toolkit";
import { fetchRoutes, createRoute, removeRoute, toggleFavorite } from "./routesThunk";
import { Route } from "../types";

const initialState: {
  routes: Route[],
  loading: boolean,
  error: string | null,
} = {
  routes: [],
  loading: false,
  error: null,
};

const routesSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoutes.fulfilled, (state: any, action) => {
        state.loading = false;
        state.routes = action.payload;
      })
      .addCase(fetchRoutes.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createRoute.fulfilled, (state, action) => {
        state.routes.push(action.payload);
      })
      .addCase(removeRoute.fulfilled, (state, action) => {
        state.routes = state.routes.filter(route => route.id !== action.payload);
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const route = state.routes.find(route => route.id === action.payload.id);
        if (route) {
          (route as Route).isFavorite = action.payload.isFavorite;
        }
      });
  },
});

export default routesSlice.reducer;
