import React from "react";
import RecommendedBooks from "../for-you/RecommendedBooks";
import Image from "next/image";
import styles from "..//../styles/for-you.module.css";
import ClockCircleOutlined from "@ant-design/icons/lib/icons/ClockCircleOutlined";
import StarOutlined from "@ant-design/icons/lib/icons/StarOutlined";
import SubscriptionPill from "./SubscriptionPill";
import SuggestedBooks from "../for-you/SuggestedBooks";
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
            <div>03:24</div>
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
