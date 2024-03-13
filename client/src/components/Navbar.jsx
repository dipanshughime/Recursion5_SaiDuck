import { SignOutButton, useUser } from "@clerk/clerk-react";
import React from "react";

const Navbar = () => {
  const { user } = useUser();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">GoTrips</a>
      </div>
      <div className="flex-none mr-4">
        <SignOutButton className="btn btn-neutral rounded-full px-5" />
        <div className="dropdown dropdown-end ml-3">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-8 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user?.profileImageUrl}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
