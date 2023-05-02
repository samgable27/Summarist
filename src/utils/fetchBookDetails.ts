import axios from "axios";
import { GetServerSideProps } from "next";

export const fetchBookDetails: GetServerSideProps = async (context) => {
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
