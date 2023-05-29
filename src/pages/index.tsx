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

  const { data, isLoading } = api.books.search.useQuery({ query });

  return (
    <>
      <Head>
        <title>Book Scaner</title>
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
            <BooksTable rows={data ?? []} />
            <Pagination />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
