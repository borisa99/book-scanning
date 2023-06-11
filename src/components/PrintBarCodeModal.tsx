/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRef, useState } from "react";
import Barcode from "react-barcode";
import classNames from "classnames";
import { useReactToPrint } from "react-to-print";

import type { Book } from "@prisma/client";
import { generateSKU } from "@/utils/helpers";

interface AddBookModalProps {
  handleClose: () => void;
  book: Book;
}

export default function PrintBarCodeModal({
  handleClose,
  book,
}: AddBookModalProps) {
  const [printing, setPrinting] = useState(false);
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

  return (
    <div
      ref={barcodeRef}
      className={classNames({ printing: "overflow-scroll" })}
    >
      <input
        type="checkbox"
        className="modal-toggle"
        checked={true}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange={() => {}}
      />
      <div className="modal">
        <div className="modal-box max-w-3xl">
          <div className="flex flex-col gap-y-3">
            <div className="mt-5 flex justify-center">
              <Barcode
                value={
                  book.sku ??
                  generateSKU(
                    book.title !== null ? book.title : "Unknown",
                    book.isbn13,
                    book.isbn10,
                    book.authors !== null
                      ? JSON.stringify(book.authors)
                      : "Unknown",
                    book.shelf ?? ""
                  )
                }
              />
            </div>
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
                onClick={handlePrint}
              >
                Print
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
