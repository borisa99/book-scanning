import { type NextPage } from "next";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

import { api } from "@/utils/api";

const Home: NextPage = () => {
  const user = useUser();

  const { data } = api.books.getAll.useQuery();

  return (
    <div className="flex min-h-screen flex-1 items-center justify-center">
      <div className="mr-5">
        {!user && <SignInButton />}
        {!!user && <SignOutButton />}
      </div>
      <div className="flex flex-col">
        <h1>Books</h1>
        {data?.map((book) => (
          <div key={book.id}>{book.title}</div>
        ))}
      </div>
    </div>
  );
};

export default Home;
