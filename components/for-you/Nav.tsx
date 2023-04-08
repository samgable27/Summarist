import React from "react";
import SearchBar from "../UI/SearchBar";
import styles from "..//../styles/searchBar.module.css";

type Props = {};

const Nav = (props: Props) => {
  return (
    <div className={styles.searchBar}>
      <SearchBar
        onSearch={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

export default Nav;
