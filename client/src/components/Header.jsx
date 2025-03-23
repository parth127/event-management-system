"use client";

import { useState } from "react";
import {
  CalendarIcon,
  PlusIcon,
  BellIcon,
  ExitIcon,
} from "@radix-ui/react-icons";
import SearchInputWithIcon from "./SearchInputWithIcon";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { logout } from "@/actions/auth";
import { useRouter } from "next/navigation";

import EventModal from "./EventModal";

export default function Header() {
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  async function handleLogout() {
    const result = await logout();

    if (result.error) {
      console.error(result.error);
    } else {
      console.log(result.message);
      router.push("/auth/login");
    }
  }
  return (
    <div className="w-full flex flex-row justify-between p-4">
      <div className="flex flex-row justify-center items-center gap-x-2 cursor-pointer">
        <div>
          <CalendarIcon className="w-6 h-6 text-[#3366FF]" />
        </div>
        <div>
          <h1 className="font-bold text-2xl">EventFlow</h1>
        </div>
      </div>
      <div>
        <div>
          <SearchInputWithIcon />
        </div>
      </div>
      <div className="flex flex-row justify-baseline items-center gap-x-4">
        <div>
          <Button
            className="rounded-md bg-[#3366FF] text-white hover:bg-[#2D5DD7] cursor-pointer hover:scale-105"
            onClick={() => setModalOpen(true)}
          >
            <PlusIcon className="w-4 h-4" /> Create Event
          </Button>
          <EventModal open={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
        <div>
          <Button
            size="icon"
            className="bg-white text-[#4B5563] text-8xl shadow-none hover:bg-white hover:text-[#4B5563] hover:scale-105 hover:rotate-12 cursor-pointer"
          >
            <BellIcon style={{ width: "48px", height: "24px" }} />
          </Button>
        </div>
        <div>
          <Menubar className="border-none bg-transparent p-0 shadow-none active:shadow-none focus:bg-white">
            <MenubarMenu className="bg-transparent">
              <MenubarTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </MenubarTrigger>
              <MenubarContent className="mr-4 max-w-20 bg-transparent">
                <MenubarItem className="p-0 bg-transparent">
                  <Button
                    onClick={handleLogout}
                    className="cursor-pointer w-full gap-x-2"
                    variant="secondary"
                  >
                    <ExitIcon className="w-4 h-4" /> Logout
                  </Button>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </div>
  );
}
