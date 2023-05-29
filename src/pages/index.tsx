import Head from "next/head";
import { type NextPage } from "next";

import { api } from "@/utils/api";
import Navbar from "@/components/Navbar";
import BooksTable from "@/components/BooksTable";
import Pagination from "@/components/Pagination";
import BooksSearch from "@/components/BooksSearch";
import LoadingOverlay from "@/components/LoadingOverlay";

const Home: NextPage = () => {
  const { data, isLoading } = api.books.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Book Scaner</title>
      </Head>
      <Navbar />
      <main className="px-5">
        <div className="flex flex-col gap-y-2">
          <BooksSearch disabled={isLoading} />
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
