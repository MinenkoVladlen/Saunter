import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRoutes,
  addRoute as addRouteFirebase,
  deleteRoute as deleteRouteFirebase,
  updateFavoriteStatus,
} from "../services/firebaseService";
import { Route } from "../types";

export const fetchRoutes = createAsyncThunk(
  "routes/fetchRoutes",
  async (_, { rejectWithValue }) => {
    try {
      return await getRoutes();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createRoute = createAsyncThunk(
  "routes/createRoute",
  async (route: Route, { rejectWithValue }) => {
    try {
      return await addRouteFirebase(route);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const removeRoute = createAsyncThunk(
  "routes/removeRoute",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteRouteFirebase(id);
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const toggleFavorite = createAsyncThunk(
  "routes/toggleFavorite",
  async (
    { id, isFavorite }: { id: string; isFavorite: boolean },
    { rejectWithValue }
  ) => {
    try {
      await updateFavoriteStatus(id, isFavorite);
      return { id, isFavorite };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
