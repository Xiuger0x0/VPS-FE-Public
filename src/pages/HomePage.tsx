import { Box, VStack } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Giscus from "@giscus/react";

export const HomePage = () => {
  const appName = import.meta.env.VITE_APP_NAME;
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>
          {appName} | {t("page_title_home")}
        </title>
      </Helmet>
      <Box>
        <VStack align="stretch">
          <Giscus
            id="comments"
            repo="xiuger0x0/giscus"
            repoId="R_kgDOOWgpEA"
            category="General"
            categoryId="DIC_kwDOOWgpEM4Co7CA"
            reactionsEnabled="0"
            mapping="specific"
            strict="1"
            term="VPS留言板"
            emitMetadata="1"
            theme={"noborder_dark"}
            lang="zh-TW"
            loading="lazy"
          />
        </VStack>
      </Box>
    </>
  );
};
