import axios from "@/configs/axios";
import { useMutation } from "@tanstack/react-query";

interface CreateTodoDto {
  title: string;
}

const createTodo = async (newTodo: CreateTodoDto) => {
  const response = await axios.post("/todos", newTodo);
  return response.data;
};

export const useCreateTodoMutation = () => {
  return useMutation({
    mutationFn: createTodo,
  });
};
