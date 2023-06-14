import { useRef, useState, useLayoutEffect } from "react";
import toast from "react-hot-toast";

import AddBookModal from "./AddBookModal";

import { api } from "@/utils/api";

interface BookFormProps {
  disabled: boolean;
}

export default function BookForm({ disabled }: BookFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

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

  useLayoutEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 1000);
  }, []);

  return (
    <>
      <form className="flex gap-x-2" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter ISBN"
          className="input-bordered input w-full max-w-xs"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          disabled={disabled}
          autoFocus={true}
        />
        <button
          className={`btn-primary btn ${isLoading ? "loading" : ""}`}
          disabled={disabled}
        >
          Add New
        </button>
      </form>
      {showModal && data && (
        <AddBookModal handleClose={handleClose} book={data} />
      )}
    </>
  );
}
