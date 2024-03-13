import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/clerk-react";
import React from "react";

const Navbar = () => {
  const { user } = useUser();
  return (
    <div className="navbar absolute top-0 z-30 bg-transparent px-2">
      <div className="flex-1 text-white font-bold text-3xl">TravelEasy</div>
      <div className="flex-none">
        <button className="btn px-12 rounded-lg">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <SignOutButton />
          </SignedIn>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
