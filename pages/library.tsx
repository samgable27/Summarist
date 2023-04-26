import React from "react";
import libStyles from "../styles/library.module.css";

interface LibraryProps {
  children?: React.ReactNode;
}

const Library: React.FC<LibraryProps> = () => {
  return (
    <div className={libStyles.libContainer}>
      <div>
        <span>Saved Books</span>
        <p>0 items</p>
      </div>
      <div className={libStyles.libBlockWrapper}>
        <h2>Save your favorite books!</h2>
        <p>When you save a book, it will appear here.</p>
      </div>
      <div>
        <span>Finished</span>
        <p>0 items</p>
        <div className={libStyles.libBlockWrapper}>
          <h2>Done and dusted!</h2>
          <p>When you finish a book, you can find it here later.</p>
        </div>
      </div>
    </div>
  );
};

export default Library;
