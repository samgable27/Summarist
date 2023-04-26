import React from "react";
import styles from "../styles/settings.module.css";

interface SettingsProps {
  children?: React.ReactNode;
}

const Settings: React.FC<SettingsProps> = () => {
  return (
    <div className="container">
      <div className="row">
        <div className={styles.settingWrapper}>
          <div className={styles.sectionTitle}>Settings</div>
          <div className={styles.settingContentTop}>
            <h2>Your Subscription Plan</h2>
            <p>Basic</p>
            <button>Upgrade to Premium</button>
          </div>
          <div className={styles.settingContentBtm}>
            <h2>Email</h2>
            <p>youremail@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
