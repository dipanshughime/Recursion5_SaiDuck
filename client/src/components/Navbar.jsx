import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/clerk-react";
import React, { useEffect } from "react";
import FormDialog from "./FormDialog";
import { useNavigate } from "react-router";

const Navbar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
    }
  }, [user]);

  console.log("user", user);
  return (
    <div className="navbar absolute top-0 z-30 bg-transparent px-4 mr-2 mt-1">
      <div className="flex-1 text-white font-bold text-3xl">
        <img
          onClick={() => document.getElementById("my_modal_5").showModal()}
          className="
            h-12 w-12 rounded-full bg-slate-200 shadow p-2 hover:cursor-pointer"
          src="https://cdn-icons-png.freepik.com/512/8943/8943377.png"
          alt=""
        />
      </div>
      <div className="flex-none gap-5">
        <FormDialog />
        <img
          src={user?.imageUrl || "https://bit.ly/3iJxZ4B"}
          alt="user"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
