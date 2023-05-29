import { SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function Navbar() {
  const { user } = useUser();

  return (
    <div className="navbar mb-5 bg-base-300">
      <div className="flex-1">
        <span className="btn-ghost btn text-xl normal-case">Book Scanner</span>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown-end dropdown mr-3">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            {user && (
              <div className="w-10 rounded-full">
                <Image
                  src={user.imageUrl}
                  alt="avatar"
                  width={40}
                  height={40}
                />
              </div>
            )}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <SignOutButton />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
