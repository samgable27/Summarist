import { create } from "zustand";
import { ModalState } from "./modal/modalState";

export const useModalStore = create<ModalState>((set) => ({
  visible: false,
  isAuthenticated: false,
  showModal: () => set({ visible: true }),
  closeModal: () => set({ visible: false }),
  logout: () => set({ isAuthenticated: false }),
  login: () => set({ isAuthenticated: true }),
}));
