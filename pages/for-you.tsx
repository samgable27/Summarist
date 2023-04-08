import React from "react";
import Nav from "../components/for-you/Nav";
import styles from "../styles/for-you.module.css";
import Sidebar from "../components/for-you/Sidebar";

interface ForYouProps {
  children?: React.ReactNode;
}

const ForYou: React.FC<ForYouProps> = () => {
  return (
    <section>
      <header className={styles.navContainer}>
        <Nav />
      </header>
      <Sidebar />
    </section>
  );
};

export default ForYou;
