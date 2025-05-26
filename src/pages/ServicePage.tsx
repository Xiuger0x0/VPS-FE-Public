import { Box } from "@chakra-ui/react";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export const ServicePage: React.FC = () => {
  const appName = import.meta.env.VITE_APP_NAME;

  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>
          {appName} | {t("page_title_service")}
        </title>
      </Helmet>
      <Box>
        <h1>Service Page</h1>
        <p>
          Welcome to the Service Page. Here you can find information about our
          services.
        </p>
      </Box>
    </>
  );
};
