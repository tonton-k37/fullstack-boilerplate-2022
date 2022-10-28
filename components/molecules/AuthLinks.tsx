import { Button as ChakraButton } from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import NextLink from "next/link";
import { memo } from "react";
import { Button } from "@components/atoms";

const AuthLinks = memo(() => {
  const { data: session } = useSession();

  const buttonProps = {
    onClick: () => signOut(),
  };

  if (session) {
    return <Button buttonProps={buttonProps} text="sign out" />;
  }

  return (
    <>
      <NextLink href="./signup" passHref>
        <ChakraButton as="a">sign up</ChakraButton>
      </NextLink>
      <NextLink href="./signin" passHref>
        <ChakraButton as="a">sign in</ChakraButton>
      </NextLink>
    </>
  );
});

export { AuthLinks };
