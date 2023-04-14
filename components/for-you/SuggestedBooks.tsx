import React, { useEffect, useRef, useState } from "react";
import BookCard from "../UI/BookCard";
import axios from "axios";
import styles from "..//../styles/for-you.module.css";
interface SuggestedBooks {
  id: string;
  subscriptionRequired: boolean;
  imageLink: string;
  title: string;
  author: string;
  subTitle: string;
  averageRating: number;
  audioLink: string;
  totalRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
  recommendedBookQuery: () => void;
  suggestedBookQuery: () => void;
}

const SuggestedBooks: React.FC<SuggestedBooks> = () => {
  const [suggestedBooks, setSuggestedBooks] = useState<SuggestedBooks[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!containerRef.current) return;

    if (e.key === "ArrowRight") {
      containerRef.current.scrollBy({ left: 50, behavior: "smooth" });
    } else if (e.key === "ArrowLeft") {
      containerRef.current.scrollBy({ left: -50, behavior: "smooth" });
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    suggestedBookQuery();
  }, []);

  const suggestedBookQuery = async () => {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
    );
    setSuggestedBooks(data);

    console.log(data);
  };

  return (
    <div className={styles.recommendedContainer}>
      <div className={styles.recBooksHeader}>
        <h1 className={styles.sbHeader}>Suggested Books</h1>
        <p>We think you'll like these</p>
      </div>
      <div className={styles.rbContainer}>
        {suggestedBooks.map((book, id) => (
          <BookCard
            key={id}
            id={""}
            subscriptionRequired={false}
            imageLink={""}
            title={""}
            author={""}
            subTitle={""}
            averageRating={0}
            book={book}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestedBooks;
