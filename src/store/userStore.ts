import { create } from "zustand";

interface UserStore {
  isAuthenticated: boolean;
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
  setIsAuthenticated: (auth: boolean) => void;
}

const persistedEmailState = () => {
  if (typeof window !== "undefined") {
    const persistedEmailState = localStorage.getItem("user-storage");
    return persistedEmailState
      ? JSON.parse(persistedEmailState).userEmail
      : false;
  }
  return false;
};

export const useStore = create<UserStore>((set) => ({
  isAuthenticated: false,
  userEmail: persistedEmailState(),
  setUserEmail: (email) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "user-storage",
        JSON.stringify({ userEmail: email })
      );
    }
    set({ userEmail: email });
  },
  setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),
}));
