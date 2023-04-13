import React, { useEffect, useState } from "react";
import styles from "..//../styles/for-you.module.css";
import axios from "axios";
import Image from "next/image";
import { PlayCircleOutlined } from "@ant-design/icons";

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
  const [selectedBooks, setSelectedBooks] = useState<SelectedBook[]>([]);

  const selectedBookQuery = async () => {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
    );

    setSelectedBooks(data);
  };

  useEffect(() => {
    selectedBookQuery();
  }, []);

  return (
    <div className={styles.sbContainer}>
      <div>
        <h1 className={styles.sbHeader}>Selected just for you</h1>
      </div>
      {selectedBooks.map((book, id) => (
        <div key={id} className={styles.sbInfo}>
          <div className={styles.sbSubtitle}>{book.subTitle}</div>
          <div className={styles.sbLine}></div>
          <Image
            className={styles.sbImage}
            src={book.imageLink}
            alt={""}
            width={100}
            height={100}
          />
          <div className={styles.authorInfo}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <div className={styles.sbAudio}>
              <PlayCircleOutlined
                style={{
                  fontSize: "40px",
                  color: "#000",
                  opacity: "0.8",
                }}
                className={styles.playCircle}
              />
              <div>3 mins 23 secs</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectedBooks;
