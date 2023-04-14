import React from "react";

interface LibraryProps {
  children?: React.ReactNode;
}

const Library: React.FC<LibraryProps> = () => {
  return (
    <div>
      <h1>Library</h1>
    </div>
  );
};

export default Library;
