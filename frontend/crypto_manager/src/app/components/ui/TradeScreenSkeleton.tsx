import CoinSummary from "../Sections/CoinSummary";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function TradeScreenSkeleton() {
  return (
    <div className="flex flex-col gap-8 p-4">
      {/* Left Section (Chart + Trade Info) */}
			<CoinSummary apiReference={null!} />
      <div className="md:row-span-2 flex flex-col gap-4">
        {/* Chart Card */}
        <Card className="bg-neutral-900/70 border border-neutral-800 backdrop-blur-sm">
          <CardContent className="p-4 space-y-4">
            <Skeleton className="h-6 w-1/4" /> {/* Chart Title */}
            <Skeleton className="h-[300px] w-full rounded-lg" /> {/* Chart */}
          </CardContent>
        </Card>

        {/* Trade Stats */}
        <Card className="bg-neutral-900/70 border border-neutral-800 backdrop-blur-sm">
          <CardContent className="p-4 space-y-3">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-5 w-full" />
          </CardContent>
        </Card>
      </div>

      {/* Right Panel (Orders or Summary) */}
      <div className="flex flex-col gap-4">
        <Card className="bg-neutral-900/70 border border-neutral-800 backdrop-blur-sm">
          <CardContent className="p-4 space-y-3">
            <Skeleton className="h-5 w-1/3" />
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </CardContent>
        </Card>

        <Card className="bg-neutral-900/70 border border-neutral-800 backdrop-blur-sm">
          <CardContent className="p-4 space-y-3">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-5 w-1/2" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
