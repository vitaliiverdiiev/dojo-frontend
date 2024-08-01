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
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export const AddBlogPost = (): ReactElement => {
  return <Button>Add a Blog Post</Button>;
};

export default function Page(): ReactElement {
  const { data, isLoading, isError } = useBlogPostsQuery();

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error</span>;

  console.log({ data });

  return (
    <div className="flex flex-col container">
      <div className="flex items-center justify-between p-4 bg-gray-100">
        <h1>Blog Posts</h1>
        <AddBlogPost />
      </div>
      <div className="pt-4 pb-8 flex flex-col gap-4">
        {data.map((post: IBlogPost) => (
          <Link to={`/blog-posts/${post.id}`}>
            <Card key={post.id}>
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
      <Button>Hekko</Button>
    </div>
  );
}
