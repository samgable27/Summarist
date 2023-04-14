import React, { useState } from "react";
import Nav from "../components/for-you/Nav";
import styles from "../styles/for-you.module.css";
import Sidebar from "../components/for-you/Sidebar";
import SelectedBooks from "../components/for-you/SelectedBooks";
import RecommendedBooks from "../components/for-you/RecommendedBooks";
import SuggestedBooks from "../components/for-you/SuggestedBooks";
import { useRouter } from "next/router";
import Library from "./Library";
import Settings from "./Settings";

interface ForYouProps {
  children?: React.ReactNode;
}

const ForYou: React.FC<ForYouProps> = () => {
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
        />
      </header>
      <div className="row">
        <div className="fy--container">
          {activeSection === "My Library" ? (
            <Library />
          ) : activeSection === "settings" ? (
            <Settings />
          ) : (
            <>
              <SelectedBooks
                id={""}
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
                selectedBookQuery={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
              <RecommendedBooks
                id={""}
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
                recommendedBookQuery={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
              <SuggestedBooks
                id={""}
                subscriptionRequired={false}
                imageLink={""}
                title={""}
                author={""}
                subTitle={""}
                averageRating={0}
                audioLink={""}
                totalRating={0}
                keyIdeas={0}
                type={""}
                status={""}
                summary={""}
                tags={[]}
                bookDescription={""}
                authorDescription={""}
                recommendedBookQuery={function (): void {
                  throw new Error("Function not implemented.");
                }}
                suggestedBookQuery={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ForYou;
