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
  book: any;
}

const BookDetails: React.FC<BookProps> = ({ id, book }) => {
  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.content}</p>
    </div>
  );
};

export default BookDetails;
