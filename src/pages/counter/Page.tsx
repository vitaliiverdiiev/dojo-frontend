import { Button } from "@/components/ui/button";
import { useCounterStore } from "@/services/store";
import { ReactElement } from "react";

export default function Page(): ReactElement {
  const { count, inc, dec } = useCounterStore();

  return (
    <div className="bordered centered container h-full">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={dec} className="rounded-xl">
          -
        </Button>
        <span className="text-2xl font-bold tabular-nums">{count}</span>
        <Button variant="outline" onClick={inc} className="rounded-xl">
          +
        </Button>
      </div>
    </div>
  );
}
