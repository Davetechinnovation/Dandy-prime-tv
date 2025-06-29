"use client";
import Link from "next/link";
import { Menu} from 'lucide-react'

const Section = () => {
  return (
    <div>
      <nav className="z-50 fixed top-0 left-0 w-[100%] bg-black border-b border-b-blue-700 text-white sm:px-6 px-3 py-3 flex  items-center justify-between gap-3 ">
        <Link href="/">
          <h1 className="sm:text-[29px] text-[24px] font-extrabold ">
            <span>Dandy</span> <span className="text-blue-700">Prime</span>
          </h1>
        </Link>
        <div className="block lg:hidden"><Menu size={28} /></div>
        <ul className=" gap-6 text-sm font-semibold lg:flex hidden">
          <li className="hover:text-blue-700 duration-500 transition-all">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-blue-700 duration-500 transition-all">
            <Link href="/about">About</Link>
          </li>
          <li className="hover:text-blue-700 duration-500 transition-all">
            <Link href="/live">Live TV</Link>
          </li>
          <li className="hover:text-blue-700 duration-500 transition-all">
            <Link href="/kdramas">K-Dramas</Link>
          </li>
          <li className="hover:text-blue-700 duration-500 transition-all">
            <Link href="/contact">Contact us</Link>
          </li>
          <li className="hover:text-blue-700 duration-500 transition-all">
            <Link href="/policies">Terms & Privacy</Link>
          </li>
          <li className="hover:text-blue-700 duration-500 transition-all">
            <Link href="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
      
    </div>
  );
};
export default Section;
