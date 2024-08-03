import axios from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";

const fetchTodos = async () => {
  const response = await axios.get("/todos", {});
  return response.data;
};

export const useTodosQuery = () => {
  return useQuery({
    queryFn: fetchTodos,
    queryKey: ["todos"],
  });
};
