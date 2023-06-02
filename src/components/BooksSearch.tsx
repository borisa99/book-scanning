import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";
import DatePicker from "react-datepicker";

import type { BookSearchParams } from "@/pages/index";

interface BooksSearchProps {
  handleSubmit: (searchParams: BookSearchParams) => void;
}

export default function BooksSearch({ handleSubmit }: BooksSearchProps) {
  const [query, setQuery] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);

  const dateClassName =
    "mr-2 h-12 rounded-md border border-[#464B58] !bg-[#2A303C] pl-4 outline-none";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit({ query, dateFrom, dateTo });
      }}
      className="flex"
    >
      <input
        type="text"
        placeholder="Search"
        className="input-bordered input mr-2 w-full max-w-xs"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <DatePicker
        selected={dateFrom}
        dateFormat="yyyy/MM/dd"
        placeholderText="Date From"
        className={dateClassName}
        onChange={(date) => setDateFrom(date)}
      />
      <DatePicker
        selected={dateTo}
        dateFormat="yyyy/MM/dd"
        placeholderText="Date To"
        className={dateClassName}
        onChange={(date) => setDateTo(date)}
      />

      <button type="submit" className="btn">
        Filter
      </button>
    </form>
  );
}
