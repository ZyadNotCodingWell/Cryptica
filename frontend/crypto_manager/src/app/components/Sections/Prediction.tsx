import { useState } from "react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Loader2, LineChart } from "lucide-react"

export function ForecastDialog() {
  const [loading, setLoading] = useState(false)
  const [forecast, setForecast] = useState<string | null>(null)

  const handleFetch = async () => {
    setLoading(true)
    const res = await fetch("http://localhost:8000/predict")
    const data = await res.text()
    setForecast(data)
    setLoading(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
			  <button	className="py-3 group flex gap-3 items-center justify-center border-0 border-b-2 border-neutral-300/5 w-full h-full text-neutral-300/30 hover:text-neutral-300/70 transition"		  >
			    <div className="relative flex size-2 items-center justify-center saturate-0 brightness-50 group-hover:brightness-75 transition">
			      <div className="absolute size-2 inset-0 bg-lime-500 rounded-full blur-sm opacity-50 translate-y-px" />
			      <div className="absolute size-2 inset-0 bg-lime-500 rounded-full opacity-80 outline outline-2 outline-lime-700 translate-y-px" />
			    </div>
			    <span className="text-base tracking-wide">Forecast</span>
			  </button>
			</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Forecast Preview</DialogTitle>
          <DialogDescription>
            This is a sample prediction. We&apos;ll soon plug in LSTM logic.
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-[80px] flex items-center justify-center text-center">
          {loading ? (
            <Loader2 className="animate-spin text-blue-500" size={24} />
          ) : (
            <span className="text-lg text-green-500">
              {forecast || "No forecast yet."}
            </span>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button type="button" onClick={handleFetch}>
            Get Forecast
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
