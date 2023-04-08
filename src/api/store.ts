let useModalStore: any;

if (typeof window !== "undefined") {
  const storeClientModule = require("./store-client");
  useModalStore = storeClientModule.useModalStore;
} else {
  useModalStore = () => {
    const dummyState = {
      visible: false,
      openModal: () => {},
      closeModal: () => {},
    };
    return dummyState;
  };
}

export { useModalStore };
