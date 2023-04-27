import React, { useEffect, useState } from "react";
import styles from "../styles/settings.module.css";
import { useModalStore } from "../src/store/store-client";
import Image from "next/image";
import navStyles from "../styles/for-you.module.css";
import LoginModal from "../components/auth/LoginModal";
import { auth } from "../firebase";
import { useStore } from "zustand";
import Nav from "../components/for-you/Nav";
import Sidebar from "../components/for-you/Sidebar";

interface SettingsProps {
  children?: React.ReactNode;
  setEmail?: (email: string) => void;
}

const Settings: React.FC<SettingsProps> = () => {
  const { isAuthenticated } = useModalStore();
  const showModal = useModalStore((state) => state.showModal);
  const [activeSection, setActiveSection] = useState("settings");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userEmail = user.email;
        console.log("user logged in");
      } else {
        console.log("user logged out");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="container">
      <section>
        <header className={navStyles.navContainer}>
          <Nav />
          <Sidebar
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            setActiveSection={(section: string) => setActiveSection(section)}
            activeSection={activeSection}
            showModal={function (): void {
              throw new Error("Function not implemented.");
            }}
            close={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </header>
      </section>
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
  );
};

export default Settings;
