/* eslint-disable @typescript-eslint/no-misused-promises */
import Image from "next/image";
import toast from "react-hot-toast";
import type { Book } from "@prisma/client";

import { api } from "@/utils/api";

import BookModalItem from "./BookModalItem";

interface AddBookModalProps {
  handleClose: () => void;
  book: Book;
}

export default function AddBookModal({ handleClose, book }: AddBookModalProps) {
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

  const handleSave = async () => {
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
          msrp: parseFloat(msrp.toString()),
          pages,
          synopsis,
          binding,
        },
      });
      await utils.books.getAll.invalidate();
      handleClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred");
      }
    }
  };

  return (
    <>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={true}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange={() => {}}
      />
      <div className="modal">
        <div className="modal-box max-w-3xl">
          <h3 className="mb-5 text-lg font-bold">Add a new book</h3>
          <div className="flex flex-col gap-y-3">
            <div className="relative h-40 w-full">
              <Image
                src={image}
                alt="cover"
                className="object-cover object-center"
                sizes=""
                fill
              />
            </div>
            <BookModalItem title="Title" value={title} />
            <BookModalItem title="Title Long" value={title_long} />
            <BookModalItem title="ISBN" value={`${isbn10} ${isbn13}`} />
            <BookModalItem title="Authors" value={JSON.stringify(authors)} />
            <BookModalItem title="Year Published" value={date_published} />
            <BookModalItem title="Dimensions" value={dimensions} />
            <div className="grid grid-cols-3 gap-2">
              <BookModalItem title="Edition" value={edition} />
              <BookModalItem title="Language" value={language} />
              <BookModalItem title="MSRP" value={msrp} />
              <BookModalItem title="Pages" value={pages} />
              <BookModalItem title="Publisher" value={publisher} />
              <BookModalItem title="Binding" value={binding} />
            </div>
            <BookModalItem title="Subjects" value={JSON.stringify(subjects)} />
          </div>
          <div className="modal-action">
            <label
              htmlFor="my-modal"
              className="btn-sm btn"
              onClick={handleClose}
            >
              Cancel
            </label>
            <label
              htmlFor="my-modal"
              className="btn-sm btn"
              onClick={handleSave}
            >
              Save
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
