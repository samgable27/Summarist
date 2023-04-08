import { ModalContextProvider } from "../src/store/modal/modalContext";
import { useModalStore } from "../src/store/store-client";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalContextProvider store={useModalStore}>
      <Component {...pageProps} />
    </ModalContextProvider>
  );
}

export default MyApp;
