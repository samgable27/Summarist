export interface ModalState {
  children?: any;
  visible: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  login: () => void;
  showModal: () => void;
  closeModal: () => void;
}

export interface ModalContextProps {
  store: () => ModalState;
  children?: React.ReactNode;
}
