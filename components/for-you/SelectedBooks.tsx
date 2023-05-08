import React, { useEffect, useState } from "react";
import styles from "..//../styles/for-you.module.css";
import axios from "axios";
import Image from "next/image";
import { PlayCircleOutlined } from "@ant-design/icons";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/router";
import { Book } from "../../types/Book";

interface SelectedBook {
  id?: string;
  author?: string;
  title?: string;
  subTitle?: string;
  imageLink?: string;
  audioLink?: string;
  totalRating?: number;
  averageRating?: number;
  keyIdeas?: number;
  type?: string;
  status?: string;
  subscriptionRequired?: boolean;
  summary?: string;
  tags?: string[];
  bookDescription?: string;
  authorDescription?: string;
  selectedBookQuery?: () => void;
  onClick?: () => void;
  handleBookClick: (id: string) => void;
}

const SelectedBooks: React.FC<SelectedBook> = ({ handleBookClick }) => {
  const [selectedBooks, setSelectedBooks] = useState<SelectedBook[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    selectedBookQuery();
  }, []);

  const selectedBookQuery = async () => {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
    );
    setSelectedBooks(data);
    setLoading(false);
  };

  const fetchAudioDuration = async (audioLink: string) => {
    const audio = new Audio(audioLink);

    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };
  };

  useEffect(() => {
    if (selectedBooks.length > 0) {
      fetchAudioDuration(selectedBooks[0].audioLink);
    }
  }, [selectedBooks]);

  const formatTime = (time: number | null): string => {
    if (!time || isNaN(time)) {
      return "N/A";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const bookDuration = formatTime(duration);

  return (
    <div className={styles.sbContainer}>
      <div>
        <h1 className={styles.sbHeader}>Selected just for you</h1>
      </div>
      {loading ? (
        <Skeleton width={680} height={195} />
      ) : (
        selectedBooks.map((book, id) => (
          <div
            onClick={() => handleBookClick(book.id.toString())}
            key={id}
            className={styles.sbInfo}
          >
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
                    fontSize: "25px",
                    color: "#032b41",
                    opacity: "0.9",
                  }}
                  className={styles.playCircle}
                />
                <div>{bookDuration}</div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SelectedBooks;
