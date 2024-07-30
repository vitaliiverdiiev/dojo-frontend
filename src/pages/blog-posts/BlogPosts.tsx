import { Button } from '@/components/ui/button';
import { useBlogPostsQuery } from '@/services/api/queries/useBlogPostsQuery';
import { ReactElement } from 'react';

export default function Page(): ReactElement {
  const { data, isLoading, isError } = useBlogPostsQuery();

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error</span>;

  console.log({ data });

  return (
    <div className="flex flex-col container">
      <h1>Blog Posts</h1>
      <Button>Hekko</Button>
    </div>
  );
}
