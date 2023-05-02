import React, { useEffect, useState } from "react";
import bookStyles from "..//..//styles/bookDetails.module.css";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import AudioPlayer from "./AudioPlayer";
import { useAudioPlayerStore } from "../../src/store/audioPlayerStore";
import { Book } from "../../types/Book";

interface PlayerDetailProps {
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
  loading: boolean;
  book: Book;
}

const PlayerDetails: React.FC<PlayerDetailProps> = ({ loading, book }) => {
  const isAudioPlayerPresent = useAudioPlayerStore(
    (state) => state.isAudioPlayerPresent
  );

  const setIsAudioPlayerPresent = useAudioPlayerStore(
    (state) => state.setIsAudioPlayerPresent
  );

  const router = useRouter();
  const { id } = router.query;

  const handleBackClick = () => {
    setIsAudioPlayerPresent(!isAudioPlayerPresent);
    router.push(`/book/${id}`);
  };

  return (
    <div className={bookStyles.playerWrapper}>
      <div className={bookStyles.playerContent}>
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
        <div className={bookStyles.playerTitle}>
          {loading ? (
            <Skeleton width={250} height={30} />
          ) : book?.subscriptionRequired ? (
            `${book?.title} (Premium)`
          ) : (
            book?.title
          )}
        </div>
        <div className={bookStyles.summaryWrapper}>{book?.summary}</div>
      </div>
      <div>
        <AudioPlayer
          book={book}
          title={book?.title}
          author={book?.author}
          imageLink={book?.imageLink}
          audioLink={book?.audioLink}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default PlayerDetails;
