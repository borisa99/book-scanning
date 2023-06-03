import React, { useState } from "react";

export interface BooksContextType {
  selected: string[];
  setSelected: (value: string[]) => void;
}

export const BooksContext = React.createContext<BooksContextType | null>(null);

const BooksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <BooksContext.Provider
      value={{
        selected,
        setSelected,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export default BooksProvider;
