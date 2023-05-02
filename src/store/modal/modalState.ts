export interface ModalState {
  children?: any;
  visible: boolean;
  logout: () => void;
  login: () => void;
  showModal: () => void;
  closeModal: () => void;
  isAuthenticated: boolean;
}

export interface ModalContextProps {
  store: () => ModalState;
  children?: React.ReactNode;
}
