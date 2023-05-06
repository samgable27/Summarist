import { create } from "zustand";
import { ModalState } from "./modal/modalState";
import { useEffect } from "react";

interface UseStore {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const getPersistedAuthState = () => {
  if (typeof window !== "undefined") {
    const persistedAuthState = localStorage.getItem("auth-storage");
    return persistedAuthState
      ? JSON.parse(persistedAuthState).isAuthenticated
      : false;
  }
  return false;
};

export const useStore = create<UseStore>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));

export const useModalStore = create<ModalState>((set, get) => ({
  visible: false,
  isAuthenticated: getPersistedAuthState(),
  showModal: () => set({ visible: true }),
  closeModal: () => set({ visible: false }),
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "auth-storage",
        JSON.stringify({ isAuthenticated: false })
      );
    }
    set({ isAuthenticated: false });
  },
  login: () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "auth-storage",
        JSON.stringify({ isAuthenticated: true })
      );
    }
    set({ isAuthenticated: true });
  },
}));

export const useHydrateAuthState = () => {
  const isAuthenticated = useModalStore((state) => state.isAuthenticated);
  const login = useModalStore((state) => state.login);
  const logout = useModalStore((state) => state.logout);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const persistedAuthState = getPersistedAuthState();
      if (persistedAuthState !== isAuthenticated) {
        if (persistedAuthState) {
          login();
        } else {
          logout();
        }
      }
    }
  }, []);

  return null;
};
