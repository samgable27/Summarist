import React from "react";

interface AudioPlayerProps {
  title: string;
  author: string;
  imageLink: string;
  audioLink: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = () => {
  return <div>AudioPlayer</div>;
};

export default AudioPlayer;
