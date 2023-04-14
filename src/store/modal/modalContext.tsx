import React from "react";
import { ModalContextProps, ModalState } from "./modalState";

const ModalContext = React.createContext<ModalState>({
  visible: false,
  showModal: () => {},
  closeModal: () => {},
});

export const ModalContextProvider: React.FC<ModalContextProps> = ({
  store,
  children,
}) => {
  const modalState = store();
  return (
    <ModalContext.Provider value={modalState}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => React.useContext(ModalContext);
