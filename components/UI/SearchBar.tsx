import React, { useEffect, useState } from "react";
import styles from "..//../styles/searchBar.module.css";
import { Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import debounce from "lodash.debounce";
import { Book } from "../../types/Book";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const { Search } = Input;

const CustomSearchIcon = () => <SearchOutlined style={{ color: "black" }} />;

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      debouncedBookSearchQuery();
    } else {
      setSearchResults([]);
    }
    return () => {
      debouncedBookSearchQuery.cancel();
    };
  }, [searchTerm]);

  const bookSearchQuery = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${searchTerm}`
    );
    setSearchResults(data);
    setLoading(false);
  };

  const debouncedBookSearchQuery = debounce(bookSearchQuery, 150);

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchContent}>
        <Space direction="vertical">
          <Search
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchBar}
            placeholder="Search for books"
            // enterButton={<CustomSearchIcon />}
            style={{
              margin: "40px",
            }}
            size="middle"
          />
        </Space>
      </div>
      {searchTerm && (
        <div className={styles.searchBookWrapper}>
          {searchResults.map((book: Book, idx) => (
            <div key={idx} className={styles.bookResult}>
              <Link className={styles.searchBookLink} href={`/book/${book.id}`}>
                <figure>
                  <Image src={book.imageLink} height={80} width={80} alt={""} />
                </figure>
                <div>
                  <div className={styles.title}>{book.title}</div>
                  <div className={styles.author}>{book.author}</div>
                  <div className={styles.duration}></div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
