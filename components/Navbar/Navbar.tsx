"use client";
import Link from "next/link";
import Cart from "./Cart";
import UserProfile from "./UserProfile";

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center sticky top-0 z-10">
      <Link href={"/"} className="font-bold text-xl">
        Demo Bazaar
      </Link>
      <div className="flex gap-4 items-center">
        <UserProfile />
        <Cart />
      </div>
    </nav>
  );
};

export default Navbar;
