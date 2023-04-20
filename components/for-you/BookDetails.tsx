import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface BookProps {
  author?: string;
  title?: string;
  subTitle?: string;
  content?: string;
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
  id: string | string[] | undefined;
  close?: () => void;
}

const BookDetails: React.FC<BookProps> = ({
  title,
  author,
  subTitle,
  averageRating,
  totalRating,
  keyIdeas,
  type,
  tags,
  bookDescription,
  authorDescription,
  content,
  imageLink,
  id,
}) => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (id) {
      fetchBookData(id);
    }
  }, [id]);

  const fetchBookData = async (bookId: string | string[]) => {
    try {
      const response = await axios.get(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`
      );
      setBook(response.data);

      console.log(book);
    } catch (error) {
      console.error(`Failed to fetch book with id: ${bookId}`, error);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default BookDetails;
