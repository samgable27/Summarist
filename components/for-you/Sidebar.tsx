import Image from "next/image";
import React from "react";
import styles from "..//../styles/sidebar.module.css";
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

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className={styles.sbContainer}>
      <div className={styles.sbLogo}>
        <Image src="/images/logo.png" width={160} height={40} alt={""} />
      </div>
      <div className={styles.sb__linksContainer}>
        <div className={styles.sb__topContainer}>
          <Link href="/for-you" legacyBehavior>
            <a>
              {/* <div className={styles.sb__linkActive}></div> */}
              <div className={styles.sbIcon}>
                <HomeOutlined
                  style={{ paddingRight: "10px", fontSize: "20px" }}
                />
              </div>
              <div>For You</div>
            </a>
          </Link>
          <Link href="/for-you" legacyBehavior>
            <a>
              <div className={styles.sbIcon}>
                <BookOutlined
                  style={{ paddingRight: "10px", fontSize: "20px" }}
                />
              </div>
              <div>My Library</div>
            </a>
          </Link>
          <Link href="/for-you" legacyBehavior>
            <a>
              <div className={styles.sbIcon}>
                <ApiOutlined
                  style={{ paddingRight: "10px", fontSize: "20px" }}
                />
              </div>
              <div>Highlights</div>
            </a>
          </Link>
          <Link href="/for-you" legacyBehavior>
            <a>
              <div className={styles.sbIcon}>
                <SearchOutlined
                  style={{ paddingRight: "10px", fontSize: "20px" }}
                />
              </div>
              <div>Search</div>
            </a>
          </Link>
        </div>

        <div className={styles.sb__btmContainer}>
          <Link href="/for-you" legacyBehavior>
            <a>
              <div className={styles.sbIcon}>
                <SettingOutlined
                  style={{ paddingRight: "10px", fontSize: "20px" }}
                />
              </div>
              <div>Settings</div>
            </a>
          </Link>
          <Link href="/for-you" legacyBehavior>
            <a>
              <div className={styles.sbIcon}>
                <QuestionCircleOutlined
                  style={{ paddingRight: "10px", fontSize: "20px" }}
                />
              </div>
              <div>Help & Support</div>
            </a>
          </Link>
          <Link href="/for-you" legacyBehavior>
            <a>
              <div className={styles.sbIcon}>
                <LoginOutlined
                  style={{ paddingRight: "10px", fontSize: "20px" }}
                />
              </div>
              <div>Login</div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
