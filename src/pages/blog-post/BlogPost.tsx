import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from '@/configs/axios';
import { IBlogPost } from '@/models/interfaces/IBlogPost';

const fetchBlogPost = async (postId: string) => {
  // Replace this with your actual API call
  const response = await axios.get<IBlogPost>(`/blog-posts/${postId}`);
  return response;
};

const BlogPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { data, error, isLoading } = useQuery({
    queryKey: [`blog-post-${postId || 1}`],
    queryFn: () => fetchBlogPost(postId || '1'),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blog post</div>;

  return (
    <div className="container">
      <div>
        <h1 className="text-3xl font-bold mb-2">{data?.data.title}</h1>
        <p className="text-gray-700">{data?.data.content}</p>
        <p>{data?.data.author?.firstName}</p>
        <div>
          <span>
            created: <b>{data?.data.createdAt.toString()}</b>
          </span>
          <span>
            updated: <b>{data?.data.updatedAt.toString()}</b>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
