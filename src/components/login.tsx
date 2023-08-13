import { useMutation } from "react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Button,
  Input,
  useToast,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Inputs, schema } from "../../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import useUser from "../contexts/userContext";
import useToken from "../hooks/token";

function Login() {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const navigate = useNavigate();
  const { setToken } = useToken();

  const { setAuthorized } = useUser();
  const login = useMutation(
    (body: { username: string; password: string }) =>
      axios.post(`http://localhost:8080/login`, body),
    {
      onSuccess: ({ data }) => {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setAuthorized(true);
        toast({
          title: "Logged in",
          description: "Login Successful",
          status: "success",
        });
        navigate("/albums");
      },
      onError: () => {
        toast({
          title: "Not logged in",
          description: "Login Unsuccessful",
          status: "error",
        });
      },
    }
  );

  const submit = (data: Inputs) => {
    login.mutate(data);
    reset();
  };

  return (
    <VStack>
      <Text as="h2">Login Page</Text>
      <form typeof="onSubmit" onSubmit={handleSubmit(submit)}>
        <FormControl isRequired>
          <FormLabel>username</FormLabel>
          <Input {...register("username")} />
          <FormErrorMessage style={{ color: "red" }}>
            {errors.username?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>password</FormLabel>
          <Input {...register("password")} />
          <FormErrorMessage style={{ color: "red" }}>
            {errors.password?.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          mt={10}
          size="lg"
          variant="solid"
          colorScheme="blue"
          type="submit"
          isDisabled={!isValid}
        >
          Login
        </Button>
      </form>
    </VStack>
  );
}

export default Login;
