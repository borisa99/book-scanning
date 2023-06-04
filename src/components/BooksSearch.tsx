import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";

import DatePicker from "react-datepicker";
import type { BookSearchParams } from "@/pages/index";
import useBooks from "@/hooks/useBooks";
import { api } from "@/utils/api";
import { toast } from "react-hot-toast";

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
  const { refetch, isInitialLoading, isRefetching } =
    api.books.exportAsCsv.useQuery(
      { id: selected ?? [] },
      { enabled: enabled, retry: 0 }
    );
  const exportLoading = isInitialLoading || isRefetching;

  const exportCsv = () => {
    void refetch().then(({ data }) => {
      if (data) {
        console.log(data);

        const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "export.csv");

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
      } else {
        toast.error("An error occurred.");
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
        disabled={!selected.length || exportLoading}
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
