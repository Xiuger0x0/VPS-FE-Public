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
  Text,
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

// ---- Types ----
type UserInfo = {
  id: number;
  number: number;
  userId: number;
  phoneNumber: string;
  name: string;
  planName: string;
  createdAt: string;
  ssn: string;
  address?: string; // 可選屬性
  city?: string; // 可選屬性
  country?: string; // 可選屬性
  postalCode?: string; // 可選屬性
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

type TopDataUsageDto = {
  userId: number;
  userName: string;
  phoneNumber: string;
  totalUsageMb: number;
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

type UserUsageInfoResponse = {
  user: {
    id: number;
    name: string;
    phoneNumber: string;
    subscriberType: string;
    currentPlan: {
      id: number;
      name: string;
    };
  };
  callCount: number;
  smsCount: number;
  mostContacted: string | null;
  totalDataUsageMb: number;
};

type Plan = {
  id: number;
  name: string;
  billingType: string;
  dataPolicy: string;
  monthlyFee: number;
  includedSms: number;
  includedDataMb: number;
  smsRate: number;
  callRatePerMin: number;
  overagePolicy: string;
  throttleAfterMb?: number;
  throttleSpeedKbps?: number;
  effectiveFrom: string;
};

export const TeleDashboard = () => {
  // 👉 狀態
  const [activeTab, setActiveTab] = useState("user");
  const [queryPhone, setQueryPhone] = useState("");
  const [userList, setUserList] = useState<UserInfo[]>([]);
  const [callRecords, setCallRecords] = useState<CallLogDto[]>([]);
  const [smsRecords, setSmsRecords] = useState<SmsRecordDto[]>([]);
  const [dataRecords, setDataRecords] = useState<DataUsageSummaryDto[]>([]);
  const [topDataRecords, setTopDataRecords] = useState<TopDataUsageDto[]>([]);
  const [bills, setBills] = useState<InvoiceDetailsDto[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // 月份從 0 開始，所以要加 1
  const [year, setYear] = useState<number>(currentYear);
  const [month, setMonth] = useState<number>(currentMonth);
  const [usageSummary, setUsageSummary] =
    useState<UserUsageInfoResponse | null>(null);
  const [topContact, setTopContact] = useState<string | null>(null);

  // 👉 清除所有狀態
  const clearAllStates = () => {
    setUserList([]);
    setCallRecords([]);
    setSmsRecords([]);
    setDataRecords([]);
    setTopDataRecords([]);
    setBills([]);
    setUsageSummary(null);
    setTopContact(null);
  };

  // 👉 查詢帳單
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

  // 👉 模擬產生所有帳單
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

  // 👉 查詢使用摘要
  const fetchUsageSummary = async () => {
    try {
      const res = await BackendApi.get(`/telecom/users/usage-summary`, {
        params: { phone: queryPhone },
      });
      setUsageSummary(res.data);
      setTopContact(res.data.mostContacted || null);
    } catch (err) {
      console.error("取得使用摘要失敗", err);
    }
  };

  // 👉 查詢使用摘要與最常聯絡對象
  const getAllPlans = async () => {
    const response = await BackendApi.get("/telecom/plans");
    setPlans(response.data);
    return response.data;
  };

  // 👉 查詢所有用戶與使用紀錄
  const fetchAllUsers = async () => {
    clearAllStates();

    try {
      const [usersRes, callRes, smsRes, dataRes, topDataRes] =
        await Promise.all([
          BackendApi.get("/telecom/users"),
          BackendApi.get("/telecom/calls"),
          BackendApi.get("/telecom/sms"),
          BackendApi.get("/telecom/data-usage"),
          BackendApi.get("/telecom/data-usage/top10"),
          fetchBills(),
        ]);

      setUserList(usersRes.data);
      setCallRecords(callRes.data);
      setSmsRecords(smsRes.data);
      setDataRecords(dataRes.data);
      setTopDataRecords(topDataRes.data);
    } catch (err) {
      toaster.create({
        title: "查詢失敗",
        description: "無法查詢用戶與使用紀錄，請稍後再試。",
        type: "error",
      });
    }
  };

  // 👉 查詢用戶
  const fetchUserInfo = async (queryPhone?: string) => {
    if (!queryPhone) {
      fetchAllUsers();
      return;
    }

    clearAllStates(); // 預設清全部

    try {
      const [callRes, userRes, smsRes, dataRes] = await Promise.all([
        BackendApi.get(`/telecom/calls`, {
          params: { phone: queryPhone },
        }),
        BackendApi.get(`/telecom/users`, {
          params: { phone: queryPhone },
        }),
        BackendApi.get(`/telecom/sms`, { params: { phone: queryPhone } }),
        BackendApi.get(`/telecom/data-usage`, {
          params: { phone: queryPhone },
        }),
        fetchBills(queryPhone),
      ]);
      setUserList(userRes.data);
      setCallRecords(callRes.data);
      setSmsRecords(smsRes.data);
      setDataRecords(dataRes.data);
      fetchUsageSummary();
    } catch (err) {
      toaster.create({
        title: "查詢失敗",
        description: "無法查詢用戶資訊與紀錄，請稍後再試。",
        type: "error",
      });
    }
  };

  // 👉 初始載入
  useEffect(() => {
    fetchUserInfo(); // 預設會查全部（因為沒給參數）
    getAllPlans();
  }, []);

  const subscriberTypeOptions = createListCollection({
    items: [
      { label: "月租", value: "POSTPAID" },
      { label: "預付", value: "PREPAID" },
    ],
  });

  const simplifiedPlans = plans.map((plan) => ({
    id: plan.id,
    value: plan.id.toString(),
    label: `${plan.name} ${plan.monthlyFee}元/月`,
    name: plan.name,
    monthlyFee: plan.monthlyFee,
  }));

  const planOptions = createListCollection({
    items: simplifiedPlans,
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
      ssn: z.string().length(10, { message: "SSN 必須為 10 位數" }),
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
      {/* Tabs 切換區塊 */}
      <Tabs.Root value={activeTab} onValueChange={(e) => setActiveTab(e.value)}>
        <Tabs.List>
          <Tabs.Trigger value="plan">方案一覽</Tabs.Trigger>
          <Tabs.Trigger value="user">用戶列表</Tabs.Trigger>
          <Tabs.Trigger value="info">用戶細節</Tabs.Trigger>
          <Tabs.Trigger value="usage_call">通話紀錄 (30日)</Tabs.Trigger>
          <Tabs.Trigger value="usage_data">流量紀錄 (30日)</Tabs.Trigger>
          {!queryPhone && (
            <Tabs.Trigger value="usage_data_top10">流量排行前十</Tabs.Trigger>
          )}
          <Tabs.Trigger value="usage_sms">簡訊紀錄</Tabs.Trigger>
          <Tabs.Trigger value="invoice">帳單紀錄</Tabs.Trigger>
        </Tabs.List>

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
        {/* ------------------ Tab: 查詢用戶 ------------------ */}
        <Tabs.Content value="user">
          {userList.length > 0 && (
            <Table.Root mt={6} size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>用戶 ID</Table.ColumnHeader>
                  <Table.ColumnHeader>姓名</Table.ColumnHeader>
                  <Table.ColumnHeader>門號</Table.ColumnHeader>
                  <Table.ColumnHeader>方案</Table.ColumnHeader>
                  <Table.ColumnHeader>申辦時間</Table.ColumnHeader>
                  <Table.ColumnHeader>SSN</Table.ColumnHeader>
                  <Table.ColumnHeader>地址</Table.ColumnHeader>
                  <Table.ColumnHeader>城市</Table.ColumnHeader>
                  <Table.ColumnHeader>國家</Table.ColumnHeader>
                  <Table.ColumnHeader>郵遞區號</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {userList.map((user) => (
                  <Table.Row key={user.id}>
                    <Table.Cell>{user.id}</Table.Cell>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.number}</Table.Cell>
                    <Table.Cell>{user.planName}</Table.Cell>
                    <Table.Cell>{user.createdAt}</Table.Cell>
                    <Table.Cell>{user.ssn || "限管理者檢視"}</Table.Cell>
                    <Table.Cell>{user.address || "無資料"}</Table.Cell>
                    <Table.Cell>{user.city || "無資料"}</Table.Cell>
                    <Table.Cell>{user.country || "無資料"}</Table.Cell>
                    <Table.Cell>{user.postalCode || "無資料"}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          )}
        </Tabs.Content>

        {/* ------------------ Tab: 方案一覽 ------------------ */}
        <Tabs.Content value="plan">
          <Box mt={4}>
            <Table.Root size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>方案 ID</Table.ColumnHeader>
                  <Table.ColumnHeader>方案名稱</Table.ColumnHeader>
                  <Table.ColumnHeader>月租費用</Table.ColumnHeader>
                  <Table.ColumnHeader>免費簡訊數</Table.ColumnHeader>
                  <Table.ColumnHeader>包含流量 (MB)</Table.ColumnHeader>
                  <Table.ColumnHeader>計費類型</Table.ColumnHeader>
                  <Table.ColumnHeader>資料政策</Table.ColumnHeader>
                  <Table.ColumnHeader>超出費用政策</Table.ColumnHeader>
                  <Table.ColumnHeader>限速政策</Table.ColumnHeader>
                  <Table.ColumnHeader>生效日期</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {plans.map((plan) => (
                  <Table.Row key={plan.id}>
                    <Table.Cell>{plan.id}</Table.Cell>
                    <Table.Cell>{plan.name}</Table.Cell>
                    <Table.Cell>${plan.monthlyFee}</Table.Cell>
                    <Table.Cell>{plan.includedSms}</Table.Cell>
                    <Table.Cell>
                      {plan.includedDataMb != 99999
                        ? `${plan.includedDataMb} MB`
                        : "不限"}
                    </Table.Cell>
                    <Table.Cell>
                      {plan.billingType === "POSTPAID" ? "月租" : "預付"}
                    </Table.Cell>
                    <Table.Cell>{plan.dataPolicy}</Table.Cell>
                    <Table.Cell>
                      {plan.overagePolicy === "THROTTLE"
                        ? `限速 ${plan.throttleSpeedKbps} Kbps`
                        : "無額外費用"}
                    </Table.Cell>
                    <Table.Cell>
                      {plan.throttleAfterMb
                        ? `${plan.throttleAfterMb} MB 後限速 `
                        : "無限速限制"}
                    </Table.Cell>
                    <Table.Cell>
                      {plan.effectiveFrom
                        ? new Date(plan.effectiveFrom).toLocaleDateString()
                        : "無生效日期"}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* ------------------ Tab: 使用紀錄 ------------------ */}
        <Tabs.Content value="usage_call">
          {callRecords.length > 0 ? (
            <Table.Root mt={4} size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>發送人 (ID)</Table.ColumnHeader>

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
          <Text m={2}>總筆數：{callRecords.length}</Text>
        </Tabs.Content>

        {/* ------------------ Tab: 簡訊紀錄 ------------------ */}
        <Tabs.Content value="usage_sms">
          {smsRecords.length > 0 ? (
            <Table.Root mt={4} size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>發送人 (ID)</Table.ColumnHeader>
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
          <Text m={2}>總筆數：{smsRecords.length}</Text>
        </Tabs.Content>

        {/* ------------------ Tab: 流量紀錄 ------------------ */}
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
          <Text m={2}>總筆數：{dataRecords.length}</Text>
        </Tabs.Content>

        {/* ------------------ Tab: 流量排行前十 ------------------ */}
        {!queryPhone && (
          <Tabs.Content value="usage_data_top10">
            {topDataRecords.length > 0 ? (
              <Table.Root mt={4} size="sm">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>用戶ID</Table.ColumnHeader>
                    <Table.ColumnHeader>用戶名稱</Table.ColumnHeader>
                    <Table.ColumnHeader>門號</Table.ColumnHeader>
                    <Table.ColumnHeader>總流量 (MB)</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {topDataRecords.map((record, idx) => (
                    <Table.Row key={idx}>
                      <Table.Cell>{record.userId}</Table.Cell>
                      <Table.Cell>{record.userName}</Table.Cell>
                      <Table.Cell>{record.phoneNumber}</Table.Cell>
                      <Table.Cell>{record.totalUsageMb.toFixed(2)}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            ) : (
              <Box mt={4}>尚無流量排行前十紀錄</Box>
            )}
            <Text m={2}>總筆數：{topDataRecords.length}</Text>
          </Tabs.Content>
        )}

        {/* ------------------ Tab: 帳戶細節 ------------------ */}
        <Tabs.Content value="info">
          <Box mt={5}>
            {topContact && (
              <Text mb={2}>最常聯絡對象: {topContact || "無資料"}</Text>
            )}
            {(usageSummary && (
              <Table.Root mt={4} size="sm">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>使用者</Table.ColumnHeader>
                    <Table.ColumnHeader>門號</Table.ColumnHeader>
                    <Table.ColumnHeader>方案名稱</Table.ColumnHeader>
                    <Table.ColumnHeader>通話次數</Table.ColumnHeader>
                    <Table.ColumnHeader>簡訊次數</Table.ColumnHeader>
                    <Table.ColumnHeader>總上網用量(MB)</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>{usageSummary?.user.name}</Table.Cell>
                    <Table.Cell>{usageSummary?.user.phoneNumber}</Table.Cell>
                    <Table.Cell>
                      {usageSummary?.user.currentPlan.name}
                    </Table.Cell>
                    <Table.Cell>{usageSummary?.callCount}</Table.Cell>
                    <Table.Cell>{usageSummary?.smsCount}</Table.Cell>
                    <Table.Cell>
                      {usageSummary?.totalDataUsageMb.toFixed(2)} MB
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Root>
            )) ?? <Box mt={4}>尚未查詢用戶使用明細</Box>}
          </Box>
        </Tabs.Content>

        {/* ------------------ Tab: 帳單紀錄 ------------------ */}
        <Tabs.Content value="invoice">
          <Box display="flex" alignItems="center" gap={2} mb={3}>
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
            <Button onClick={() => fetchBills(queryPhone, year, month)}>
              查詢
            </Button>
            <Button variant="surface" color="orange" onClick={simulateAllBills}>
              模擬帳單(所有用戶)
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
                    {/* 針對預付卡用戶呈現其他資訊 */}
                    <Table.Cell>
                      {record.planName !== "預付卡方案"
                        ? record.paidAt
                          ? new Date(record.paidAt).toLocaleString()
                          : "尚未繳款"
                        : "無繳款資訊"}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          ) : (
            <Box mt={4}>尚無帳單紀錄 (未產生)</Box>
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

                      {/* SSN */}
                      <Field.Root invalid={!!errors.ssn}>
                        <Field.Label>SSN</Field.Label>
                        <Input
                          placeholder="輸入 SSN"
                          {...register("ssn")}
                          maxLength={10}
                        />
                        <Field.ErrorText>{errors.ssn?.message}</Field.ErrorText>
                      </Field.Root>

                      {/* 門號 */}
                      <Field.Root invalid={!!errors.number}>
                        <Field.Label>門號</Field.Label>
                        <Input
                          placeholder="輸入門號"
                          {...register("number")}
                          maxLength={8}
                        />
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
                                    {simplifiedPlans.map((item) => (
                                      <Select.Item item={item} key={item.id}>
                                        {item.name} {item.monthlyFee}元/月
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
                <Dialog.CloseTrigger
                  asChild
                  onClick={() => {
                    reset(); // 重置表單
                    setDialogOpen(false);
                  }}
                >
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
