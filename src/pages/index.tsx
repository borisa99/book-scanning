import Head from "next/head";
import { type NextPage } from "next";

import { api } from "@/utils/api";
import Navbar from "@/components/Navbar";
import BooksTable from "@/components/BooksTable";
import Pagination from "@/components/Pagination";
import BooksSearch from "@/components/BooksSearch";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useState } from "react";

const Home: NextPage = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const { data, isLoading } = api.books.search.useQuery({
    query,
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
        <div className="flex flex-col gap-y-2">
          <BooksSearch
            disabled={isLoading}
            value={query}
            handleChange={(val) => setQuery(val)}
          />
          <div className="relative">
            {isLoading && <LoadingOverlay />}
            <BooksTable rows={data?.books ?? []} page={page} />
            <Pagination
              currentPage={page}
              pageSize={pageSize}
              totalCount={data?.count}
              handlePageChange={(value) => setPage(value)}
              handlePageSizeChange={(value) => setPageSize(value)}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
