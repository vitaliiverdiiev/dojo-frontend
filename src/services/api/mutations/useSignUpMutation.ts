import axios from "@/configs/axios";
import { useMutation } from "@tanstack/react-query";

interface SignUpData {
  email: string;
  password: string;
}

const signUp = async (data: SignUpData) => {
  const response = await axios.post("/authentication/sign-up", data);
  return response.data;
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: signUp,
    mutationKey: ["sign-up"],
  });
};
