import React, { useState } from "react";
import Nav from "../components/for-you/Nav";
import styles from "../styles/for-you.module.css";
import Sidebar from "../components/for-you/Sidebar";
import SelectedBooks from "../components/for-you/SelectedBooks";
import RecommendedBooks from "../components/for-you/RecommendedBooks";
import SuggestedBooks from "../components/for-you/SuggestedBooks";
import { useRouter } from "next/router";
import Library from "./library";
import Settings from "./settings";
import BookPage, { BookDetails } from "./book/[id]";
import axios from "axios";

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

  const router = useRouter();

  const handleBookClick = async (id: string) => {
    try {
      const response = await axios.get(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
      );

      setSelectedBook(response.data);
    } catch (error) {
      console.error(`Failed to fetch book with id: ${id}`, error);
    }
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
          ) : selectedBook ? (
            <BookDetails
              {...selectedBook}
              close={() => setSelectedBook(null)}
            />
          ) : (
            <>
              <SelectedBooks
                handleBookClick={handleBookClick}
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
                onClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
              <RecommendedBooks
                handleBookClick={handleBookClick}
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
              />
              <SuggestedBooks
                handleBookClick={handleBookClick}
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
