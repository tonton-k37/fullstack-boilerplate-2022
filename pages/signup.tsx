import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";

import type { NextPage } from "next/types";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useCreateUserMutation } from "../generated/types";
import type { MutationCreateUserArgs } from "@codegen";
import { yupSchemaForSignUp } from "@lib/yup";

const SignUp: NextPage = () => {
  const [createUser] = useCreateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MutationCreateUserArgs>({
    resolver: yupResolver(yupSchemaForSignUp),
  });

  const registerUser = useCallback(
    async (_value: MutationCreateUserArgs) => {
      try {
        const value = { ..._value, provider: "Credentials" };

        await createUser({
          variables: value,
        });

        signIn("credentials", { ..._value, callbackUrl: "/" });
      } catch (error) {
        console.warn(error);
        alert("failed to create user");
      }
    },
    [createUser]
  );

  return (
    <VStack>
      <form onSubmit={handleSubmit(registerUser)}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email address</FormLabel>
          <Input type="email" {...register("email", { required: true })} />
          {!errors.email ? (
            <FormHelperText>
              Enter the email you&apos;d like to receive the newsletter on.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>password</FormLabel>
          <Input
            type="password"
            {...register("password", { required: true })}
          />
          {!errors.password ? (
            <FormHelperText>
              Enter the email you&apos;d like to receive the newsletter on.
            </FormHelperText>
          ) : (
            <FormErrorMessage>password is required.</FormErrorMessage>
          )}
        </FormControl>
        <Button type="submit">Sign Up</Button>
      </form>
    </VStack>
  );
};

export default SignUp;
