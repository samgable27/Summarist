import { create } from "zustand";

type AudioPlayerState = {
  duration: number;
  setDuration: (duration: number) => void;
  isAudioPlayerPresent: boolean;
  setIsAudioPlayerPresent: (value: boolean) => void;
  setLoading: (loading: boolean) => void;
  isLoading: boolean;
};

export const useAudioPlayerStore = create<AudioPlayerState>((set) => ({
  duration: 0,
  isLoading: true,
  setLoading: (loading) => set({ isLoading: loading }),
  setDuration: (duration) => set({ duration }),
  isAudioPlayerPresent: false,
  setIsAudioPlayerPresent: (value) => set({ isAudioPlayerPresent: value }),
}));
