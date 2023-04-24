import axios from "axios";
import { GetServerSideProps } from "next";
import BookDetails from "../../components/UI/BookDetails";
import Nav from "../../components/for-you/Nav";
import Sidebar from "../../components/for-you/Sidebar";
import styles from "..//..//styles/for-you.module.css";
import { useState } from "react";
import Library from "../library";
import Settings from "../settings";

interface BookProps {
  author?: string;
  title?: string;
  subTitle?: string;
  content?: string;
  imageLink?: string;
  audioLink?: string;
  totalRating?: number;
  averageRating?: number;
  keyIdeas?: number;
  type?: string;
  status?: string;
  subscriptionRequired?: boolean;
  summary?: string;
  tags?: string[];
  bookDescription?: string;
  authorDescription?: string;
  id: string | string[] | undefined;
  close?: () => void;
  book: any;
}

const BookDetailsWrapper: React.FC<{ book: BookProps }> = ({ book }) => {
  const [activeSection, setActiveSection] = useState("for-you");

  return (
    <section>
      <header className={styles.navContainer}>
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
      <div className="row">
        <div className="fy--container">
          {activeSection === "My Library" ? (
            <Library />
          ) : activeSection === "settings" ? (
            <Settings />
          ) : (
            <BookDetails book={book} />
          )}
        </div>
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;

  try {
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );

    return {
      props: {
        book: data,
      },
    };
  } catch (error) {
    console.error(`Failed to fetch book with id: ${id}`, error);

    return {
      notFound: true,
    };
  }
};

export default BookDetailsWrapper;
