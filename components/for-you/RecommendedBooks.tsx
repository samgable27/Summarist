import React, { useEffect, useRef, useState } from "react";
import BookCard from "../UI/BookCard";
import axios from "axios";
import styles from "..//../styles/for-you.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
interface RecommendedBooks {
  id: string;
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
  selectedBookQuery: () => void;
  onClick?: () => void;
  handleBookClick: (id: string) => void;
  recommendedBookQuery: () => void;
  duration: number;
}

const RecommendedBooks: React.FC<RecommendedBooks> = ({ handleBookClick }) => {
  useEffect(() => {
    recommendedBookQuery();
  }, []);

  // loading states & data object
  const [recommendedBooks, setRecommendedBooks] = useState<RecommendedBooks[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  // giving user ability to scroll through books
  const containerRef = useRef<HTMLDivElement>(null);
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!containerRef.current) return;

    if (e.key === "ArrowRight") {
      containerRef.current.scrollBy({ left: 50, behavior: "smooth" });
    } else if (e.key === "ArrowLeft") {
      containerRef.current.scrollBy({ left: -50, behavior: "smooth" });
    }
  };

  // adding and removing event listeners on mount and unmount
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const recommendedBookQuery = async () => {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
    );
    setRecommendedBooks(data);
    setLoading(false);
  };

  return (
    <div className={styles.recommendedContainer}>
      <div className={styles.recBooksHeader}>
        <h1 className={styles.sbHeader}>Recommended For You</h1>
        <p>We think you'll like these</p>
      </div>
      <div className={styles.rbContainer}>
        {loading
          ? new Array(8)
              .fill(0)
              .map((_, i) => <Skeleton key={i} width={195} height={375} />)
          : recommendedBooks.map((book, id) => (
              <div key={id} onClick={() => handleBookClick(book.id.toString())}>
                <BookCard
                  id={""}
                  subscriptionRequired={false}
                  imageLink={""}
                  title={""}
                  author={""}
                  subTitle={""}
                  averageRating={0}
                  book={book}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default RecommendedBooks;
