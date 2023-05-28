import { type NextPage } from "next";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

import { api } from "@/utils/api";
import { useState } from "react";

const CreateBookForm = () => {
  const [title, setTitle] = useState("");

  const { mutate } = api.books.create.useMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({ title });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="border "
        type="text"
        name="title"
        id="title"
        placeholder="Book title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
};

const Home: NextPage = () => {
  const user = useUser();

  const { data } = api.books.getAll.useQuery();

  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center gap-10">
      <div className="mr-5">
        {!user && <SignInButton />}
        {!!user && <SignOutButton />}
      </div>
      <CreateBookForm />
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
