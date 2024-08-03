import { ReactElement } from 'react';

export const Spinner = (): ReactElement => {
  return (
    <div className="w-full min-h-10 h-full flex justify-center items-center">
      <div className="size-8 rounded-full bg-gray-600 animate-load-pulse"></div>
    </div>
  );
};
