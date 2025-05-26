import { glassmorphismStyle } from "@/styles/glassmorphism";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Heading,
  Center,
  Separator,
  Field,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginPageProps {
  onLogin: (data: LoginFormData) => void;
  onLineLogin: () => void;
  onRegister: () => void; // 新增
}

export const LoginPage = ({
  onLogin,
  onLineLogin,
  onRegister,
}: LoginPageProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const submitHandler = (data: LoginFormData) => {
    onLogin(data);
  };

  return (
    <Box maxW="md" mx="auto" my={10} p={6} rounded="xl" {...glassmorphismStyle}>
      <Center pb={4}>
        <Heading size={"2xl"}>登入</Heading>
      </Center>

      <form onSubmit={handleSubmit(submitHandler)}>
        <VStack align="stretch">
          <Controller
            name="username"
            control={control}
            rules={{ required: "請輸入帳號" }}
            render={({ field }) => (
              <Field.Root invalid={!!errors.username} required>
                <Field.Label>
                  帳號 <Field.RequiredIndicator />
                </Field.Label>
                <Input {...field} />
                {errors.username && (
                  <Field.ErrorText>{errors.username.message}</Field.ErrorText>
                )}
              </Field.Root>
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: "請輸入密碼" }}
            render={({ field }) => (
              <Field.Root invalid={!!errors.password} required>
                <Field.Label>
                  密碼
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input {...field} type="password" />
                {errors.password && (
                  <Field.ErrorText>{errors.password.message}</Field.ErrorText>
                )}
              </Field.Root>
            )}
          />

          <Button
            colorScheme="teal"
            type="submit"
            disabled={isSubmitting}
            width="100%"
          >
            登入
          </Button>
        </VStack>
      </form>

      <Separator my={6} />

      <VStack align="center">
        <Text color="gray.500" fontSize="sm">
          或使用其他方式登入
        </Text>

        <Button
          onClick={onLineLogin}
          bg="#06C755"
          color="white"
          _hover={{ bg: "#05B34F" }}
          width="100%"
        >
          使用 LINE 登入
        </Button>

        <Button
          onClick={onRegister}
          colorScheme="teal"
          fontSize="sm"
          width="100%"
        >
          還沒有帳號嗎？前往註冊
        </Button>
      </VStack>
    </Box>
  );
};
