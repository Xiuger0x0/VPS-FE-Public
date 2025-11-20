import { Flex } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";

export const Page404 = () => {
  const appName = import.meta.env.VITE_APP_NAME;

  return (
    <>
      <Helmet>
        <title>{`${appName} | 404`}</title>
      </Helmet>
      <Flex
        w="100vw"
        h="100vh"
        alignItems="center"
        justifyContent="center"
        fontSize={"2xl"}
        fontWeight={"bold"}
      >
        404 Not Found | 這裡什麼都沒有
      </Flex>
    </>
  );
};
