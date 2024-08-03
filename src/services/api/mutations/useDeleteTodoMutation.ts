import axios from "@/configs/axios";
import { useMutation } from "@tanstack/react-query";

const deleteTodo = async (id: number) => {
  const response = await axios.delete("/todos/" + id);
  return response.data;
};

export const useDeleteTodoMutation = () => {
  return useMutation({
    mutationFn: deleteTodo,
  });
};
