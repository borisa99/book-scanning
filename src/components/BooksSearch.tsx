import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import type { BookSearchParams } from "@/pages/index";
import useBooks from "@/hooks/useBooks";
import { api } from "@/utils/api";

interface BooksSearchProps {
  defaultValues: BookSearchParams;
  handleSubmit: (searchParams: BookSearchParams) => void;
}

export default function BooksSearch({
  defaultValues,
  handleSubmit,
}: BooksSearchProps) {
  const { selected } = useBooks();

  const [searchParams, setSearchParams] =
    useState<BookSearchParams>(defaultValues);

  const dateClassName =
    "mr-2 h-12 rounded-md border border-[#464B58] !bg-[#2A303C] pl-4 outline-none";

  const enabled = false;
  const { refetch } = api.books.exportAsCsv.useQuery(
    { id: selected ?? [] },
    { enabled: enabled, retry: 0 }
  );

  const exportCsv = () => {
    void refetch().then(({ data }) => {
      if (data) {
        console.log(data, "DATA");
      }
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(searchParams);
      }}
      className="flex"
    >
      <input
        type="text"
        placeholder="Search"
        className="input-bordered input mr-2 w-full max-w-xs"
        value={searchParams.query}
        onChange={(e) =>
          setSearchParams((prev) => ({ ...prev, query: e.target.value }))
        }
      />
      <DatePicker
        selected={searchParams.dateFrom}
        dateFormat="yyyy/MM/dd"
        placeholderText="Date From"
        className={dateClassName}
        onChange={(date) =>
          setSearchParams((prev) => ({ ...prev, dateFrom: date }))
        }
      />
      <DatePicker
        selected={searchParams.dateTo}
        dateFormat="yyyy/MM/dd"
        placeholderText="Date To"
        className={dateClassName}
        onChange={(date) =>
          setSearchParams((prev) => ({ ...prev, dateTo: date }))
        }
      />
      <button
        type="submit"
        className="btn-primary btn mr-2"
        onClick={exportCsv}
        disabled={!selected.length}
      >
        Export
      </button>
      <button type="submit" className="btn-primary btn mr-2">
        Filter
      </button>
      <button
        type="button"
        className="btn"
        onClick={() => {
          setSearchParams(defaultValues);
          handleSubmit(defaultValues);
        }}
      >
        Clear
      </button>
    </form>
  );
}
