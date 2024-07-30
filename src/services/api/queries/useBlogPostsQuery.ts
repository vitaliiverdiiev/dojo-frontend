import axios from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';

const fetchBlogPosts = async () => {
  const response = await axios.get('/blog-posts', {});
  return response.data;
};

export const useBlogPostsQuery = () => {
  return useQuery({
    queryFn: fetchBlogPosts,
    queryKey: ['blog-posts'],
  });
};
