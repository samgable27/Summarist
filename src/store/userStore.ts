import { create } from "zustand";

interface UserStore {
  email: string | null;
  setEmail: (email: string | null) => void;
}

export const useStore = create<UserStore>((set) => ({
  email: null,
  setEmail: (email) => set({ email }),
}));
