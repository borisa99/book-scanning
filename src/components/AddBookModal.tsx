/* eslint-disable @typescript-eslint/no-misused-promises */
import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import type { Book } from "@prisma/client";
import { formatLongString } from "@/utils/helpers";
import { api } from "@/utils/api";

import BookModalItem from "./BookModalItem";

interface AddBookModalProps {
  handleClose: () => void;
  book: Book;
}

export default function AddBookModal({ handleClose, book }: AddBookModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [sku, setSku] = useState<string>("");
  const barcodeRef = useRef<HTMLDivElement | null>(null);

  const utils = api.useContext();
  const {
    dimensions,
    title,
    title_long,
    isbn,
    isbn10,
    isbn13,
    image,
    authors,
    date_published,
    edition,
    language,
    msrp,
    pages,
    publisher,
    binding,
    subjects,
    synopsis,
  } = book;

  const { mutateAsync } = api.books.create.useMutation();

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sku.length) {
      return toast.error("SKU is required");
    }

    try {
      await mutateAsync({
        book: {
          title,
          title_long,
          isbn,
          isbn10,
          isbn13,
          image,
          edition,
          language,
          publisher,
          authors: JSON.stringify(authors),
          subjects: JSON.stringify(subjects),
          date_published,
          dimensions,
          msrp: msrp && parseFloat(msrp.toString()),
          pages,
          synopsis,
          binding,
          sku,
        },
      });
      await utils.books.search.invalidate();
      handleClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred");
      }
    }
  };

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div ref={barcodeRef}>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={true}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange={() => {}}
      />
      <div className="modal">
        <form className="modal-box max-w-3xl" onSubmit={handleSave}>
          <>
            <h3 className="mb-5 text-lg font-bold">Add a new book</h3>
            <div className="mb-3 flex flex-col gap-y-3">
              <div className="relative h-40 w-full">
                {image && (
                  <Image
                    src={image}
                    alt="cover"
                    className="object-cover object-center"
                    sizes=""
                    fill
                  />
                )}
              </div>
              <BookModalItem title="Title" value={title} />
              <BookModalItem title="Title Long" value={title_long} />
              <div className="grid grid-cols-2 gap-2">
                <BookModalItem title="ISBN" value={`${isbn10} ${isbn13}`} />
                <BookModalItem title="Year Published" value={date_published} />
              </div>
              <BookModalItem title="Authors" value={JSON.stringify(authors)} />
              <BookModalItem title="Dimensions" value={dimensions} />
              <div className="grid grid-cols-3 gap-2">
                <BookModalItem title="Edition" value={edition} />
                <BookModalItem title="Language" value={language} />
                <BookModalItem title="MSRP" value={msrp} />
                <BookModalItem title="Pages" value={pages} />
                <BookModalItem title="Publisher" value={publisher} />
                <BookModalItem title="Binding" value={binding} />
              </div>
              <BookModalItem
                title="Subjects"
                value={formatLongString(JSON.stringify(subjects))}
              />
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter sku (shelf number)"
              className="input-bordered input w-full max-w-xs"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
            />
            <div className="modal-action">
              <label
                htmlFor="my-modal"
                className="btn-sm btn"
                onClick={handleClose}
              >
                Cancel
              </label>
              <label htmlFor="my-modal">
                <button className="btn-sm btn" type="submit">
                  Save
                </button>
              </label>
            </div>
          </>
        </form>
      </div>
    </div>
  );
}
