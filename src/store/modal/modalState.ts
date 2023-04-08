export interface ModalState {
  children?: any;
  visible: boolean;
  showModal: () => void;
  openModal: () => void;
  closeModal: () => void;
}

export interface ModalContextProps {
  store: () => ModalState;
  children?: React.ReactNode;
}
