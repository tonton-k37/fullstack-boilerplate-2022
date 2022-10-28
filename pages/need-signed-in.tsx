import { Heading, VStack } from "@chakra-ui/react";
import type { Session } from "next-auth/core/types";
import { unstable_getServerSession } from "next-auth/next";

import type { GetServerSideProps, NextPage } from "next/types";
import { authOptions } from "./api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

const AuthPage: NextPage<{ session: Session }> = ({ session }) => {
  return (
    <VStack>
      <Heading>This is auth page</Heading>
      {/* <Text>Hello {session.user?.email}</Text> */}
    </VStack>
  );
};

export default AuthPage;
