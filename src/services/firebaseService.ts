import { initializeApp } from "firebase/app";
import { getDocs, getFirestore } from "firebase/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Route } from "../types";

// @ts-ignore-next-line
const env: any = import.meta.env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE__FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getRoutes = async () => {
  const querySnapshot = await getDocs(collection(db, "routes"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const addRoute = async (route: Route) => {
  const docRef = await addDoc(collection(db, "routes"), route);
  const { id, ...routeWithoutId } = route;
  return { id: docRef.id, ...routeWithoutId };
};

export const deleteRoute = async (id: string) => {
  await deleteDoc(doc(db, "routes", id));
};

export const updateFavoriteStatus = async (id: string, isFavorite: boolean) => {
  try {
    const docRef = doc(db, "routes", id);
    await updateDoc(docRef, { isFavorite });
  } catch (error) {}
};

export { db };
