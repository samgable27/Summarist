import React from "react";
import styles from "..//../styles/searchBar.module.css";
import { Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface SearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string;
}

const { Search } = Input;

const CustomSearchIcon = () => <SearchOutlined style={{ color: "black" }} />;

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search...",
}) => {
  return (
    <Space direction="vertical">
      <Search
        className={styles.searchBar}
        placeholder="Search for books"
        // enterButton={<CustomSearchIcon />}
        onSearch={onSearch}
        style={{ width: 340, margin: "40px" }}
        size="middle"
      />
    </Space>
  );
};

export default SearchBar;
