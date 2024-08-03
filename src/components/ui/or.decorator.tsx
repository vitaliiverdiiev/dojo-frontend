import { ReactElement } from "react";
import { Separator } from "./separator";

export const OrDecorator = (): ReactElement => {
  return (
    <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4">
      <Separator />
      <span>or</span>
      <Separator />
    </div>
  );
};
