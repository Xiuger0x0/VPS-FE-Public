export interface Gun {
  id: number;
  name: string;
  serialNumber: string;
  powerType: string;
  velocity025: number;
  velocity036: number;
  lastMaintenance: string; // 可用 Date 轉換
}

import { BackendApi } from "@/utils/bootstrap";

const fetchGuns = () => BackendApi.get<Gun[]>(`/guns`);

const createGun = (data: Omit<Gun, "id">) =>
  BackendApi.post<Gun>(`/guns`, data);

const updateGun = (id: number, data: Partial<Gun>) =>
  BackendApi.put<Gun>(`/guns/${id}`, data);

const deleteGun = (id: number) => BackendApi.delete(`/guns/${id}`);

const fetchCurrentUser = () => BackendApi.get<IUser>("/me");

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
} from "@chakra-ui/react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { IUser } from "@/interface/IUser";

export const AirsoftManager = () => {
  const [guns, setGuns] = useState<Gun[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState<Partial<Gun>>({});
  const [editId, setEditId] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState<IUser | null>(null);

  const loadUser = async () => {
    try {
      const res = await fetchCurrentUser();
      setUser(res.data);

      // 假設你希望預設 serialNumber 加入使用者名稱前綴
      setInput((prev) => ({
        ...prev,
        serialNumber: `USER-${res.data.displayName}-`,
      }));
    } catch (e) {
      console.error("Failed to fetch user", e);
    }
  };

  const loadGuns = async () => {
    setLoading(true);
    const res = await fetchGuns();
    setGuns(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadUser(); // 抓使用者資料
    loadGuns(); // 抓槍枝資料
  }, []);

  const handleSubmit = async () => {
    if (!input.name || !input.serialNumber) return;
    if (editId !== null) {
      await updateGun(editId, input);
    } else {
      await createGun(input as Gun);
    }
    await loadGuns();
    setInput({});
    setEditId(null);
  };

  const handleDelete = async (id: number) => {
    await deleteGun(id);
    await loadGuns();
  };

  return (
    <Box maxW="6xl" mx="auto" mt={10} p={5}>
      <Heading mb={4}>氣槍管理</Heading>

      <Flex mb={4} gap={2}>
        <Input
          placeholder="槍型"
          value={input.name ?? ""}
          onChange={(e) => setInput({ ...input, name: e.target.value })}
        />
        <Input
          placeholder="序號"
          value={input.serialNumber ?? ""}
          onChange={(e) => setInput({ ...input, serialNumber: e.target.value })}
        />
        <Button onClick={handleSubmit} colorScheme="blue">
          {editId ? "更新" : "新增"}
        </Button>
      </Flex>

      {loading ? (
        <Spinner />
      ) : (
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>槍型</Table.ColumnHeader>
              <Table.ColumnHeader>序號</Table.ColumnHeader>
              <Table.ColumnHeader>操作</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {guns.map((gun) => (
              <Table.Row key={gun.id}>
                <Table.Cell>{gun.name}</Table.Cell>
                <Table.Cell>{gun.serialNumber}</Table.Cell>
                <Table.Cell>
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      setInput(gun);
                      setEditId(gun.id);
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
  );
};
