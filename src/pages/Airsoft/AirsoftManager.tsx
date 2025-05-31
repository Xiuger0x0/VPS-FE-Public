import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  Flex,
  Heading,
  Table,
  IconButton,
  Spinner,
  FormatNumber,
  Dialog,
  Portal,
  CloseButton,
} from "@chakra-ui/react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { IUser } from "@/interface/IUser";
import { BackendApi } from "@/js/bootstrap";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export interface Gun {
  id: number;
  model: string;
  serialNumber: string;
  powerType: string;
  velocity025: number;
  velocity036: number;
  lastMaintenanceAt: string;
  owner: {
    id: number;
    email: string;
    displayName: string;
    // 可加更多欄位根據需要
  };
  // storageSlot 和 displaySlot 如需展示可補上對應型別
}

const fetchGuns = async (memberId?: string) => {
  const url = memberId ? `/guns/by-member/${memberId}` : `/guns/getAll`;
  return BackendApi.get(url);
};

const createGun = (data: Omit<Gun, "id">) =>
  BackendApi.post<Gun>(`/guns`, data);

const updateGun = (id: number, data: Partial<Gun>) =>
  BackendApi.put<Gun>(`/guns/${id}`, data);

const deleteGun = (id: number) => BackendApi.delete(`/guns/${id}`);

const fetchCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) throw new Error("User not found in localStorage");

  console.log("User data from localStorage:", userStr);
  const user = JSON.parse(userStr);
  const id = user?.userId;

  if (!id) throw new Error("User ID missing");

  return BackendApi.get<IUser>(`/guns/${id}`);
};

export const AirsoftManager = () => {
  const [guns, setGuns] = useState<Gun[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState<Partial<Gun>>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [queryMemberId, setQueryMemberId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const appName = import.meta.env.VITE_APP_NAME;
  const { t: tCommon } = useTranslation("common");

  const loadUser = async () => {
    try {
      const res = await fetchCurrentUser();
      console.log("Fetched user:", res.data);
    } catch (e) {
      console.error("Failed to fetch user", e);
    }
  };

  const loadGuns = async () => {
    setLoading(true);
    const res = await fetchGuns(queryMemberId);
    console.log("Fetched guns:", res.data);
    setGuns(Array.isArray(res.data) ? res.data : [res.data]);
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
    loadGuns();
  }, []);

  const handleSubmit = async () => {
    if (!input.model || !input.serialNumber) return;
    if (editId !== null) {
      await updateGun(editId, input);
    } else {
      await createGun(input as Gun);
    }
    await loadGuns();
    setInput({});
    setEditId(null);
    setDialogOpen(false);
  };

  const handleDelete = async (id: number) => {
    await deleteGun(id);
    await loadGuns();
  };

  return (
    <>
      <Helmet>
        <title>
          {appName} | {tCommon("page_title_airsoft")}
        </title>
      </Helmet>

      <Box maxW="6xl" mx="auto" p={5}>
        <Heading mb={4}>氣槍管理</Heading>

        <Flex mb={4} gap={2} wrap="wrap" align="flex-end">
          <Input
            placeholder="查詢會員編號"
            value={queryMemberId}
            onChange={(e) => setQueryMemberId(e.target.value)}
          />
          <Button onClick={loadGuns} variant="outline">
            查詢
          </Button>

          <Dialog.Root
            open={dialogOpen}
            onOpenChange={(e) => setDialogOpen(e.open)}
          >
            <Dialog.Trigger asChild>
              <Button colorScheme="blue">
                {editId !== null ? "編輯槍枝" : "新增槍枝"}
              </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>
                      {editId ? "編輯槍枝" : "新增槍枝"}
                    </Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <Flex direction="column" gap={3}>
                      <Input
                        placeholder="槍型"
                        value={input.model ?? ""}
                        onChange={(e) =>
                          setInput({ ...input, model: e.target.value })
                        }
                      />
                      <Input
                        placeholder="序號"
                        value={input.serialNumber ?? ""}
                        onChange={(e) =>
                          setInput({ ...input, serialNumber: e.target.value })
                        }
                      />
                      <Input
                        placeholder="動力類型 (AEG/Gas/CO2/Manual)"
                        value={input.powerType ?? ""}
                        onChange={(e) =>
                          setInput({ ...input, powerType: e.target.value })
                        }
                      />
                      <Input
                        type="number"
                        placeholder="0.25g 彈速"
                        value={input.velocity025 ?? ""}
                        onChange={(e) =>
                          setInput({
                            ...input,
                            velocity025: parseFloat(e.target.value),
                          })
                        }
                      />
                      <Input
                        type="number"
                        placeholder="0.36g 彈速"
                        value={input.velocity036 ?? ""}
                        onChange={(e) =>
                          setInput({
                            ...input,
                            velocity036: parseFloat(e.target.value),
                          })
                        }
                      />
                      <Input
                        type="datetime-local"
                        placeholder="最後保養時間"
                        value={
                          input.lastMaintenanceAt
                            ? input.lastMaintenanceAt.slice(0, 16)
                            : ""
                        }
                        onChange={(e) =>
                          setInput({
                            ...input,
                            lastMaintenanceAt: e.target.value,
                          })
                        }
                      />
                    </Flex>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">取消</Button>
                    </Dialog.ActionTrigger>
                    <Button onClick={handleSubmit}>
                      {editId ? "更新" : "新增"}
                    </Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </Flex>

        {loading ? (
          <Spinner />
        ) : (
          <Table.Root>
            <Table.Header>
              <Table.Row whiteSpace={"nowrap"}>
                <Table.ColumnHeader>會員編號</Table.ColumnHeader>
                <Table.ColumnHeader>槍型</Table.ColumnHeader>
                <Table.ColumnHeader>序號</Table.ColumnHeader>
                <Table.ColumnHeader>動力</Table.ColumnHeader>
                <Table.ColumnHeader>0.25g</Table.ColumnHeader>
                <Table.ColumnHeader>0.36g</Table.ColumnHeader>
                <Table.ColumnHeader>上次保養</Table.ColumnHeader>
                <Table.ColumnHeader>操作</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {guns.map((gun) => (
                <Table.Row key={gun.id}>
                  <Table.Cell>{gun.owner.id}</Table.Cell>
                  <Table.Cell>{gun.model}</Table.Cell>
                  <Table.Cell>{gun.serialNumber}</Table.Cell>
                  <Table.Cell>{gun.powerType}</Table.Cell>
                  <Table.Cell>
                    <FormatNumber
                      value={gun.velocity025}
                      style="unit"
                      unit="meter-per-second"
                      minimumFractionDigits={0}
                      maximumFractionDigits={1}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <FormatNumber
                      value={gun.velocity036}
                      style="unit"
                      unit="meter-per-second"
                      minimumFractionDigits={0}
                      maximumFractionDigits={1}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {gun.lastMaintenanceAt
                      ? new Date(gun.lastMaintenanceAt).toLocaleString()
                      : "—"}
                  </Table.Cell>
                  <Table.Cell>
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        setInput(gun);
                        setEditId(gun.id);
                        setDialogOpen(true);
                      }}
                      mr={2}
                    >
                      <MdEdit />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(gun.id)}
                      colorScheme="red"
                    >
                      <MdDeleteForever />
                    </IconButton>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </Box>
    </>
  );
};
