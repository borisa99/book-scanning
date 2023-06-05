import { BooksContext, type BooksContextType } from "@/context/BooksContext";
import { useContext } from "react";

const useBooks = () => useContext(BooksContext) as BooksContextType;

export default useBooks;
