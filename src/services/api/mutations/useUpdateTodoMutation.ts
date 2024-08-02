import axios from "@/configs/axios";
import { useMutation } from "@tanstack/react-query";

interface UpdateTodoDto {
  id: number;
  title?: string;
  content?: string;
  isCompleted?: boolean;
  isImportant?: boolean;
}

const updateTodo = async (updatedTodo: UpdateTodoDto) => {
  const response = await axios.patch("/todos/" + updatedTodo.id, updatedTodo);
  return response.data;
};

export const useUpdateTodoMutation = () => {
  return useMutation({
    mutationFn: updateTodo,
  });
};
