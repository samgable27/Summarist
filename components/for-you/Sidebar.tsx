import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "..//../styles/sidebar.module.css";
import activeStyles from "..//../styles/linkActive.module.css";
import {
  ApiOutlined,
  BookOutlined,
  HomeOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useModalStore } from "../../src/store/store-client";
import LoginModal from "../auth/LoginModal";
import { useRouter } from "next/router";
import { useAudioPlayerStore } from "../../src/store/audioPlayerStore";
import { useStore } from "../../src/store/userStore";
import { auth } from "../../firebase";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onClick: () => void;
  showModal: () => void;
  close: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  setActiveSection,
}) => {
  const router = useRouter();

  const { logout, showModal } = useModalStore();

  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useStore((state) => state.setIsAuthenticated);

  useEffect(() => {
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      const storedAuthState = JSON.parse(authStorage);
      if (storedAuthState.isAuthenticated) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const isAudioPlayerPresent = useAudioPlayerStore(
    (state) => state.isAudioPlayerPresent
  );

  const setIsAudioPlayerPresent = useAudioPlayerStore(
    (state) => state.setIsAudioPlayerPresent
  );

  const handleToggleAudioPlayer = () => {
    if (isAudioPlayerPresent) {
      return setIsAudioPlayerPresent(!isAudioPlayerPresent);
    } else {
      setIsAudioPlayerPresent(false);
    }
  };

  const handleLogout = () => {
    auth?.signOut().then(() => {
      localStorage.removeItem("stripeRole");
    });

    setTimeout(() => {
      setIsAuthenticated(false);
      logout();
    }, 200);
  };
  useEffect(() => {}, [isAuthenticated]);

  return (
    <div className={styles.sbContainer}>
      <div className={styles.sbLogo}>
        <Image src="/images/logo.png" width={160} height={40} alt={""} />
      </div>

      <div className={styles.sb__linksContainer}>
        <div
          onClick={handleToggleAudioPlayer}
          className={styles.sb__topContainer}
        >
          <div onClick={() => router.push("/for-you")}>
            <a
              onClick={() => {
                setActiveSection("for-you");
              }}
              className={activeSection === "for-you" ? activeStyles.active : ""}
            >
              {activeSection === "for-you" && (
                <div className={activeStyles.greenBar} />
              )}
              <div className={styles.sbIcon}>
                <HomeOutlined
                  style={{ paddingRight: "10px", fontSize: "20px" }}
                />
              </div>
              <div>For You</div>
            </a>
          </div>
          <div onClick={() => router.push("/library")}>
            <a
              onClick={() => {
                setActiveSection("My Library");
              }}
              className={
                activeSection === "My Library" ? activeStyles.active : ""
              }
            >
              {activeSection === "My Library" && (
                <div className={activeStyles.greenBar} />
              )}
              <div className={styles.sbIcon}>
                <BookOutlined
                  style={{ paddingRight: "10px", fontSize: "20px" }}
                />
              </div>
              <div>My Library</div>
            </a>
          </div>
          <a className={styles.sbLink__notAllowed}>
            <div className={styles.sbIcon}>
              <ApiOutlined style={{ paddingRight: "10px", fontSize: "20px" }} />
            </div>
            <div>Highlights</div>
          </a>
          <a className={styles.sbLink__notAllowed}>
            <div className={styles.sbIcon}>
              <SearchOutlined
                style={{ paddingRight: "10px", fontSize: "20px" }}
              />
            </div>
            <div>Search</div>
          </a>
        </div>

        <div
          className={
            isAudioPlayerPresent
              ? styles.sb__btmShiftedUp
              : styles.sb__btmContainer
          }
        >
          <div onClick={() => router.push("/settings")}>
            <a
              onClick={() => {
                setActiveSection("settings");
              }}
              className={activeSection ? activeStyles.active : ""}
            >
              {activeSection === "settings" && (
                <div className={activeStyles.greenBar} />
              )}
              <div className={styles.sbIcon}>
                <SettingOutlined
                  style={{ paddingRight: "10px", fontSize: "20px" }}
                />
              </div>
              <div>Settings</div>
            </a>
          </div>
          <a className={styles.sbLink__notAllowed}>
            <div className={styles.sbIcon}>
              <QuestionCircleOutlined
                style={{ paddingRight: "10px", fontSize: "20px" }}
              />
            </div>
            <div>Help & Support</div>
          </a>
          <a
            onClick={() => {
              isAuthenticated ? handleLogout() : showModal();
            }}
          >
            <div className={styles.sbIcon}>
              <LogoutOutlined
                style={{ paddingRight: "10px", fontSize: "20px" }}
              />
            </div>
            <div>{isAuthenticated ? "Logout" : "Login"}</div>
          </a>
          <LoginModal />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
