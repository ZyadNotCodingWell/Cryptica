"use client";
import { ReactNode } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { LineChart } from "lucide-react";

type ChartDialogProps = {
  triggerLabel?: string;
  children: ReactNode;
};

export function ChartDialog({
  triggerLabel = "View Chart",
  children,
}: ChartDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className=" transition py-3 group flex gap-3 items-center justify-center col-span-2 w-full h-full bg-neutral-300/5 hover:bg-neutral-300/10 duration-500 border border-neutral-300/15 rounded-xl text-neutral-400 hover:text-neutral-400"
          variant={"secondary"}
        >
          <LineChart className="w-6 h-6" />
          <span className="text-xl tracking-wide">{triggerLabel}</span>
        </Button>
      </DialogTrigger>

			<DialogContent className="min-h-[60dvh] min-w-[90dvw] h-fit py-16 overflow-y-auto bg-neutral-950 backdrop-blur-xl border-neutral-300/15 rounded-xl p-6 pb-8 text-neutral-400">
        <div className="mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
