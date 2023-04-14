import React, { useEffect, useState } from "react";
import styles from "..//../styles/for-you.module.css";
import axios from "axios";
import BookCard from "../UI/BookCard";
interface RecommendedBooks {
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
}

const RecommendedBooks: React.FC<RecommendedBooks> = () => {
  const [recommendedBooks, setRecommendedBooks] = useState<RecommendedBooks[]>(
    []
  );

  useEffect(() => {
    recommendedBookQuery();
  }, []);

  const recommendedBookQuery = async () => {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
    );
    setRecommendedBooks(data);

    console.log(data);
  };
  return (
    <div>
      <div className={styles.recBooksHeader}>
        <h1 className={styles.sbHeader}>Recommended For You</h1>
        <p>We think you'll like these</p>
      </div>
      <div className={styles.rbContainer}>
        {recommendedBooks.map((book, id) => (
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

export default RecommendedBooks;
