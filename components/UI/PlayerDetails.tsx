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
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import AudioPlayer from "./AudioPlayer";

interface PlayerDetailProps {
  subscriptionRequired?: boolean;
  title: string;
  summary: string;
  id: string | string[] | undefined;
}

const PlayerDetails: React.FC<PlayerDetailProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [book, setBook] = useState<PlayerDetailProps | null>(null);
  const router = useRouter();

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
    router.push("/for-you");
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
          title={""}
          author={""}
          imageLink={""}
          audioLink={""}
        />
      </span>
    </div>
  );
};

export default PlayerDetails;
