export interface ModalState {
  visible: boolean;
  isAuthenticated: boolean;
  showModal: () => void;
  closeModal: () => void;
  logout: () => void;
  login: () => void;
}

export interface ModalContextProps {
  store: () => ModalState;
  children?: React.ReactNode;
}
