import { Spinner } from '@/components';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { IBlogPost } from '@/models/interfaces/IBlogPost';
import { useBlogPostsQuery } from '@/services/api/queries/useBlogPostsQuery';
import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

export const AddBlogPost = (): ReactElement => {
  return <Button>Add a Blog Post</Button>;
};

export default function Page(): ReactElement {
  const { data, isLoading, isError } = useBlogPostsQuery();
  const [isHekko, setHekko] = useState(false);

  if (isLoading) return <Spinner />;
  if (isError) return <span>Error</span>;

  return (
    <div className="flex flex-col container">
      <div className="flex items-center justify-between p-4 bg-gray-100 mt-4">
        <h1>Blog Posts</h1>
        <AddBlogPost />
      </div>
      <div className="pt-4 pb-8 flex flex-col gap-4">
        {data.map((post: IBlogPost) => (
          <Link key={post.id} to={`/blog-posts/${post.id}`}>
            <Card>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.isPublished.toString()}</CardDescription>
              </CardHeader>
              <CardContent>{post.content}</CardContent>
              <CardFooter className="flex flex-col items-start">
                <div>
                  <span>{post?.author?.email}</span>
                </div>
                <div>
                  <span>{post.createdAt.toString()}</span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      {isHekko ? (
        <div className="w-full h-50 flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <Button onClick={() => setHekko(true)}>Hekko</Button>
      )}
    </div>
  );
}
