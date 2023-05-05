import { create } from "zustand";

interface UserStore {
  isAuthenticated: boolean;
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
  setIsAuthenticated: (auth: boolean) => void;
}

export const useStore = create<UserStore>((set) => ({
  isAuthenticated: false,
  userEmail: null,
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
