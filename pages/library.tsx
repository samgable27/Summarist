import React from "react";
import libStyles from "../styles/library.module.css";
import styles from "../styles/settings.module.css";
import { useModalStore } from "../src/store/store-client";
import LoginModal from "../components/auth/LoginModal";
import Image from "next/image";

interface LibraryProps {
  children?: React.ReactNode;
}

const Library: React.FC<LibraryProps> = () => {
  const { isAuthenticated } = useModalStore();
  const showModal = useModalStore((state) => state.showModal);

  return (
    <div className={libStyles.libContainer}>
      {!isAuthenticated ? (
        <div className={styles.loginWrapper}>
          <figure>
            <Image src={"/images/login.png"} alt="" width={460} height={320} />
          </figure>
          <h1>Log in to your account to see your details.</h1>
          <button className="btn home__cta--btn" onClick={showModal}>
            Login
          </button>
          <LoginModal />
        </div>
      ) : (
        <>
          <div>
            <span>Saved Books</span>
            <p>0 items</p>
          </div>
          <div className={libStyles.libBlockWrapper}>
            <h2>Save your favorite books!</h2>
            <p>When you save a book, it will appear here.</p>
          </div>
          <div>
            <span>Finished</span>
            <p>0 items</p>
            <div className={libStyles.libBlockWrapper}>
              <h2>Done and dusted!</h2>
              <p>When you finish a book, you can find it here later.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Library;
