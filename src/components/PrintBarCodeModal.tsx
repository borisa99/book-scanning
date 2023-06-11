/* eslint-disable @typescript-eslint/no-misused-promises */

import type { Book } from "@prisma/client";

import BookModalItem from "./BookModalItem";
import { useRef, useState } from "react";
import Barcode from "react-barcode";
import { generateSKU } from "@/utils/helpers";

import { useReactToPrint } from "react-to-print";
import classNames from "classnames";

interface AddBookModalProps {
  handleClose: () => void;
  books: Book[];
}

export default function PrintBarCodeModal({
  handleClose,
  books,
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
          <h3 className="mb-5 text-lg font-bold">Print book barcode</h3>
          <div className="flex flex-col gap-y-3">
            {books.map((el) => {
              return (
                <>
                  <BookModalItem title="Title" value={el.title} />

                  {el.shelf && el.shelf.length ? (
                    <BookModalItem
                      title="SKU"
                      value={
                        el.sku ??
                        generateSKU(
                          el.title !== null ? el.title : "Unknown",
                          el.isbn13,
                          el.isbn10,
                          el.authors !== null
                            ? JSON.stringify(el.authors)
                            : "Unknown",
                          el.shelf
                        )
                      }
                    />
                  ) : null}

                  {el.shelf && el.shelf.length ? (
                    <div className="mt-5 flex justify-center">
                      <Barcode
                        value={
                          el.sku ??
                          generateSKU(
                            el.title !== null ? el.title : "Unknown",
                            el.isbn13,
                            el.isbn10,
                            el.authors !== null
                              ? JSON.stringify(el.authors)
                              : "Unknown",
                            el.shelf
                          )
                        }
                      />
                    </div>
                  ) : null}
                </>
              );
            })}
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
