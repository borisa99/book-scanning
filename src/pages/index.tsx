import { type NextPage } from "next";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

const Home: NextPage = () => {
  const user = useUser();

  return (
    <div className="flex min-h-screen flex-1 items-center justify-center">
      {!user && <SignInButton />}
      {!!user && <SignOutButton />}
    </div>
  );
};

export default Home;
