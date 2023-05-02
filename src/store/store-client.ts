import { create } from "zustand";
import { ModalState } from "./modal/modalState";

interface UseStore {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  visible: false,
  isAuthenticated: false,
  showModal: () => set({ visible: true }),
  closeModal: () => set({ visible: false }),
  logout: () => set({ isAuthenticated: false }),
  login: () => set({ isAuthenticated: true }),
}));

export const useStore = create<UseStore>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));
