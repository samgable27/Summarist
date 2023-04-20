import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

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

const BookDetails: React.FC<BookProps> = ({
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

export default BookDetails;

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch book data from all three endpoints
  const [recommendedRes, selectedRes, suggestedRes] = await Promise.all([
    axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
    ),
    axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
    ),
    axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
    ),
  ]);

  console.log("Recommended books:", recommendedRes.data);

  // Combine the book data from all three endpoints
  const allBooks = [
    ...recommendedRes.data,
    ...selectedRes.data,
    ...suggestedRes.data,
  ];

  // Create an array of paths with the book IDs as the 'id' parameter
  const paths = allBooks.map((book: { id: string }) => ({
    params: { id: book.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;

  try {
    // Fetch the specific book from your API using the provided id
    const response = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );

    const bookData = response.data;

    // Extract the required fields from the bookData
    const title = bookData.title || "Untitled";
    const content = bookData.content || "No content available";

    // Check if either title or content is undefined
    if (title === undefined || content === undefined) {
      throw new Error("Missing title or content in the book data");
    }

    return {
      props: {
        title,
        content,
      },
    };
  } catch (error) {
    console.log(`Failed to fetch book with id: ${id}`, error);

    // If the book is not found, return a 404 status
    return {
      notFound: true,
    };
  }
};
