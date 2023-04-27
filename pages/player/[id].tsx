import Nav from "../../components/for-you/Nav";
import Sidebar from "../../components/for-you/Sidebar";
import styles from "..//..//styles/for-you.module.css";
import { useState } from "react";
import Library from "../library";
import Settings from "../settings";
import PlayerDetails from "../../components/UI/PlayerDetails";

interface BookPlayerProps {
  title?: string;
  audioLink?: string;
  subscriptionRequired?: boolean;
  summary?: string;
  id: string | string[] | undefined;
  close?: () => void;
}

const BookPlayer: React.FC<{ book: BookPlayerProps }> = () => {
  const [activeSection, setActiveSection] = useState("for-you");

  return (
    <section>
      <header className={styles.navContainer}>
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
      <div className="row">
        <div className="fy--container">
          {activeSection === "My Library" ? (
            <Library
              content={""}
              author={""}
              title={""}
              subTitle={""}
              imageLink={""}
              audioLink={""}
              totalRating={0}
              averageRating={0}
              keyIdeas={0}
              type={""}
              status={""}
              subscriptionRequired={false}
              summary={""}
              tags={[]}
              bookDescription={""}
              authorDescription={""}
              close={function (): void {
                throw new Error("Function not implemented.");
              }}
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          ) : activeSection === "settings" ? (
            <Settings />
          ) : (
            <PlayerDetails id={""} title={""} summary={""} />
          )}
        </div>
      </div>
    </section>
  );
};

export default BookPlayer;
