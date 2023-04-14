import React from "react";
import styles from "..//../styles/for-you.module.css";

interface SubscriptionPillProps {}

const SubscriptionPill: React.FC<SubscriptionPillProps> = () => {
  return <div className={styles.subPill}>Premium</div>;
};

export default SubscriptionPill;
