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
  title?: string;
  description?: string;
  triggerLabel?: string;
  children: ReactNode;
};

export function ChartDialog({
  title = "Chart View",
  description = "View detailed candlestick chart",
  triggerLabel = "View Chart",
  children,
}: ChartDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="py-3 group flex gap-3 items-center justify-center col-span-2 h-full bg-neutral-300/5 hover:bg-neutral-300/10 border border-neutral-300/15 rounded-2xl transition text-neutral-400 hover:text-neutral-400"
          variant={"secondary"}
        >
          <LineChart className="w-6 h-6" />
          <span className="text-xl tracking-wide">{triggerLabel}</span>
        </Button>
      </DialogTrigger>

			<DialogContent className="min-h-[95dvh] min-w-[90dvw] overflow-y-auto bg-neutral-950/10 backdrop-blur-xl border-neutral-300/15 rounded-2xl p-6 pb-8 text-neutral-400">
        <DialogHeader>
	          <DialogDescription className="text-3xl text-center text-neutral-400">{description}</DialogDescription>
        </DialogHeader>

        <div className="mt-4">{children}</div>

      </DialogContent>
    </Dialog>
  );
}
