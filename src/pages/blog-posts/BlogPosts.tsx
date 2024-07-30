import { Button } from '@/components/ui/button';
import { ReactElement } from 'react';

export default function Page(): ReactElement {
  return (
    <div className="flex flex-col container">
      <h1>Blog Posts</h1>
      <Button>Hekko</Button>
    </div>
  );
}
