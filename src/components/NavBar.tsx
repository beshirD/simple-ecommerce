import { useShoppingCart } from "use-shopping-cart";
import Image from "next/image";
import Link from "next/link";
import ShoppingCart from "./ShoppingCart";
import { signIn, signOut, useSession } from "@roq/nextjs";

export default function NavBar() {
  const session = useSession();
  const { handleCartClick, cartCount } = useShoppingCart();
  return (
    <nav className="py-5 px-12 flex justify-between">
      <Link href="/">
        <p className="bg-white text-3xl font-bold underline underline-offset-4 decoration-wavy decoration-2 decoration-emerald-500">
          fresh
        </p>
      </Link>
      <button className="relative" onClick={() => handleCartClick()}>
        <div className="flex">
          <Image
            src="./cart.svg"
            width={40}
            height={40}
            alt="shopping cart icon"
            className="mr-10"
          />
          <div className="rounded-full flex justify-center items-center bg-emerald-500 text-xs text-white absolute w-6 h-5 bottom-6 -right-1 mr-20">
            {cartCount}
          </div>
          {session.status === "authenticated" ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded -mr-10"
              onClick={signOut}
            >
              Log Out
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded -mr-10"
              onClick={signIn}
            >
              Sign In
            </button>
          )}
        </div>
      </button>
      <ShoppingCart />
    </nav>
  );
}
