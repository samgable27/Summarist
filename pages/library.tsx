import React, { useEffect, useState } from "react";
import libStyles from "../styles/library.module.css";
import navStyles from "../styles/for-you.module.css";
import styles from "../styles/settings.module.css";

import LoginModal from "../components/auth/LoginModal";
import Image from "next/image";
import Nav from "../components/for-you/Nav";
import Sidebar from "../components/for-you/Sidebar";
import { useRouter } from "next/router";
import { useModalStore } from "../src/store/store-client";
import { useLibraryStore } from "../src/store/libraryStore";
import BookCard from "../components/UI/BookCard";
import Link from "next/link";
import { DeleteOutlined } from "@ant-design/icons";

interface LibraryProps {
  children?: React.ReactNode;
  content: string;
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
  close: () => void;
  onClick: () => void;
}

const Library: React.FC<LibraryProps> = () => {
  const { isAuthenticated } = useModalStore();
  const showModal = useModalStore((state) => state.showModal);
  const [activeSection, setActiveSection] = useState("My Library");
  const [isMounted, setIsMounted] = useState(false);
  const hydrate = useLibraryStore((state) => state.hydrate);

  const books = useLibraryStore((state) => state.books);

  const { removeBook } = useLibraryStore();

  const { isBookInLibrary } = useLibraryStore();
  const router = useRouter();

  const handleBookClick = (id: string) => {
    router.push(`/book/${id}`, undefined, { shallow: true });
  };

  // hydrate library state with books from zustand store
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // state variable indicating whether component is mounted on client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <section>
        <header className={navStyles.navContainer}>
          <Nav />
          <Sidebar
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            setActiveSection={(section: string) => setActiveSection(section)}
            activeSection={activeSection}
            showModal={function (): void {
              throw new Error("Function not implemented.");
            }}
            close={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </header>
      </section>
      {isMounted && !isAuthenticated ? (
        <div className={styles.loginWrapper}>
          <figure>
            <Image src={"/images/login.png"} alt="" width={460} height={320} />
          </figure>
          <h1>Log in to your account to see your details.</h1>
          <button className="btn home__cta--btn" onClick={showModal}>
            Login
          </button>
          <LoginModal />
        </div>
      ) : (
        <div className="row">
          <div className="container">
            <div className={libStyles.libWrapper}>
              <div className={libStyles.libHeader}>
                <span>Saved Books</span>
                <p>0 items</p>
              </div>
              {books.length === 0 ? (
                <div className={libStyles.libBlockWrapper}>
                  <h2>Save your favorite books!</h2>
                  <p>When you save a book, it will appear here.</p>
                </div>
              ) : (
                <div className={libStyles.bookSaved}>
                  {books?.map((book, index) => (
                    <div key={index}>
                      {isBookInLibrary && (
                        <DeleteOutlined
                          style={{}}
                          onClick={(event) => {
                            event.stopPropagation();
                            removeBook(book.id);
                          }}
                        />
                      )}
                      <div onClick={() => router.push(`/book/${book.id}`)}>
                        <BookCard
                          id={book.id}
                          subscriptionRequired={false}
                          imageLink={""}
                          title={""}
                          author={""}
                          subTitle={""}
                          averageRating={0}
                          book={book}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className={libStyles.libHeader}>
                <span>Finished</span>
                <p>0 items</p>
              </div>
              <div className={libStyles.libBlockWrapper}>
                <h2>Done and dusted!</h2>
                <p>When you finish a book, you can find it here later.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Library;
