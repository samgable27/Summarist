import React from "react";
import SearchBar from "../UI/SearchBar";
import styles from "..//../styles/searchBar.module.css";
import { MenuOutlined } from "@ant-design/icons";

type Props = {};

const Nav = (props: Props) => {
  return (
    <div className={styles.searchBar}>
      <SearchBar
        onSearch={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
      />
      <MenuOutlined
        className={styles.menuBtn}
        style={{
          paddingLeft: "40px",
          fontSize: "20px",
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default Nav;
