import React, { useEffect, useState } from "react";
import bookStyles from "..//..//styles/bookDetails.module.css";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import AudioPlayer from "./AudioPlayer";
import { useAudioPlayerStore } from "../../src/store/audioPlayerStore";

interface PlayerDetailProps {
  subscriptionRequired?: boolean;
  title?: string;
  summary?: string;
  id?: string | string[] | undefined;
  audioLink?: string;
  author?: string;
  imageLink?: string;
}

const PlayerDetails: React.FC<PlayerDetailProps> = () => {
  useEffect(() => {
    fetchBookData();
  }, []);

  const [loading, setLoading] = useState<boolean>(false);
  const [book, setBook] = useState<PlayerDetailProps | null>(null);

  const isAudioPlayerPresent = useAudioPlayerStore(
    (state) => state.isAudioPlayerPresent
  );

  const setIsAudioPlayerPresent = useAudioPlayerStore(
    (state) => state.setIsAudioPlayerPresent
  );

  const router = useRouter();
  const { id } = router.query;

  const fetchBookData = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );

    setBook(data);
    setLoading(false);
  };

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
      <span>
        <AudioPlayer
          book={book}
          title={book?.title}
          author={book?.author}
          imageLink={book?.imageLink}
          audioLink={book?.audioLink}
          loading={loading}
        />
      </span>
    </div>
  );
};

export default PlayerDetails;
