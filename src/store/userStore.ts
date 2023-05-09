import { create } from "zustand";

interface UserStore {
  isAuthenticated: boolean;
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
  setIsAuthenticated: (auth: boolean) => void;
  isPremiumUser: boolean;
  setIsPremiumUser: (isPremium: boolean) => void;
  user: {
    id: string;
    isPremiumUser: boolean;
  } | null;
  setUser: (user: { id: string; isPremiumUser: boolean } | null) => void;
  subscriptionTier: "basic" | "premium" | "premium_plus";
  setSubscriptionTier: (tier: "basic" | "premium" | "premium_plus") => void;
}

const persistedEmailState = () => {
  if (typeof window !== "undefined") {
    const persistedEmailState = localStorage.getItem("user-storage");
    return persistedEmailState
      ? JSON.parse(persistedEmailState).userEmail
      : false;
  }
  return false;
};

const persistedUserState = () => {
  if (typeof window !== "undefined") {
    const persistedUserState = localStorage.getItem("user");
    return persistedUserState ? JSON.parse(persistedUserState).user : false;
  }
  return false;
};

export const useStore = create<UserStore>((set) => ({
  user: persistedUserState(),
  isAuthenticated: false,
  subscriptionTier: "basic",
  userEmail: persistedEmailState(),
  isPremiumUser: false,
  setUserEmail: (email) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "user-storage",
        JSON.stringify({ userEmail: email })
      );
    }
    set({ userEmail: email });
  },
  setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),
  setIsPremiumUser: (isPremium) => set({ isPremiumUser: isPremium }),
  setSubscriptionTier: (tier) => set({ subscriptionTier: tier }),
  setUser: (user) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify({ user: user }));
    }
    set({ user: user });
  },
}));
