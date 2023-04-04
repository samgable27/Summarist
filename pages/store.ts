import { create } from "zustand";

interface ModalState {
  visible: boolean;
  showModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  visible: false,
  showModal: () => set({ visible: true }),
  closeModal: () => set({ visible: false }),
}));
