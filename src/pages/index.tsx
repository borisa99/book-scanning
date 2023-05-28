import Head from "next/head";
import { type NextPage } from "next";

import { api } from "@/utils/api";
import Navbar from "@/components/Navbar";
import BooksTable from "@/components/BooksTable";
import Pagination from "@/components/Pagination";
import BooksSearch from "@/components/BooksSearch";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Book Scaner</title>
      </Head>
      <Navbar />
      <main className="px-5">
        <div className="flex flex-col gap-y-2">
          <BooksSearch />
          <BooksTable />
          <Pagination />
        </div>
      </main>
    </>
  );
};

export default Home;
