import { nginxApi } from "@/js/bootstrap";
import { countState } from "@/recoil/state";
import {
  Box,
  Button,
  Text,
  Heading,
  VStack,
  HStack,
  Spacer,
  Input,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import Giscus from "@giscus/react";

export const HomePage = () => {
  const appName = import.meta.env.VITE_APP_NAME;
  const [globalCount, setGlobalCount] = useRecoilState(countState); // 使用 Recoil 狀態
  const { t } = useTranslation();

  const ApiTest = () => {
    nginxApi
      .get("/test")
      .then((res) => {
        alert("API 回應：" + JSON.stringify(res.data)); // 成功回應
      })
      .catch((err) => {
        alert("API 錯誤:" + err); // 錯誤處理
      });
  };

  return (
    <>
      <Helmet>
        <title>
          {appName} | {t("page_title_home")}
        </title>
      </Helmet>
      <Box>
        <Heading as="h1" mb={5}>
          歡迎來到我的部落格
        </Heading>
        <VStack align="stretch">
          <Box>
            <Heading as="h2" size="lg" mt={4}>
              部落格標題
            </Heading>
            <Text mt={2}>
              這是一段部落格的介紹文字，簡單描述這篇文章的內容。
            </Text>
            <Spacer my={4} />
            <Input value={globalCount} disabled />
            <Spacer my={4} />
            <HStack>
              <Button onClick={() => setGlobalCount(globalCount + 1)}>
                Increment
              </Button>
              <Button onClick={ApiTest}>API測試</Button> {/* API 測試按鈕 */}
            </HStack>
          </Box>

          {/* <div>
            <h1>React + Laravel LINE Pay 測試</h1>
            <LinePayButton />
          </div> */}

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
