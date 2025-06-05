/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Input,
  HStack,
  Portal,
  Table,
  Tabs,
  createListCollection,
  VStack,
  Field,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster";
import { BackendApi } from "@/js/bootstrap";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

/**
 *
 * 
 * {
  "userId": 1,
  "phoneNumber": "0912345678",
  "userName": "通話王",
  "planName": "語音通話方案",
  "baseFee": 699,
  "callFee": 17.616666666,
  "smsFee": 2,
  "dataFee": 45.59,
  "discount": 100,
  "totalAmount": 664.206666666,
  "issuedAt": "2025-05-31T10:00:00",
  "paidAt": null
}

  {
  "id": 0,
  "user": {
    "id": 1,
    "name": "通話王",
    "phoneNumber": "0912345678",
    "subscriberType": "POSTPAID",
    "currentPlan": {
      "id": 3,
      "name": "語音通話方案",
      "billingType": "POSTPAID",
      "dataPolicy": "LIMITED",
      "monthlyFee": 699,
      "includedSms": 20,
      "includedDataMb": 1024,
      "smsRate": 2,
      "callRatePerMin": 1,
      "overagePolicy": "BILLABLE",
      "throttleAfterMb": null,
      "throttleSpeedKbps": null,
      "effectiveFrom": "2025-06-05",
      "createdAt": "2025-06-05T12:20:02.697071"
    },
    "prepaidBalance": null,
    "status": "ACTIVE",
    "createdAt": "2025-06-05T12:27:08.062768"
  },
  "periodStart": "2025-06-01",
  "periodEnd": "2025-06-30",
  "baseFee": 699,
  "callFee": 25.55,
  "smsFee": 0,
  "dataFee": 911.8000000000001,
  "discountTotal": 0,
  "totalAmount": 1636.3500000000001,
  "issuedAt": "2025-06-05T12:30:00.505005",
  "paidAt": null
}
 */

// ---- Types ----
type UserInfo = {
  id: number;
  number: number;
  userId: number;
  phoneNumber: string;
  name: string;
  planName: string;
  createdAt: string;
};

type CallLogDto = {
  id: number;
  receiver: string;
  timestamp: string;
  durationMinutes: number;
};

type SmsRecordDto = {
  phoneNumber: string;
  recipient: string;
  sentAt: string;
  status: string;
  userId: number;
};

type DataUsageSummaryDto = {
  downloadMb: number;
  phoneNumber: string;
  totalMb: number;
  uploadMb: number;
  userId: number;
  userName: string;
};

type InvoiceDetailsDto = {
  userId: number;
  phoneNumber: string;
  userName: string;
  planName: string;
  baseFee: number;
  callFee: number;
  smsFee: number;
  dataFee: number;
  discount: number;
  totalAmount: number;
  issuedAt: string;
  paidAt?: string | null; // 可為 null
};

