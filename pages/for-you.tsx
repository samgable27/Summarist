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
import axios from "axios";

interface ForYouProps {
  children?: React.ReactNode;
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
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [book, setBook] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  const fetchBookData = async (bookId: string | string[]) => {
    try {
      const { data } = await axios.get(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`
      );
      setBook(data);
    } catch (error) {
      console.error(`Failed to fetch book with id: ${bookId}`, error);
    }
  };

  const handleBookClick = (id: string) => {
    fetchBookData(id);
    setSelectedBookId(id);
    // router.push(`/book/${id}`, undefined, { shallow: true });
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
          ) : selectedBookId ? (
            <BookDetails id={selectedBookId} book={book} />
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
