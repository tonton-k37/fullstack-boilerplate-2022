import { Heading, VStack } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import type { NextPage } from "next/types";
import { Button } from "@components/atoms";

const SignIn: NextPage = () => {
  const handleOnClick = () =>
    signIn(undefined, {
      callbackUrl: "/",
    });

  const buttonProps = {
    onClick: handleOnClick,
  };

  return (
    <VStack>
      <Heading>please sign in</Heading>
      <Button buttonProps={buttonProps} />
    </VStack>
  );
};

export default SignIn;
