export interface ModalState {
  children?: any;
  visible: boolean;
  showModal: () => void;
  closeModal: () => void;
}

export interface ModalContextProps {
  store: () => ModalState;
  children?: React.ReactNode;
}