export const TeleDashboard = () => {
  // 👉 狀態
  const [activeTab, setActiveTab] = useState("user");
  const [queryPhone, setQueryPhone] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userList, setUserList] = useState<UserInfo[]>([]);
  const [callRecords, setCallRecords] = useState<CallLogDto[]>([]);
  const [smsRecords, setSmsRecords] = useState<SmsRecordDto[]>([]);
  const [dataRecords, setDataRecords] = useState<DataUsageSummaryDto[]>([]);
  const [bills, setBills] = useState<InvoiceDetailsDto[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // 月份從 0 開始，所以要加 1
  const [selectedPhone, setSelectedPhone] = useState<string>("");
  const [year, setYear] = useState<number>(currentYear);
  const [month, setMonth] = useState<number>(currentMonth);

  const fetchBills = async (
    phone?: string,
    year = currentYear,
    month = currentMonth
  ) => {
    try {
      const res = await BackendApi.get("/telecom/bills", {
        params: { phone, year, month },
      });
      setBills(res.data);
    } catch (err) {
      toaster.create({
        title: "查詢帳單失敗",
        description: "請確認查詢條件或稍後再試。",
        type: "error",
      });
      setBills([]);
    }
  };

  const simulateAllBills = async () => {
    try {
      const res = await BackendApi.post("/telecom/generate-bills");

      const transformed = res.data.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (b: any): InvoiceDetailsDto => ({
          userId: b.user.id,
          phoneNumber: b.user.phoneNumber,
          userName: b.user.name,
          planName: b.user.currentPlan.name,
          baseFee: b.baseFee,
          callFee: b.callFee,
          smsFee: b.smsFee,
          dataFee: b.dataFee,
          discount: b.discountTotal,
          totalAmount: b.totalAmount,
          issuedAt: b.issuedAt,
          paidAt: b.paidAt ?? null,
        })
      );

      setBills(transformed);

      toaster.create({
        title: "模擬成功",
        description: "帳單已產生。",
        type: "success",
      });
    } catch (err) {
      toaster.create({
        title: "模擬失敗",
        description: "無法產生帳單，請稍後再試。",
        type: "error",
      });
    }
  };

  const fetchAllUsers = async () => {
    try {
      const [usersRes, callRes, smsRes, dataRes] = await Promise.all([
        BackendApi.get("/telecom/users"),
        BackendApi.get("/telecom/calls"), // 不傳參數，撈全部通話
        BackendApi.get("/telecom/sms"), // 不傳參數，撈全部簡訊
        BackendApi.get("/telecom/data-usage"), // 不傳參數，撈全部流量
        fetchBills(), // 新增：查詢帳單
      ]);

      setUserList(usersRes.data);
      setUserInfo(null); // 清空單一用戶資料

      setCallRecords(callRes.data);
      setSmsRecords(smsRes.data);
      setDataRecords(dataRes.data);
    } catch (err) {
      toaster.create({
        title: "查詢失敗",
        description: "無法查詢用戶與使用紀錄，請稍後再試。",
        type: "error",
        duration: 3000,
      });
      setUserList([]);
      setCallRecords([]);
      setSmsRecords([]);
      setDataRecords([]);
    }
  };

  // 👉 查詢用戶
  const fetchUserInfo = async (queryPhone?: string) => {
    if (!queryPhone) {
      fetchAllUsers(); // 無參數，改為查全部
      return;
    }

    try {
      const userRes = await BackendApi.get(`/telecom/user/${queryPhone}`);
      const [callRes, smsRes, dataRes] = await Promise.all([
        BackendApi.get(`/telecom/users/call-history`, {
          params: { phone: queryPhone },
        }),
        BackendApi.get(`/telecom/sms`, { params: { phone: queryPhone } }),
        BackendApi.get(`/telecom/data-usage`, {
          params: { phone: queryPhone },
        }),
        fetchBills(queryPhone), // 新增：查詢帳單
      ]);

      setUserInfo(userRes.data);
      setUserList([]); // 清空列表

      setCallRecords(callRes.data);
      setSmsRecords(smsRes.data);
      setDataRecords(dataRes.data);
    } catch (err) {
      toaster.create({
        title: "查詢失敗",
        description: "無法查詢用戶資訊與紀錄，請稍後再試。",
        type: "error",
        duration: 3000,
      });
      setUserInfo(null);
      setCallRecords([]);
      setSmsRecords([]);
      setDataRecords([]);
    }
  };

  useEffect(() => {
    fetchUserInfo(); // 預設會查全部（因為沒給參數）
  }, []);

  const subscriberTypeOptions = createListCollection({
    items: [
      { label: "月租", value: "POSTPAID" },
      { label: "預付", value: "PREPAID" },
    ],
  });
  const planOptions = createListCollection({
    items: [
      { label: "吃到飽方案 ($999)", value: "1" },
      { label: "小資方案 ($499)", value: "2" },
      { label: "語音通話方案 ($699)", value: "3" },
    ],
  });

  // 👉 表單驗證
  const formSchema = z
    .object({
      name: z
        .string()
        .min(1, { message: "請輸入姓名" })
        .max(20, { message: "姓名不能超過 20 字元" }),
      number: z.string().length(8, { message: "門號長度必須為 8 位數" }),
      subscriberType: z
        .array(
          z.enum(["POSTPAID", "PREPAID"], {
            required_error: "請選擇訂閱者類型",
            invalid_type_error: "無效的訂閱者類型",
          })
        )
        .min(1, { message: "請至少選擇一種訂閱者類型" })
        .max(1, { message: "最多只能選擇一種訂閱者類型" }), // 若為單選
      planId: z
        .array(
          z.enum(["1", "2", "3"], {
            invalid_type_error: "無效的方案 ID",
          })
        )
        .optional(), // 記得後面 refine 用這邏輯補強
    })
    .refine(
      (data) =>
        !data.subscriberType.includes("POSTPAID") ||
        (data.planId && data.planId.length > 0),
      {
        path: ["planId"],
        message: "月租型用戶請選擇方案",
      }
    );

  type FormValues = z.infer<typeof formSchema>;

  // 👉 使用 react-hook-form
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const subscriberTypeValue = watch("subscriberType") ?? [];
  const isPostpaid = subscriberTypeValue.includes("POSTPAID");

  // 👉 提交表單
  const onSubmit = async (data: FormValues) => {
    try {
      await BackendApi.post("/telecom/register", {
        name: data.name,
        number: data.number,
        planId: data.planId,
        subscriberType: data.subscriberType,
      }).then(() => {
        // 成功後清空表單和關閉對話框
        reset();
        setDialogOpen(false);
      });
      toaster.create({
        title: "註冊成功",
        description: "用戶已成功註冊。",
        type: "success",
        duration: 3000,
      });
      // 重新查詢用戶列表
      fetchAllUsers();
    } catch (error) {
      alert("註冊失敗");
    }
  };

  return (
    <Box p={6}>
      <HStack my={4}>
        <Input
          placeholder="輸入門號"
          value={queryPhone}
          onChange={(e) => setQueryPhone(e.target.value)}
        />
        <Button onClick={() => fetchUserInfo(queryPhone)}>查詢</Button>
        <Button colorScheme="blue" onClick={() => setDialogOpen(true)}>
          ➕ 新增用戶
        </Button>
      </HStack>
      {/* Tabs 切換區塊 */}
      <Tabs.Root value={activeTab} onValueChange={(e) => setActiveTab(e.value)}>
        <Tabs.List>
          <Tabs.Trigger value="user">用戶列表</Tabs.Trigger>
          <Tabs.Trigger value="usage_call">通話紀錄(30日)</Tabs.Trigger>
          <Tabs.Trigger value="usage_sms">簡訊紀錄(30日)</Tabs.Trigger>
          <Tabs.Trigger value="usage_data">流量紀錄(30日)</Tabs.Trigger>
          <Tabs.Trigger value="invoice">帳單明細</Tabs.Trigger>
        </Tabs.List>

        {/* ------------------ Tab: 查詢用戶 ------------------ */}
        <Tabs.Content value="user">
          {(userInfo || userList.length > 0) && (
            <Table.Root mt={6} size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>用戶 ID</Table.ColumnHeader>
                  <Table.ColumnHeader>姓名</Table.ColumnHeader>
                  <Table.ColumnHeader>門號</Table.ColumnHeader>
                  <Table.ColumnHeader>方案</Table.ColumnHeader>
                  <Table.ColumnHeader>申辦時間</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {userInfo ? (
                  <Table.Row>
                    <Table.Cell>{userInfo.id}</Table.Cell>
                    <Table.Cell>{userInfo.name}</Table.Cell>
                    <Table.Cell>{userInfo.number}</Table.Cell>
                    <Table.Cell>{userInfo.planName}</Table.Cell>
                    <Table.Cell>{userInfo.createdAt}</Table.Cell>
                  </Table.Row>
                ) : (
                  userList.map((user) => (
                    <Table.Row key={user.id}>
                      <Table.Cell>{user.id}</Table.Cell>
                      <Table.Cell>{user.name}</Table.Cell>
                      <Table.Cell>{user.number}</Table.Cell>
                      <Table.Cell>{user.planName}</Table.Cell>
                      <Table.Cell>{user.createdAt}</Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table.Root>
          )}
        </Tabs.Content>

        {/* ------------------ Tab: 使用紀錄（範例空白） ------------------ */}
        <Tabs.Content value="usage_call">
          {callRecords.length > 0 ? (
            <Table.Root mt={4} size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>發送人(ID)</Table.ColumnHeader>

                  <Table.ColumnHeader>時間</Table.ColumnHeader>
                  <Table.ColumnHeader>對象</Table.ColumnHeader>
                  <Table.ColumnHeader>時長 (分鐘)</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {callRecords.map((record, idx) => (
                  <Table.Row key={idx}>
                    <Table.Cell>{record.id}</Table.Cell>
                    <Table.Cell>{record.timestamp}</Table.Cell>
                    <Table.Cell>{record.receiver}</Table.Cell>
                    <Table.Cell>{record.durationMinutes}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          ) : (
            <Box mt={4}>尚無通話紀錄</Box>
          )}
        </Tabs.Content>

        <Tabs.Content value="usage_sms">
          {smsRecords.length > 0 ? (
            <Table.Root mt={4} size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>發送人(ID)</Table.ColumnHeader>
                  <Table.ColumnHeader>發送時間</Table.ColumnHeader>
                  <Table.ColumnHeader>對象</Table.ColumnHeader>
                  <Table.ColumnHeader>狀態</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {smsRecords.map((record, idx) => (
                  <Table.Row key={idx}>
                    <Table.Cell>{record.userId}</Table.Cell>
                    <Table.Cell>{record.sentAt}</Table.Cell>
                    <Table.Cell>{record.recipient}</Table.Cell>
                    <Table.Cell>{record.status}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          ) : (
            <Box mt={4}>尚無簡訊紀錄</Box>
          )}
        </Tabs.Content>

        <Tabs.Content value="usage_data">
          {dataRecords.length > 0 ? (
            <Table.Root mt={4} size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>用戶ID</Table.ColumnHeader>
                  <Table.ColumnHeader>用戶名稱</Table.ColumnHeader>
                  <Table.ColumnHeader>上傳 (MB)</Table.ColumnHeader>
                  <Table.ColumnHeader>下載 (MB)</Table.ColumnHeader>
                  <Table.ColumnHeader>總流量 (MB)</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {dataRecords.map((record, idx) => (
                  <Table.Row key={idx}>
                    <Table.Cell>{record.userId}</Table.Cell>
                    <Table.Cell>{record.userName}</Table.Cell>

                    <Table.Cell>{record.uploadMb}</Table.Cell>
                    <Table.Cell>{record.downloadMb}</Table.Cell>
                    <Table.Cell>{record.totalMb}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          ) : (
            <Box mt={4}>尚無流量紀錄</Box>
          )}
        </Tabs.Content>
        <Tabs.Content value="invoice">
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <Input
              placeholder="查詢門號（可空）"
              value={selectedPhone}
              onChange={(e) => setSelectedPhone(e.target.value)}
            />
            <Input
              type="number"
              placeholder="年份"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            />
            <Input
              type="number"
              placeholder="月份"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            />
            <Button onClick={() => fetchBills(selectedPhone, year, month)}>
              查詢帳單
            </Button>
            <Button variant="ghost" color="orange" onClick={simulateAllBills}>
              模擬帳單
            </Button>
          </Box>

          {bills.length > 0 ? (
            <Table.Root mt={4} size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>姓名</Table.ColumnHeader>
                  <Table.ColumnHeader>門號</Table.ColumnHeader>
                  <Table.ColumnHeader>方案</Table.ColumnHeader>
                  <Table.ColumnHeader>基本費</Table.ColumnHeader>
                  <Table.ColumnHeader>通話費</Table.ColumnHeader>
                  <Table.ColumnHeader>簡訊費</Table.ColumnHeader>
                  <Table.ColumnHeader>上網費</Table.ColumnHeader>
                  <Table.ColumnHeader>折扣</Table.ColumnHeader>
                  <Table.ColumnHeader>總金額</Table.ColumnHeader>
                  <Table.ColumnHeader>帳單日</Table.ColumnHeader>
                  <Table.ColumnHeader>繳款時間</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {bills.map((record, idx) => (
                  <Table.Row key={idx}>
                    <Table.Cell>{record.userName}</Table.Cell>
                    <Table.Cell>{record.phoneNumber}</Table.Cell>
                    <Table.Cell>{record.planName}</Table.Cell>
                    <Table.Cell>${record.baseFee.toFixed(2)}</Table.Cell>
                    <Table.Cell>${record.callFee.toFixed(2)}</Table.Cell>
                    <Table.Cell>${record.smsFee.toFixed(2)}</Table.Cell>
                    <Table.Cell>${record.dataFee.toFixed(2)}</Table.Cell>
                    <Table.Cell>-${record.discount.toFixed(2)}</Table.Cell>
                    <Table.Cell>
                      <strong>${record.totalAmount.toFixed(2)}</strong>
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(record.issuedAt).toLocaleString()}
                    </Table.Cell>
                    <Table.Cell>
                      {record.paidAt
                        ? new Date(record.paidAt).toLocaleString()
                        : "尚未繳款"}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          ) : (
            <Box mt={4}>尚無帳單紀錄</Box>
          )}
        </Tabs.Content>
      </Tabs.Root>

      {/* ------------------ Dialog: 新增用戶 ------------------ */}
      {dialogOpen && (
        <Dialog.Root open={dialogOpen}>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>新增用戶</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <form>
                    <VStack>
                      {/* 姓名 */}
                      <Field.Root invalid={!!errors.name}>
                        <Field.Label>姓名</Field.Label>
                        <Input placeholder="輸入姓名" {...register("name")} />
                        <Field.ErrorText>
                          {errors.name?.message}
                        </Field.ErrorText>
                      </Field.Root>

                      {/* 門號 */}
                      <Field.Root invalid={!!errors.number}>
                        <Field.Label>門號</Field.Label>
                        <Input placeholder="輸入門號" {...register("number")} />
                        <Field.ErrorText>
                          {errors.number?.message}
                        </Field.ErrorText>
                      </Field.Root>

                      {/* 訂閱者類型 */}
                      <Field.Root invalid={!!errors.subscriberType}>
                        <Field.Label>訂閱者類型</Field.Label>
                        <Controller
                          control={control}
                          name="subscriberType"
                          render={({ field }) => (
                            <Select.Root
                              onValueChange={({ value }) => {
                                field.onChange(value);
                                console.log("Selected subscriber type:", value);
                              }}
                              onInteractOutside={() => field.onBlur()}
                              collection={subscriberTypeOptions}
                            >
                              <Select.HiddenSelect name={field.name} />
                              <Select.Control>
                                <Select.Trigger>
                                  <Select.ValueText placeholder="選擇訂閱者類型" />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                  <Select.Indicator />
                                </Select.IndicatorGroup>
                              </Select.Control>
                              <Select.Positioner>
                                <Select.Content>
                                  {subscriberTypeOptions.items.map((item) => (
                                    <Select.Item item={item} key={item.value}>
                                      {item.label}
                                      <Select.ItemIndicator />
                                    </Select.Item>
                                  ))}
                                </Select.Content>
                              </Select.Positioner>
                            </Select.Root>
                          )}
                        />
                        <Field.ErrorText>
                          {errors.subscriberType?.message}
                        </Field.ErrorText>
                      </Field.Root>

                      {/* 方案 */}
                      {isPostpaid && (
                        <Field.Root invalid={!!errors.planId}>
                          <Field.Label>選擇方案</Field.Label>
                          <Controller
                            control={control}
                            name="planId"
                            render={({ field }) => (
                              <Select.Root
                                onValueChange={({ value }) => {
                                  field.onChange(value);
                                  console.log("Selected plan ID:", value);
                                }}
                                onInteractOutside={() => field.onBlur()}
                                collection={planOptions}
                              >
                                <Select.HiddenSelect name={field.name} />
                                <Select.Control>
                                  <Select.Trigger>
                                    <Select.ValueText placeholder="請選擇方案" />
                                  </Select.Trigger>
                                  <Select.IndicatorGroup>
                                    <Select.Indicator />
                                  </Select.IndicatorGroup>
                                </Select.Control>
                                <Select.Positioner>
                                  <Select.Content>
                                    {planOptions.items.map((item) => (
                                      <Select.Item item={item} key={item.value}>
                                        {item.label}
                                        <Select.ItemIndicator />
                                      </Select.Item>
                                    ))}
                                  </Select.Content>
                                </Select.Positioner>
                              </Select.Root>
                            )}
                          />
                          <Field.ErrorText>
                            {errors.planId?.message}
                          </Field.ErrorText>
                        </Field.Root>
                      )}
                    </VStack>
                  </form>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => {
                        reset(); // 重置表單
                        setDialogOpen(false);
                      }}
                    >
                      取消
                    </Button>
                  </Dialog.ActionTrigger>
                  <Button onClick={handleSubmit(onSubmit)}>儲存</Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      )}
    </Box>
  );
};
