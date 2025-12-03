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
  Container,
  Icon,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { FaLine, FaUser, FaLock } from "react-icons/fa";

interface LoginFormData {
  email: string;
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
    <Box bg="#0f0f0f" minH="calc(100vh - 64px)" display="flex" alignItems="center" justifyContent="center">
      <Container maxW="md">
        <Box
          p={8}
          borderRadius="2xl"
          bg="whiteAlpha.50"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          backdropFilter="blur(10px)"
          shadow="xl"
        >
          <Center pb={8} flexDirection="column" gap={2}>
            <Heading size="2xl" color="white" letterSpacing="wide">WELCOME BACK</Heading>
            <Text color="gray.400">Sign in to continue</Text>
          </Center>

          <form onSubmit={handleSubmit(submitHandler)}>
            <VStack gap={6} align="stretch">
              <Controller
                name="email"
                control={control}
                rules={{ required: "請輸入帳號" }}
                render={({ field }) => (
                  <Field.Root invalid={!!errors.email} required>
                    <Field.Label color="gray.300">
                      <Icon mr={2} color="#FF6600"><FaUser /></Icon>
                      帳號
                    </Field.Label>
                    <Input
                      {...field}
                      bg="whiteAlpha.50"
                      borderColor="whiteAlpha.200"
                      color="white"
                      _hover={{ borderColor: "#FF6600" }}
                      _focus={{ borderColor: "#FF6600", boxShadow: "0 0 0 1px #FF6600" }}
                      placeholder="Enter your email"
                      _placeholder={{ color: "gray.600" }}
                    />
                    {errors.email && (
                      <Field.ErrorText color="red.400">{errors.email.message}</Field.ErrorText>
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
                    <Field.Label color="gray.300">
                      <Icon mr={2} color="#FF6600"><FaLock /></Icon>
                      密碼
                    </Field.Label>
                    <Input
                      {...field}
                      type="password"
                      bg="whiteAlpha.50"
                      borderColor="whiteAlpha.200"
                      color="white"
                      _hover={{ borderColor: "#FF6600" }}
                      _focus={{ borderColor: "#FF6600", boxShadow: "0 0 0 1px #FF6600" }}
                      placeholder="Enter your password"
                      _placeholder={{ color: "gray.600" }}
                    />
                    {errors.password && (
                      <Field.ErrorText color="red.400">{errors.password.message}</Field.ErrorText>
                    )}
                  </Field.Root>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                width="100%"
                bg="#FF6600"
                color="white"
                size="lg"
                _hover={{ bg: "#E65C00", transform: "translateY(-2px)", shadow: "lg" }}
                transition="all 0.2s"
                mt={2}
              >
                登入
              </Button>
            </VStack>
          </form>

          <Separator my={8} borderColor="whiteAlpha.200" />

          <VStack gap={4}>
            <Text color="gray.500" fontSize="sm">
              或使用其他方式登入
            </Text>

            <Button
              onClick={onLineLogin}
              bg="#06C755"
              color="white"
              _hover={{ bg: "#05B34F", transform: "translateY(-2px)" }}
              width="100%"
              size="lg"
            >
              <Icon mr={2}><FaLine /></Icon>
              使用 LINE 登入
            </Button>

            <Button
              onClick={onRegister}
              variant="ghost"
              color="gray.400"
              _hover={{ color: "white", bg: "whiteAlpha.100" }}
              width="100%"
              size="sm"
            >
              還沒有帳號嗎？前往註冊
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};
