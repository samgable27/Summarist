import React from "react";
import styles from "..//../styles/searchBar.module.css";
import { Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const { Search } = Input;

const CustomSearchIcon = () => <SearchOutlined style={{ color: "black" }} />;

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <Space direction="vertical">
      <Search
        className={styles.searchBar}
        placeholder="Search for books"
        // enterButton={<CustomSearchIcon />}
        onSearch={onSearch}
        style={{
          margin: "40px",
        }}
        size="middle"
      />
    </Space>
  );
};

export default SearchBar;
