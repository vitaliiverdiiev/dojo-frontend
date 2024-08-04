import axios from "@/configs/axios";
import { useMutation } from "@tanstack/react-query";

interface SignInData {
  email: string;
  password: string;
}

const signIn = async (data: SignInData) => {
  const response = await axios.post("/authentication/sign-in", data);
  return response.data;
};

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: signIn,
    mutationKey: ["sign-in"],
  });
};
