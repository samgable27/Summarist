import React, { useEffect, useState } from "react";
import bookStyles from "..//..//styles/bookDetails.module.css";
import Image from "next/image";
import {
  AudioOutlined,
  BookOutlined,
  BulbOutlined,
  ClockCircleOutlined,
  LeftOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { useStore } from "zustand";
import { useAudioPlayerStore } from "../../src/store/audioPlayerStore";

interface BookDetailProps {
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

const BookDetails: React.FC<BookDetailProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [book, setBook] = useState<BookDetailProps | null>(null);

  const router = useRouter();

  const isAudioPlayerPresent = useAudioPlayerStore(
    (state) => state.isAudioPlayerPresent
  );

  const setIsAudioPlayerPresent = useAudioPlayerStore(
    (state) => state.setIsAudioPlayerPresent
  );

  const handleToggleAudioPlayer = () => {
    setIsAudioPlayerPresent(!isAudioPlayerPresent);
  };

  useEffect(() => {
    fetchBookData();
  }, []);

  const fetchBookData = async () => {
    const { id } = router.query;

    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );

    setBook(data);
    setLoading(false);
  };

  const handleBackClick = () => {
    if (isAudioPlayerPresent) {
      return setIsAudioPlayerPresent(!isAudioPlayerPresent);
    } else {
      setIsAudioPlayerPresent(false);
    }
    router.push("/for-you");
  };

  return (
    <div className={bookStyles.wrapper}>
      <div className={bookStyles.content}>
        <div
          style={{
            position: "relative",
          }}
          onClick={() => handleBackClick()}
        >
          <LeftOutlined
            style={{
              fontSize: "16px",
              cursor: "pointer",
              color: "grey",
              paddingBottom: "4px",
              position: "relative",
              top: "0",
              right: "30px",
            }}
          />
        </div>
        <h1>
          {loading ? (
            <Skeleton width={250} height={30} />
          ) : book?.subscriptionRequired ? (
            `${book?.title} (Premium)`
          ) : (
            book?.title
          )}
        </h1>
        <p>{loading ? <Skeleton width={80} height={20} /> : book?.author}</p>
        <div className={bookStyles.subTitle}>
          {loading ? <Skeleton width={550} height={30} /> : book?.subTitle}
        </div>
        <div className={bookStyles.miscWrapper}>
          {loading ? (
            <Skeleton height={50} width={300} />
          ) : (
            <div className={bookStyles.miscDescription}>
              <div>
                <figure>
                  <StarOutlined />
                </figure>
                <span>
                  {book?.averageRating} ({book?.totalRating} ratings)
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
                <span>{book?.type}</span>
              </div>
              <div>
                <figure>
                  <BulbOutlined />
                </figure>
                <span>{book?.keyIdeas} key ideas</span>
              </div>
            </div>
          )}
        </div>
        <div className={bookStyles.readBtnWrapper}>
          {loading ? (
            <Skeleton width={330} height={30} />
          ) : (
            <>
              <div onClick={handleToggleAudioPlayer}>
                <button onClick={() => router.push(`/player/${book.id}`)}>
                  <div>
                    <BookOutlined />
                  </div>
                  <span>Read</span>
                </button>
              </div>
              <div onClick={handleToggleAudioPlayer}>
                <button>
                  <div>
                    <AudioOutlined />
                  </div>
                  <span>Listen</span>
                </button>
              </div>
            </>
          )}
        </div>
        <div className={bookStyles.addToLibrary}>
          {loading ? (
            <Skeleton width={200} height={30} />
          ) : (
            <>
              <figure>
                <BookOutlined />
              </figure>
              <h2>Add title to My Library</h2>
            </>
          )}
        </div>
        {loading ? (
          <Skeleton
            style={{
              margin: "16px 0px 16px 0px",
            }}
            width={300}
            height={50}
          />
        ) : (
          <>
            <div>
              <h3>What's it about?</h3>
            </div>
            <div className={bookStyles.tagsWrapper}>
              <span>{book?.tags?.[0]}</span>
              {book?.tags?.[1] && <span>{book?.tags?.[1]}</span>}
            </div>
          </>
        )}
        <div className={bookStyles.descWrapper}>
          {loading ? (
            <Skeleton
              style={{
                margin: "16px 0px 16px 0px",
              }}
              width={725}
              height={200}
            />
          ) : (
            <div className={bookStyles.description}>
              {book?.bookDescription}
            </div>
          )}
          {loading ? (
            <Skeleton width={725} height={300} />
          ) : (
            <>
              <div>
                <h3>About the author</h3>
              </div>
              <div className={bookStyles.author}>{book?.authorDescription}</div>
            </>
          )}
        </div>
      </div>
      <div className={bookStyles.bookImage}>
        {loading ? (
          <Skeleton width={300} height={300} />
        ) : (
          <figure className={bookStyles.figure}>
            <Image src={book?.imageLink} width={300} height={300} alt={""} />
          </figure>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
