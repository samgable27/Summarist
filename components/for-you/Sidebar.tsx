import Image from "next/image";
import React, { useState } from "react";
import styles from "..//../styles/sidebar.module.css";
import activeStyles from "..//../styles/linkActive.module.css";
import Link from "next/link";
import {
  ApiOutlined,
  BookOutlined,
  HomeOutlined,
  LoginOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useModalStore } from "../../src/store/store-client";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  setActiveSection,
}) => {
  const showModal = useModalStore((state) => state.showModal);

  console.log(activeSection);

  return (
    <div className={styles.sbContainer}>
      <div className={styles.sbLogo}>
        <Image src="/images/logo.png" width={160} height={40} alt={""} />
      </div>

      <div className={styles.sb__linksContainer}>
        <div className={styles.sb__topContainer}>
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
          <a>
            <div className={styles.sbIcon}>
              <ApiOutlined style={{ paddingRight: "10px", fontSize: "20px" }} />
            </div>
            <div>Highlights</div>
          </a>
          <a>
            <div className={styles.sbIcon}>
              <SearchOutlined
                style={{ paddingRight: "10px", fontSize: "20px" }}
              />
            </div>
            <div>Search</div>
          </a>
        </div>

        <div className={styles.sb__btmContainer}>
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
          <a>
            <div className={styles.sbIcon}>
              <QuestionCircleOutlined
                style={{ paddingRight: "10px", fontSize: "20px" }}
              />
            </div>
            <div>Help & Support</div>
          </a>
          <a onClick={() => showModal}>
            <div className={styles.sbIcon}>
              <LoginOutlined
                style={{ paddingRight: "10px", fontSize: "20px" }}
              />
            </div>
            <div>Login</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
