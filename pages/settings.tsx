import React from "react";
import styles from "../styles/settings.module.css";
import { useModalStore } from "../src/store/store-client";
import Image from "next/image";
import LoginModal from "../components/auth/LoginModal";

interface SettingsProps {
  children?: React.ReactNode;
}

const Settings: React.FC<SettingsProps> = () => {
  const { isAuthenticated } = useModalStore();
  const showModal = useModalStore((state) => state.showModal);

  return (
    <div className="container">
      <div className="row">
        <div className={styles.settingWrapper}>
          <div className={styles.sectionTitle}>Settings</div>
          {!isAuthenticated ? (
            <div className={styles.loginWrapper}>
              <figure>
                <Image
                  src={"/images/login.png"}
                  alt=""
                  width={460}
                  height={320}
                />
              </figure>
              <h1>Log in to your account to see your details.</h1>
              <button className="btn home__cta--btn" onClick={showModal}>
                Login
              </button>
              <LoginModal />
            </div>
          ) : (
            <>
              <div className={styles.settingContentTop}>
                <h2>Your Subscription Plan</h2>
                <p>Basic</p>
                <button>Upgrade to Premium</button>
              </div>
              <div className={styles.settingContentBtm}>
                <h2>Email</h2>
                <p>youremail@gmail.com</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
