import React, { useEffect, useState } from "react";
import bookStyles from "..//..//styles/bookDetails.module.css";
import Image from "next/image";
import {
  AudioOutlined,
  BookOutlined,
  BulbOutlined,
  ClockCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";

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

const BookDetails: React.FC<BookProps> = ({ book }) => {
  return (
    <div className="row">
      <div className="container">
        <div className={bookStyles.wrapper}>
          <div className={bookStyles.content}>
            <h1>{book.title}</h1>
            <p>{book.author}</p>
            <div className={bookStyles.subTitle}>{book.subTitle}</div>
            <div className={bookStyles.miscWrapper}>
              <div className={bookStyles.miscDescription}>
                <div>
                  <figure>
                    <StarOutlined />
                  </figure>
                  <span>
                    {book.averageRating} ({book.totalRating} ratings)
                  </span>
                </div>
                <div>
                  <figure>
                    <ClockCircleOutlined />
                  </figure>
                  <span> 03:23</span>
                </div>
                <div>
                  <figure>
                    <AudioOutlined />
                  </figure>
                  <span>{book.type}</span>
                </div>
                <div>
                  <figure>
                    <BulbOutlined />
                  </figure>
                  <span>{book.keyIdeas} key ideas</span>
                </div>
              </div>
            </div>
            <div className={bookStyles.readBtnWrapper}>
              <div>
                <button>
                  <div>
                    <BookOutlined />
                  </div>
                  <span>Read</span>
                </button>
              </div>
              <div>
                <button>
                  <div>
                    <AudioOutlined />
                  </div>
                  <span>Listen</span>
                </button>
              </div>
            </div>
            <div>
              <h2>Add title to My Library</h2>
            </div>
            <div className={bookStyles.tagsWrapper}>
              <span>Productivity</span>
              <span>Personal Development</span>
            </div>

            <div className={bookStyles.descWrapper}>
              <div>{book.bookDescription}</div>
              <div>{book.authorDescription}</div>
            </div>
          </div>
          <div className={bookStyles.bookImage}>
            <figure className={bookStyles.figure}>
              <Image src={book.imageLink} width={300} height={300} alt={""} />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
