import Nav from "../../components/for-you/Nav";
import Sidebar from "../../components/for-you/Sidebar";
import styles from "..//..//styles/for-you.module.css";
import { useEffect, useState } from "react";
import Library from "../library";
import Settings from "../settings";
import PlayerDetails from "../../components/UI/PlayerDetails";
import { useStore } from "../../src/store/store-client";
import { Router } from "next/router";
import { fetchBookDetails } from "../../src/utils/fetchBookDetails";
import { Book } from "../../types/Book";

interface BookPlayerProps {
  author: string;
  title: string;
  subTitle: string;
  content: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
  id: string;
  book: Book;
  close: () => void;
  duration: number;
}

const BookPlayer: React.FC<{ book: BookPlayerProps }> = ({ book }) => {
  const [activeSection, setActiveSection] = useState("for-you");

  const loading = useStore((state) => state.loading);
  const setLoading = useStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(false);

    const handleStart = () => {
      setLoading(true);
    };
    const handleComplete = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);

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
            <PlayerDetails
              id={""}
              title={""}
              summary={""}
              author={""}
              subTitle={""}
              imageLink={""}
              audioLink={""}
              totalRating={0}
              averageRating={0}
              keyIdeas={0}
              type={""}
              status={""}
              subscriptionRequired={false}
              tags={[]}
              bookDescription={""}
              authorDescription={""}
              book={book}
              loading={loading}
              duration={0}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default BookPlayer;

export const getServerSideProps = fetchBookDetails;
