import { create } from "zustand";

export const useModalStore = create((set) => ({
  visible: false,
  openModal: () => set({ visible: true }),
  closeModal: () => set({ visible: false }),
}));
