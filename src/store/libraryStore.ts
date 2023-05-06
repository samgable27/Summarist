import { create } from "zustand";
import { Book } from "../../types/Book";
import { useEffect, useState } from "react";

interface LibraryStore {
  books: Book[];
  addBook: (book: Book) => void;
  removeBook: (bookId: string) => void;
  hydrate: () => void;
  isBookInLibrary: (bookId: string) => boolean;
}

const persistedLibraryState = () => {
  if (typeof window !== "undefined") {
    const persistedLibraryState = localStorage.getItem("library-storage");
    return persistedLibraryState ? JSON.parse(persistedLibraryState).books : [];
  }

  return [];
};

export const useLibraryStore = create<LibraryStore>((set, get) => ({
  books: [],
  addBook: (book) => {
    if (typeof window !== "undefined") {
      const { books } = get();
      if (!books.some((b) => b.id === book.id)) {
        localStorage.setItem(
          "library-storage",
          JSON.stringify({ books: [...books, book] })
        );
        set((state) => ({ books: [...state.books, book] }));
      }
    }
  },
  removeBook: (bookId) => {
    set((state) => {
      const updatedBooks = state.books.filter((book) => book.id !== bookId);
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "library-storage",
          JSON.stringify({ books: updatedBooks })
        );
      }
      return { books: updatedBooks };
    });
  },
  isBookInLibrary: (bookId) => {
    const { books } = get();
    return books.some((book) => book.id === bookId);
  },
  hydrate: () => {
    const persistedState = persistedLibraryState();
    if (persistedState.length > 0) {
      set({ books: persistedState });
    }
  },
}));
