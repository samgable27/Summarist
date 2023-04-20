import React, { useEffect, useState } from "react";
import Nav from "../components/for-you/Nav";
import styles from "../styles/for-you.module.css";
import Sidebar from "../components/for-you/Sidebar";
import SelectedBooks from "../components/for-you/SelectedBooks";
import RecommendedBooks from "../components/for-you/RecommendedBooks";
import SuggestedBooks from "../components/for-you/SuggestedBooks";
import { useRouter } from "next/router";
import Library from "./library";
import Settings from "./settings";
import BookDetails from "../components/for-you/BookDetails";

interface ForYouProps {
  children?: React.ReactNode;
  id: string;
  content: string;
  author: string;
  title: string;
  subTitle: string;
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
  close: () => void;
  onClick: () => void;
}

const ForYou: React.FC<ForYouProps> = () => {
  const [activeSection, setActiveSection] = useState("for-you");
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const router = useRouter();
  const { id } = router.query;

  // useEffect(() => {
  //   if (router.asPath.includes("/book/")) {
  //     const bookId = router.asPath.split("/book/")[1];
  //     handleBookClick(bookId);
  //   } else {
  //     setSelectedBook(null);
  //   }
  // }, [router.asPath]);

  const handleBookClick = (id: string) => {
    router.push(`/book/${id}`, undefined, { shallow: true });
  };

  const handleCloseBookDetails = () => {
    setSelectedBook(null);
  };

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
            <Library />
          ) : activeSection === "settings" ? (
            <Settings />
          ) : id ? (
            <BookDetails id={id} />
          ) : (
            <>
              <SelectedBooks handleBookClick={handleBookClick} />
              <RecommendedBooks handleBookClick={handleBookClick} />
              <SuggestedBooks handleBookClick={handleBookClick} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ForYou;
