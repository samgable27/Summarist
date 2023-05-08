import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "..//../styles/for-you.module.css";
import ClockCircleOutlined from "@ant-design/icons/lib/icons/ClockCircleOutlined";
import StarOutlined from "@ant-design/icons/lib/icons/StarOutlined";
import SubscriptionPill from "./SubscriptionPill";
import { Book } from "../../types/Book";

interface BookCardProps {
  id: string;
  subscriptionRequired: boolean;
  imageLink: string;
  title: string;
  author: string;
  subTitle: string;
  averageRating: number;
  book: Book;
}
const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [duration, setDuration] = useState<number | null>(null);

  const fetchAudioDuration = async (audioLink: string) => {
    const audio = new Audio(audioLink);

    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };
  };

  useEffect(() => {
    fetchAudioDuration(book?.audioLink);
  }, [book?.audioLink]);

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
    <div className={styles.bookCardContainer}>
      {book.subscriptionRequired && <SubscriptionPill />}
      <figure>
        <Image
          className={styles.rbImageLink}
          src={book.imageLink}
          alt={""}
          width={150}
          height={150}
        />
      </figure>
      <div className={styles.bookInfoContainer}>
        <div className={styles.rbTitle}>{book.title}</div>
        <div className={styles.rbAuthor}>{book.author}</div>
        <p>{book.subTitle}</p>
        <div className={styles.bookCardMisc}>
          <div className={styles.bookDetails}>
            <ClockCircleOutlined />
            <div>{bookDuration}</div>
          </div>
          <div className={styles.bookDetails}>
            <StarOutlined />
            <div>{book.averageRating}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
