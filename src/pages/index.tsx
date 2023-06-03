import Head from "next/head";
import { useState } from "react";
import { type NextPage } from "next";

import { api } from "@/utils/api";
import Navbar from "@/components/Navbar";
import BooksTable from "@/components/BooksTable";
import Pagination from "@/components/Pagination";
import BooksSearch from "@/components/BooksSearch";
import LoadingOverlay from "@/components/LoadingOverlay";
import BookForm from "@/components/BookForm";
import BooksProvider from "@/context/BooksContext";

export interface BookSearchParams {
  query: string;
  dateFrom: Date | null;
  dateTo: Date | null;
}

export const defaultSearchParams: BookSearchParams = {
  query: "",
  dateFrom: null,
  dateTo: null,
};

const Home: NextPage = () => {
  const [params, setSearchParams] =
    useState<BookSearchParams>(defaultSearchParams);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const { data, isLoading } = api.books.search.useQuery({
    ...params,
    page,
    pageSize,
  });

  return (
    <>
      <Head>
        <title>Book Scanner</title>
      </Head>
      <Navbar />
      <main className="px-5">
        <BooksProvider>
          <div className="flex flex-col gap-y-2">
            <div className="flex justify-between">
              <BooksSearch
                defaultValues={defaultSearchParams}
                handleSubmit={(searchParams) => {
                  setSearchParams(searchParams);
                }}
              />
              <BookForm disabled={isLoading} />
            </div>
            <div className="relative">
              {isLoading && <LoadingOverlay />}
              <BooksTable
                rows={data?.books ?? []}
                handleSelectedChange={(value) => console.log(value)}
              />
              <Pagination
                currentPage={page}
                pageSize={pageSize}
                totalCount={data?.count}
                handlePageChange={(value) => setPage(value)}
                handlePageSizeChange={(value) => setPageSize(value)}
              />
            </div>
          </div>
        </BooksProvider>
      </main>
    </>
  );
};

export default Home;
