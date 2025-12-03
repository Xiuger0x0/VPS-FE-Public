import {
  Box,
  Button,
  Input,
  VStack,
  Alert,
  Portal,
  Select,
  createListCollection,
  Field,
  Heading,
  Center,
  Container,
  Icon,
  Text,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { MemberLevelText } from "@/types/MemberEnum";
import axios from "axios";
import { useState } from "react";
import { IMemberForm } from "@/interface/IMemberForm";
import { useSetRecoilState } from "recoil";
import { IUser } from "@/interface/IUser";
import { userState } from "@/recoil/state";
import { BackendApi } from "@/js/bootstrap";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaCrown } from "react-icons/fa";

const memberLevelOptions = createListCollection({
  items: Object.entries(MemberLevelText).map(([key, label]) => ({
    label, // 中文
    value: key, // 英文 key，傳給後端
  })),
});

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      password2: "",
      displayName: "",
      phone: "",
      memberLevel: ["BASIC"],
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const setUser = useSetRecoilState<IUser | null>(userState);

  const password = watch("password");

  const onSubmit = async (data: IMemberForm) => {
    try {
      setError(null);
      setSuccess(false);

      // 註冊且直接拿回登入資訊（token, displayName, email）
      const res = await BackendApi.post("/users/register", data);

      setSuccess(true);

      // 直接用註冊回傳的結果當作登入資訊
      const user = {
        displayName: res.data.displayName,
        userEmail: res.data.email,
        token: res.data.token,
        userId: null, // 如果後端沒回傳可設null或不設
        pictureUrl: null, // 同上
        is_admin: false, // 通常新註冊預設不是管理員
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.token);

      setUser(user);

      // 你可以直接跳轉或更新UI
      window.location.href = "/";
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data || err.message || "註冊失敗，請稍後再試";
        setError(message);
      } else {
        setError("註冊失敗，請稍後再試");
      }
    }
  };

  return (
    <Box bg="#0f0f0f" minH="calc(100vh - 64px)" display="flex" alignItems="center" justifyContent="center" py={12}>
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
            <Heading size="2xl" color="white" letterSpacing="wide">CREATE ACCOUNT</Heading>
            <Text color="gray.400">Join our community today</Text>
          </Center>

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={5} align="stretch">
              <Field.Root required invalid={!!errors.email}>
                <Field.Label color="gray.300">
                  <Icon mr={2} color="#FF6600"><FaEnvelope /></Icon>
                  電子郵件 (帳號)
                </Field.Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  bg="whiteAlpha.50"
                  borderColor="whiteAlpha.200"
                  color="white"
                  _hover={{ borderColor: "#FF6600" }}
                  _focus={{ borderColor: "#FF6600", boxShadow: "0 0 0 1px #FF6600" }}
                  _placeholder={{ color: "gray.600" }}
                  {...register("email", {
                    required: "請輸入電子郵件",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "電子郵件格式不正確",
                    },
                  })}
                />
                {errors.email && (
                  <Field.ErrorText color="red.400">
                    {errors.email.message}
                  </Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root required invalid={!!errors.password}>
                <Field.Label color="gray.300">
                  <Icon mr={2} color="#FF6600"><FaLock /></Icon>
                  密碼
                </Field.Label>
                <Input
                  type="password"
                  placeholder="Create a password"
                  bg="whiteAlpha.50"
                  borderColor="whiteAlpha.200"
                  color="white"
                  _hover={{ borderColor: "#FF6600" }}
                  _focus={{ borderColor: "#FF6600", boxShadow: "0 0 0 1px #FF6600" }}
                  _placeholder={{ color: "gray.600" }}
                  {...register("password", { required: "請輸入密碼" })}
                />
                {errors.password && (
                  <Field.ErrorText color="red.400">
                    {errors.password.message}
                  </Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root required invalid={!!errors.password2}>
                <Field.Label color="gray.300">
                  <Icon mr={2} color="#FF6600"><FaLock /></Icon>
                  再次輸入密碼
                </Field.Label>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  bg="whiteAlpha.50"
                  borderColor="whiteAlpha.200"
                  color="white"
                  _hover={{ borderColor: "#FF6600" }}
                  _focus={{ borderColor: "#FF6600", boxShadow: "0 0 0 1px #FF6600" }}
                  _placeholder={{ color: "gray.600" }}
                  {...register("password2", {
                    required: "請再次輸入密碼",
                    validate: (value) => value === password || "密碼輸入不一致",
                  })}
                />
                {errors.password2 && (
                  <Field.ErrorText color="red.400">
                    {errors.password2.message}
                  </Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root required invalid={!!errors.displayName}>
                <Field.Label color="gray.300">
                  <Icon mr={2} color="#FF6600"><FaUser /></Icon>
                  暱稱
                </Field.Label>
                <Input
                  placeholder="Your display name"
                  bg="whiteAlpha.50"
                  borderColor="whiteAlpha.200"
                  color="white"
                  _hover={{ borderColor: "#FF6600" }}
                  _focus={{ borderColor: "#FF6600", boxShadow: "0 0 0 1px #FF6600" }}
                  _placeholder={{ color: "gray.600" }}
                  {...register("displayName", { required: "請輸入暱稱" })}
                />
                {errors.displayName && (
                  <Field.ErrorText color="red.400">
                    {errors.displayName.message}
                  </Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root>
                <Field.Label color="gray.300">
                  <Icon mr={2} color="#FF6600"><FaPhone /></Icon>
                  電話
                </Field.Label>
                <Input
                  placeholder="Your phone number (optional)"
                  bg="whiteAlpha.50"
                  borderColor="whiteAlpha.200"
                  color="white"
                  _hover={{ borderColor: "#FF6600" }}
                  _focus={{ borderColor: "#FF6600", boxShadow: "0 0 0 1px #FF6600" }}
                  _placeholder={{ color: "gray.600" }}
                  {...register("phone")}
                />
              </Field.Root>

              <Field.Root required invalid={!!errors.memberLevel}>
                <Field.Label color="gray.300">
                  <Icon mr={2} color="#FF6600"><FaCrown /></Icon>
                  會員等級
                </Field.Label>
                <Controller
                  name="memberLevel"
                  control={control}
                  rules={{
                    validate: (value) =>
                      (Array.isArray(value) && value.length > 0) ||
                      "請選擇會員等級",
                  }}
                  render={({ field }) => (
                    <Select.Root
                      name={field.name}
                      value={field.value}
                      onValueChange={(e) => setValue("memberLevel", e.value)}
                      onInteractOutside={() => field.onBlur()}
                      collection={memberLevelOptions}
                    >
                      <Select.HiddenSelect />
                      <Select.Control>
                        <Select.Trigger
                          bg="whiteAlpha.50"
                          borderColor="whiteAlpha.200"
                          color="white"
                          _hover={{ borderColor: "#FF6600" }}
                        >
                          <Select.ValueText placeholder="Select membership level" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator color="gray.400" />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Portal>
                        <Select.Positioner>
                          <Select.Content bg="#1a1a1a" borderColor="whiteAlpha.200" color="white">
                            {memberLevelOptions.items.map((option) => (
                              <Select.Item
                                item={option}
                                key={option.value}
                                _hover={{ bg: "whiteAlpha.100", color: "#FF6600" }}
                                bg="transparent"
                                color="gray.300"
                                cursor="pointer"
                              >
                                {option.label}
                                <Select.ItemIndicator color="#FF6600" />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
                  )}
                />
                {errors.memberLevel && (
                  <Field.ErrorText color="red.400">
                    {errors.memberLevel.message}
                  </Field.ErrorText>
                )}
              </Field.Root>

              {error && (
                <Alert.Root status="error" variant="subtle" bg="red.900" color="red.200" borderColor="red.800" borderWidth="1px">
                  <Alert.Indicator color="red.400" />
                  <Alert.Title>{error}</Alert.Title>
                </Alert.Root>
              )}

              {success && (
                <Alert.Root status="success" variant="subtle" bg="green.900" color="green.200" borderColor="green.800" borderWidth="1px">
                  <Alert.Indicator color="green.400" />
                  <Alert.Title>註冊成功！</Alert.Title>
                </Alert.Root>
              )}

              <Button
                type="submit"
                width="100%"
                bg="#FF6600"
                color="white"
                size="lg"
                _hover={{ bg: "#E65C00", transform: "translateY(-2px)", shadow: "lg" }}
                transition="all 0.2s"
                mt={4}
              >
                註冊帳號
              </Button>
            </VStack>
          </form>
        </Box>
      </Container>
    </Box>
  );
};
