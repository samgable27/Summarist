import React, { useEffect, useRef, useState } from "react";
import bookStyles from "..//..//styles/bookDetails.module.css";
import Image from "next/image";
import {
  PauseCircleOutlined,
  PlayCircleOutlined,
  RedoOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SpinIcon from "./SpinIcon";

interface AudioPlayerProps {
  title: string;
  author: string;
  imageLink: string;
  audioLink: string;
  book: any;
  loading: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  book,
  audioLink,
  loading,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(new Audio(book?.audioLink));

  // runs when audioLink changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio(book?.audioLink);
      audioRef.current = audio;

      audio.addEventListener("timeupdate", () =>
        setCurrentTime(audio.currentTime)
      );
      audio.addEventListener("loadedmetadata", () =>
        setDuration(audio.duration)
      );
      audio.addEventListener("ended", () => setIsPlaying(false));

      return () => {
        audio.removeEventListener("timeupdate", () =>
          setCurrentTime(audio.currentTime)
        );
        audio.removeEventListener("loadedmetadata", () =>
          setDuration(audio.duration)
        );
        audio.removeEventListener("ended", () => setIsPlaying(false));
      };
    }
  }, [audioLink]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skip = (seconds: number) => {
    audioRef.current.currentTime += seconds;
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(event.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={bookStyles.audioWrapper}>
      <div className={bookStyles.audioTrack__wrapper}>
        {loading ? (
          <Skeleton
            containerClassName={bookStyles.audioWrapper}
            style={{
              backgroundColor: "#bfc8d6",
            }}
            width={1200}
            height={48}
          />
        ) : (
          <>
            <figure>
              <Image src={book?.imageLink} width={48} height={48} alt={""} />
            </figure>
            <div className={bookStyles.audioTrackDetails__wrapper}>
              <span>{book?.title}</span>
              <div>{book?.author}</div>
            </div>
          </>
        )}
      </div>
      <div className={bookStyles.audioCtrl__wrapper}>
        <div onClick={() => skip(-10)}>
          <UndoOutlined className={bookStyles.skip} />
        </div>
        <div onClick={togglePlay}>
          {isPlaying ? (
            <PauseCircleOutlined className={bookStyles.pause} />
          ) : (
            <PlayCircleOutlined className={bookStyles.play} />
          )}
        </div>
        <div onClick={() => skip(10)}>
          <RedoOutlined className={bookStyles.skip} />
        </div>
      </div>
      <div className={bookStyles.audioPrg__wrapper}>
        <div>{formatTime(currentTime)}</div>
        <input
          className={bookStyles.prgBar}
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSliderChange}
          step="any"
        />
        <div>{loading ? <SpinIcon /> : formatTime(duration)}</div>
      </div>
    </div>
  );
};

export default AudioPlayer;
