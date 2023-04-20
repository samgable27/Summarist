import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface BookProps {
  author: string;
  title: string;
  subTitle: string;
  content: string;
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
}
interface BookPageProps {
  author: string;
  title: string;
  subTitle: string;
  content: string;
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
}

export const BookDetails: React.FC<BookProps> = ({
  title,
  author,
  subTitle,
  averageRating,
  totalRating,
  keyIdeas,
  type,
  tags,
  bookDescription,
  authorDescription,
  content,
  imageLink,
}) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

const BookPage: React.FC<BookPageProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const [bookData, setBookData] = useState<BookProps | null>(null);

  useEffect(() => {
    if (id) {
      // fetching data for static generation of books
      const fetchBookData = async () => {
        try {
          const response = await axios.get(
            `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
          );
          setBookData(response.data);
        } catch (error) {
          console.log(`Failed to fetch book with id: ${id}`, error);
        }
      };

      fetchBookData();
    }
  }, [id]);

  return (
    <div>
      {bookData ? <BookDetails {...bookData} /> : <div>Loading...</div>}
    </div>
  );
};

export default BookPage;
