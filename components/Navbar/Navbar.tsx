import Link from "next/link";
import Cart from "./Cart";

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center sticky top-0 z-10">
      <div className="font-bold text-xl">Demo Bazaar</div>
      <Link href={"/"}>Home</Link>
      <div>
        <Cart />
      </div>
    </nav>
  );
};

export default Navbar;
