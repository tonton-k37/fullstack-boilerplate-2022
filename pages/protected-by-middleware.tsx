import { Box, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useFindUserQuery } from "@codegen";
// this page is protected by /Users/kyoyam/Desktop/dev/match-app/middleware.ts
// more detail
//  https://nextjs.org/docs/advanced-features/middleware
//  https://next-auth.js.org/configuration/nextjs#middleware
const ProtectedByMiddleware = () => {
  const { data: session } = useSession();
  const { data, loading, error } = useFindUserQuery({
    variables: { id: session?.user.id || "" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <Box>
      <Text>you can use useSession to get session {data?.userById?.email}</Text>
      <Text>
        use the middleware instead of wrapping components by components checks
        session
      </Text>
    </Box>
  );
};

export default ProtectedByMiddleware;
