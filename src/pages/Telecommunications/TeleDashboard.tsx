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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster";
import { BackendApi } from "@/js/bootstrap";
import { useForm } from "react-hook-form";

// ---- Types ----
type UserInfo = {
  id: number;
  number: number;
  userId: number;
  phoneNumber: string;
  name: string;
  planName: string;
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

export const TeleDashboard = () => {
  // 👉 狀態
  const [activeTab, setActiveTab] = useState("user");
  const [queryPhone, setQueryPhone] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userList, setUserList] = useState<UserInfo[]>([]);

  const [callRecords, setCallRecords] = useState<CallLogDto[]>([]);
  const [smsRecords, setSmsRecords] = useState<SmsRecordDto[]>([]);
  const [dataRecords, setDataRecords] = useState<DataUsageSummaryDto[]>([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("標準方案");

  const fetchAllUsers = async () => {
    try {
      const [usersRes, callRes, smsRes, dataRes] = await Promise.all([
        BackendApi.get("/telecom/users"),
        BackendApi.get("/telecom/calls"), // 不傳參數，撈全部通話
        BackendApi.get("/telecom/sms"), // 不傳參數，撈全部簡訊
        BackendApi.get("/telecom/data-usage"), // 不傳參數，撈全部流量
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

  type FormValues = {
    phoneNumber: string;
    planName: string;
  };

  const { register, handleSubmit, reset } = useForm<FormValues>();

  // 👉 新增用戶
  const registerUser = async () => {
    try {
      await BackendApi.post("/telecom/register", {
        phoneNumber: newPhone,
        planName: selectedPlan,
        name: "新用戶", // 可改為可輸入
      });
      toaster.create({
        title: "新增成功",
        description: `已開通 ${newPhone}`,
        type: "success",
        duration: 3000,
      });
      setDialogOpen(false);
    } catch (err) {
      toaster.create({
        title: "新增失敗",
        type: "error",
        duration: 3000,
      });
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
          <Tabs.Trigger value="usage_call">通話紀錄</Tabs.Trigger>
          <Tabs.Trigger value="usage_sms">簡訊紀錄</Tabs.Trigger>
          <Tabs.Trigger value="usage_data">流量紀錄</Tabs.Trigger>
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
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {userInfo ? (
                  <Table.Row>
                    <Table.Cell>{userInfo.id}</Table.Cell>
                    <Table.Cell>{userInfo.name}</Table.Cell>
                    <Table.Cell>{userInfo.number}</Table.Cell>
                    <Table.Cell>{userInfo.planName}</Table.Cell>
                  </Table.Row>
                ) : (
                  userList.map((user) => (
                    <Table.Row key={user.id}>
                      <Table.Cell>{user.id}</Table.Cell>
                      <Table.Cell>{user.name}</Table.Cell>
                      <Table.Cell>{user.number}</Table.Cell>
                      <Table.Cell>{user.planName}</Table.Cell>
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
                  <form onSubmit={handleSubmit(registerUser)}>
                    <Input
                      placeholder="輸入門號"
                      {...register("phoneNumber", { required: true })}
                      mt={2}
                    />
                    <Input
                      placeholder="輸入方案（如：標準方案）"
                      {...register("planName", { required: true })}
                      mt={4}
                    />
                  </form>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                    >
                      取消
                    </Button>
                  </Dialog.ActionTrigger>
                  <Button onClick={registerUser}>儲存</Button>
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
