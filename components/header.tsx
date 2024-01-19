'use client'
import { Input } from "./ui/input";
import Image from "next/image";
import Logo from "../public/logo.png";
import Link from "./link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-[999]">
      <nav className="flex flex-row items-center justify-between p-4 backdrop-blur-xl">
        <div className="flex flex-row items-center gap-2 md:gap-4">
          <Image className="rounded h-6 w-6 md:h-10 md:w-10" alt="logo" src={Logo} />
          <Link href="/" active={pathname === "/"}>
            Home
          </Link>
          <Link href="/list" active={pathname === "/list"}>
            List
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header;
