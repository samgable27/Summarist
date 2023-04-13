import React, { useEffect, useState } from "react";
import styles from "..//../styles/for-you.module.css";
import axios from "axios";

interface SelectedBook {
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
}

const SelectedBooks: React.FC<SelectedBook> = () => {
  const [selectedBook, setSelectedBook] = useState<SelectedBook[]>([]);

  const selectedBookQuery = async () => {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
    );
  };

  useEffect(() => {
    selectedBookQuery();
  }, []);

  return (
    <div className={styles.sbContainer}>
      <div>
        <h1 className={styles.sbHeader}>Selected just for you</h1>
      </div>
      <div className={styles.sbInfo}></div>
    </div>
  );
};

export default SelectedBooks;
