/* eslint-disable @typescript-eslint/no-misused-promises */
import Image from "next/image";
import toast from "react-hot-toast";
import type { Book } from "@prisma/client";

import { api } from "@/utils/api";

import BookModalItem from "./BookModalItem";
import { useRef, useState } from "react";
import Barcode from "react-barcode";
import { formatLongString, generateSKU } from "@/utils/helpers";

import { useReactToPrint } from "react-to-print";

interface AddBookModalProps {
  handleClose: () => void;
  book: Book;
}

export default function AddBookModal({ handleClose, book }: AddBookModalProps) {
  const [shelfNumber, setShelfNumber] = useState<string>("");
  const [printing, setPrinting] = useState<boolean>(false);
  const barcodeRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => barcodeRef.current,
    onAfterPrint: () => {
      handleClose();
      setPrinting(false);
    },
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        setPrinting(true);
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });
    },
  });
  decodeURI;
  const utils = api.useContext();
  const {
    id,
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
    if (!shelfNumber.length) {
      return toast.error("You need to input the shelf field.");
    }
    const generatedSku = generateSKU(
      title !== null ? title : "Unknown",
      isbn13,
      isbn10,
      authors !== null ? JSON.stringify(authors) : "Unknown",
      shelfNumber
    );

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
          shelf: shelfNumber,
          sku: generatedSku,
        },
      });
      await utils.books.search.invalidate();
      handlePrint();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred");
      }
    }
  };

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
        <div className="modal-box max-w-3xl">
          <h3 className="mb-5 text-lg font-bold">Add a new book</h3>
          <div className="flex flex-col gap-y-3">
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
            <BookModalItem
              title="Subjects"
              value={
                printing
                  ? formatLongString(JSON.stringify(subjects))
                  : JSON.stringify(subjects)
              }
            />
            {shelfNumber.length ? (
              <BookModalItem
                title="SKU"
                value={generateSKU(
                  title !== null ? title : "Unknown",
                  isbn13,
                  isbn10,
                  authors !== null ? authors.toString() : "Unknown",
                  shelfNumber
                )}
              />
            ) : null}
            <div className="mt-3">
              <span className="mr-3 rounded-md bg-primary-focus p-1 text-white">
                Shelf number:
              </span>
              <input
                type="text"
                placeholder="Enter shelf number"
                className="input-bordered input w-full max-w-xs"
                value={shelfNumber}
                onChange={(e) => setShelfNumber(e.target.value)}
              />
            </div>
            {shelfNumber.length ? (
              <div className="mt-5 flex justify-center">
                <Barcode
                  value={generateSKU(
                    title !== null ? title : "Unknown",
                    isbn13,
                    isbn10,
                    authors !== null ? JSON.stringify(authors) : "Unknown",
                    shelfNumber
                  )}
                />
              </div>
            ) : null}
          </div>
          {!printing && (
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
          )}
        </div>
      </div>
    </div>
  );
}
