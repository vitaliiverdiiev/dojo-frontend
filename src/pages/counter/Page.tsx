import { Button } from "@/components/ui/button";
import { ReactElement, useState } from "react";

export default function Page(): ReactElement {
  const [counter, setCounter] = useState(0);

  const increment = () => setCounter((counter) => counter + 1);
  const decrement = () =>
    setCounter((counter) => {
      if (counter === 0) return 0;

      return counter - 1;
    });

  return (
    <div className="bordered centered container h-full">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={decrement} className="rounded-xl">
          -
        </Button>
        <span className="text-2xl font-bold tabular-nums">{counter}</span>
        <Button variant="outline" onClick={increment} className="rounded-xl">
          +
        </Button>
      </div>
    </div>
  );
}
