import React from "react";
import Nav from "../components/for-you/Nav";
import styles from "../styles/for-you.module.css";
import Sidebar from "../components/for-you/Sidebar";
import SelectedBooks from "../components/for-you/SelectedBooks";
import RecommendedBooks from "../components/for-you/RecommendedBooks";

interface ForYouProps {
  children?: React.ReactNode;
}

const ForYou: React.FC<ForYouProps> = () => {
  return (
    <section className={styles.forYouContainer}>
      <header className={styles.navContainer}>
        <Nav />
      </header>
      <Sidebar
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        isActive={false}
      />
      <div className="row">
        <div className="container">
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
        </div>
      </div>
    </section>
  );
};

export default ForYou;
