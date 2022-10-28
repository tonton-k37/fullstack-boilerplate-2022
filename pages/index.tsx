import { VStack, Button as ChakraButton, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import NextLink from "next/link";
import { AuthLinks } from "@components/molecules";

const Home: NextPage = () => {
  return (
    <VStack spacing="8">
      <Heading as="h1">Hello World!</Heading>
      <AuthLinks />
      <NextLink href="./need-signed-in" passHref>
        <ChakraButton as="a">
          session checked in getServerSideProps page
        </ChakraButton>
      </NextLink>
      <NextLink href="./protected-by-middleware" passHref>
        <ChakraButton as="a">middleware protected page</ChakraButton>
      </NextLink>
    </VStack>
  );
};

export default Home;
