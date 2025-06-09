"use client";
import { useState, ReactNode } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { UserCircle2, Settings, LogOut } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog";
import { Heart } from "lucide-react";

export default function Sidebar({ children }: { children: ReactNode }) {
  const [collapseSidebar, setCollapseSidebar] = useState(false);

  return (
    <div className="flex flex-col col-span-2 row-span-1 h-full bg-transparent rounded-2xl px-1.5 pt-8 pb-2 justify-between backdrop-blur-3xl sticky left-0 gap-4">
      
      {/* Logo */}
      <div className="flex flex-row font-medium items-center hover:text-neutral-300/70 transition justify-center w-full text-neutral-300/55 rounded-lg py-4 bg-neutral-300/5 border border-neutral-300/10">
        <Link href="/">
          <span className={!collapseSidebar ? "block w-full text-center text-2xl bg-transparent" : "hidden"}>
            Solance
          </span>
        </Link>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 flex flex-col overflow-y-auto scrollbar-track-transparent scrollbar-thumb-neutral-800 scrollbar-thin rounded-lg relative px-2 py-6 transition bg-neutral-400/5">
				<p className="text-neutral-400 text-lg text-center mb-3">Followed coins</p>
        {children}
      </div>

      {/* User block at the bottom */}
      <div className=" mt-auto">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 bg-neutral-300/10 hover:bg-neutral-300/15 text-neutral-300 hover:text-neutral-300"
            >
              <UserCircle2 className="h-5 w-5" />
              <span className="text-sm">admin1</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-neutral-950/10 backdrop-blur-lg border-neutral-300/15 rounded-2xl p-6 text-neutral-400">
						<DialogHeader className="flex flex-row items-center gap-1">
							<span>
								Hey, check my other work too, I pwomise it's great
							</span>
							<Heart className="size-4 mt-1"/>
							<Heart className="size-4 mt-1"/>
						</DialogHeader>
            <div className="flex flex-col gap-1">
              <Button
                variant="secondary"
                className="w-full justify-start gap-2 text-sm bg-transparent hover:bg-neutral-300/10 text-neutral-400 border border-neutral-300/25"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button
                variant="destructive"
                className="w-full justify-start gap-2 text-sm bg-transparent border border-red-500 text-red-500 hover:bg-red-500/10 hover:text-red-500/80"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
