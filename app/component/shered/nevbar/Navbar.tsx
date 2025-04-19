import {
  Bell,
  ChevronDownIcon,
  Globe,
  LayoutDashboard,
  MessageSquareText,
  Search,
  
} from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import Container from "../container/Container";
// import Logout from "./Logout";

function Navbar() {
  return (
    <nav className="bg-gray-950/55 bg:blur-2xl py-3 shadow-xs sticky top-0 z-50">
      <Container className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <Link href="/">
            <Image
              src="/assets/logo.svg"
              alt="code red"
              width={36}
              height={36}
            ></Image>
          </Link>
          <div className="relative ">
            <input
              placeholder="search"
              className="flex-1 p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
              type="text"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" />
          </div>
        </div>
        <div className="flex items-center gap-x-10 *:text-white">
          <Image
            className="rounded-full"
            src="https://placehold.co/10x10"
            width={40}
            height={40}
            alt="profile"
          ></Image>
          {/* <Users /> */}
          <Bell></Bell>
          <MessageSquareText />
          <div>
            <div className="text-right">
              <Menu>
                <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-945/85 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-300  data-[focus]:outline-1">
                  <Globe className="text-white"></Globe>
                  <ChevronDownIcon className="size-4 text-gray-400" />
                </MenuButton>

                <MenuItems
                  transition
                  anchor="bottom end"
                  className="w-28 origin-top-right border border-white/5 bg-gray-800 p-1 text-sm/6 *:text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-100 data-[closed]:opacity-0"
                >
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2  py-1.5 px-3 data-[focus]:bg-white/10">
                      English
                    </button>
                  </MenuItem>
                  <div className="my-1 h-px bg-white/5" />
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 py-1.5 px-3 data-[focus]:bg-white/10">
                      Bangla
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
          <LayoutDashboard />
          <Link href="/login">Login</Link>
          <Link href="/signup">SignUp</Link>
          <Link href="/community">Group</Link>
          {/* <Logout></Logout> */}
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
