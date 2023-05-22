import React, { useEffect, useState } from "react";
import bookStyles from "..//..//styles/bookDetails.module.css";
import Image from "next/image";
import {
  AudioOutlined,
  BookFilled,
  BookOutlined,
  BulbOutlined,
  ClockCircleOutlined,
  LeftOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useAudioPlayerStore } from "../../src/store/audioPlayerStore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Book } from "../../types/Book";
import { useLibraryStore } from "../../src/store/libraryStore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import jwtDecode from "jwt-decode";

interface BookDetailProps {
  id: string;
  book: Book;
  close?: () => void;
  loading: boolean;
}

const BookDetails: React.FC<BookDetailProps> = ({ book, loading }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [stripeRole, setStripeRole] = useState<string | null>(null);

  const addBook = useLibraryStore((state) => state.addBook);

  const { isBookInLibrary, removeBook } = useLibraryStore();

  // fetching token on mount, decoding it and setting the stripeRole
  useEffect(() => {
    const fetchToken = async () => {
      if (user) {
        const token = await user.getIdToken(true);
        const decodedToken: any = jwtDecode(token);

        // saving to local storage
        localStorage.setItem("stripeRole", stripeRole);

        setStripeRole(decodedToken.stripeRole);
      }
    };

    fetchToken();
  }, [user]);

  // on mount read value from local storage
  useEffect(() => {
    const savedStripeRole = localStorage.getItem("stripeRole");
    if (savedStripeRole) {
      setStripeRole(savedStripeRole);
    }
  }, []);

  const isAudioPlayerPresent = useAudioPlayerStore(
    (state) => state.isAudioPlayerPresent
  );

  const setIsAudioPlayerPresent = useAudioPlayerStore(
    (state) => state.setIsAudioPlayerPresent
  );

  const handleToggleAudioPlayer = () => {
    setIsAudioPlayerPresent(!isAudioPlayerPresent);
  };

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

  const handleBackClick = () => {
    if (isAudioPlayerPresent) {
      setIsAudioPlayerPresent(!isAudioPlayerPresent);
    } else {
      setIsAudioPlayerPresent(false);
    }
    router.push("/for-you");
  };

  const handleAddToLibrary = () => {
    addBook(book);
  };

  const removeFromLibrary = () => {
    removeBook(book.id);
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
                <span>{bookDuration}</span>
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
                <button
                  onClick={() =>
                    stripeRole !== "premium" && stripeRole !== "premium_plus"
                      ? router.push("/choose-plan")
                      : router.push(`/player/${book.id}`)
                  }
                >
                  <div>
                    <BookOutlined />
                  </div>
                  <span>Read</span>
                </button>
              </div>
              <div onClick={handleToggleAudioPlayer}>
                <button
                  onClick={() =>
                    stripeRole !== "premium" && stripeRole !== "premium_plus"
                      ? router.push("/choose-plan")
                      : router.push(`/player/${book.id}`)
                  }
                >
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
            <div className={bookStyles.addToLib}>
              {isBookInLibrary(book.id) ? (
                <div onClick={removeFromLibrary}>
                  <figure>
                    <BookFilled
                      style={{
                        fontSize: "20px",
                      }}
                    />
                  </figure>
                  <a>Book added to My Library</a>
                </div>
              ) : (
                <div onClick={handleAddToLibrary}>
                  <figure>
                    <BookOutlined
                      style={{
                        fontSize: "20px",
                      }}
                    />
                  </figure>
                  <a>Add Book to My Library</a>
                </div>
              )}
            </div>
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
