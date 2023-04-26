import { create } from "zustand";

type AudioPlayerState = {
  isAudioPlayerPresent: boolean;
  setIsAudioPlayerPresent: (value: boolean) => void;
};

export const useAudioPlayerStore = create<AudioPlayerState>((set) => ({
  isAudioPlayerPresent: false,
  setIsAudioPlayerPresent: (value) => set({ isAudioPlayerPresent: value }),
}));
