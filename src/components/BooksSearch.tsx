/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import toast from "react-hot-toast";

import { api } from "@/utils/api";

import AddBookModal from "./AddBookModal";

interface BooksSearchProps {
  value: string;
  handleChange: (value: string) => void;
  disabled: boolean;
}

export default function BooksSearch({
  value,
  handleChange,
  disabled,
}: BooksSearchProps) {
  const [isbn, setIsbn] = useState("");
  const [showModal, setShowModal] = useState(false);

  const enabled = false;
  const { data, refetch, isInitialLoading, isRefetching } =
    api.books.getByISBN.useQuery({ isbn }, { enabled: enabled, retry: 0 });
  const isLoading = isInitialLoading || isRefetching;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isbn) {
      return;
    }

    void refetch().then(({ data }) => {
      if (data) {
        setShowModal(true);
      } else {
        toast.error("Not Found");
      }
    });
  };

  const handleClose = () => {
    setShowModal(false);
    setIsbn("");
  };

  return (
    <>
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Search"
          className="input-bordered input w-full max-w-xs"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
        />
        <form className="flex gap-x-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter ISBN"
            className="input-bordered input w-full max-w-xs"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            disabled={disabled}
          />
          <button
            className={`btn-primary btn ${isLoading ? "loading" : ""}`}
            disabled={disabled}
          >
            Add New
          </button>
        </form>
      </div>
      {showModal && data && (
        <AddBookModal handleClose={handleClose} book={data} />
      )}
    </>
  );
}
