import React, { useEffect, useRef, useState } from "react";
import bookStyles from "..//..//styles/bookDetails.module.css";

interface AudioPlayerProps {
  title: string;
  author: string;
  imageLink: string;
  audioLink: string;
  book: any;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ book }) => {
  const [currentAudioIndex, setCurrentAudioIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const shiftAudio = (seconds: number) => {
    if (audioRef.current && Number.isFinite(audioRef.current.duration)) {
      const newTime = audioRef.current.currentTime + seconds;
      audioRef.current.currentTime = Math.max(
        0,
        Math.min(newTime, audioRef.current.duration)
      );
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
    }
  };

  const handleScrub = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPosition = parseFloat(event.target.value);
    if (audioRef.current && Number.isFinite(audioRef.current.duration)) {
      audioRef.current.currentTime =
        (newPosition * audioRef.current.duration) / 100;
    }
  };

  return (
    <div className={bookStyles.audioWrapper}>
      <audio
        src={book?.audioLinks?.[currentAudioIndex]}
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      <div className={bookStyles.audioTrack__wrapper}></div>
      <div className={bookStyles.audioCtrl__wrapper}></div>
      <div className={bookStyles.audioPrg__wrapper}></div>
      <button onClick={() => shiftAudio(-10)}>Back</button>
      <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
      <button onClick={() => shiftAudio(10)}>Forward</button>
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={progress}
        onChange={handleScrub}
      />
    </div>
  );
};

export default AudioPlayer;
