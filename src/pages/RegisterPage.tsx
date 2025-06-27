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
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { MemberLevelText } from "@/types/MemberEnum";
import axios from "axios";
import { useState } from "react";
import { glassmorphismStyle } from "@/styles/glassmorphism";
import { IMemberForm } from "@/interface/IMemberForm";
import { useSetRecoilState } from "recoil";
import { IUser } from "@/interface/IUser";
import { userState } from "@/recoil/state";
import { BackendApi } from "@/js/bootstrap";

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
    <Box maxW="md" mx="auto" my={10} p={6} {...glassmorphismStyle}>
      <Center pb={4}>
        <Heading size={"2xl"}>註冊</Heading>
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack align="stretch">
          <Field.Root required>
            <Field.Label>
              電子郵件 (帳號) <Field.RequiredIndicator />
            </Field.Label>
            <Input
              type="email"
              placeholder="請輸入電子郵件"
              {...register("email", {
                required: "請輸入電子郵件",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "電子郵件格式不正確",
                },
              })}
            />
            {errors.email && (
              <Field.HelperText color="red.500">
                {errors.email.message}
              </Field.HelperText>
            )}
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              密碼 <Field.RequiredIndicator />
            </Field.Label>
            <Input
              type="password"
              placeholder="密碼"
              {...register("password", { required: "請輸入密碼" })}
            />
            {errors.password && (
              <Field.HelperText color="red.500">
                {errors.password.message}
              </Field.HelperText>
            )}
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              再次輸入密碼 <Field.RequiredIndicator />
            </Field.Label>
            <Input
              type="password"
              placeholder="請再次輸入密碼"
              {...register("password2", {
                required: "請再次輸入密碼",
                validate: (value) => value === password || "密碼輸入不一致",
              })}
            />
            {errors.password2 && (
              <Field.HelperText color="red.500">
                {errors.password2.message}
              </Field.HelperText>
            )}
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              暱稱 <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="暱稱" {...register("displayName")} />
          </Field.Root>

          <Field.Root>
            <Field.Label>電話</Field.Label>
            <Input placeholder="電話" {...register("phone")} />
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              會員等級 <Field.RequiredIndicator />
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
                    <Select.Trigger>
                      <Select.ValueText placeholder="請選擇會員等級" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {memberLevelOptions.items.map((option) => (
                          <Select.Item item={option} key={option.value}>
                            {option.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              )}
            />
            {errors.memberLevel && (
              <Field.HelperText color="red.500">
                {errors.memberLevel.message}
              </Field.HelperText>
            )}
          </Field.Root>

          {error && (
            <Alert.Root status="error">
              <Alert.Indicator />
              <Alert.Title>{error}</Alert.Title>
            </Alert.Root>
          )}

          {success && (
            <Alert.Root status="success">
              <Alert.Indicator />
              <Alert.Title>註冊成功！</Alert.Title>
            </Alert.Root>
          )}

          <Button colorScheme="teal" type="submit">
            送出
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
