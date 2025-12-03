import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  Flex,
  Heading,
  Table,
  IconButton,
  Image,
  Spinner,
  FormatNumber,
  Dialog,
  Portal,
  CloseButton,
  Badge,
  Stack,
} from "@chakra-ui/react";
import { MdDeleteForever, MdEdit, MdAdd, MdSearch } from "react-icons/md";
// import { IUser } from "@/interface/IUser";
// import { BackendApi } from "@/js/bootstrap";
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
  ownerId: number;
  imageUrl: string;
}

// Mock Data
const MOCK_GUNS: Gun[] = [
  {
    id: 1,
    model: "M4A1 SOPMOD Block II",
    serialNumber: "SN-2023001",
    powerType: "AEG",
    velocity025: 115,
    velocity036: 98,
    lastMaintenanceAt: "2023-11-20T10:00:00",
    ownerId: 1001,
    imageUrl: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    model: "Glock 19 Gen 5",
    serialNumber: "GL-887766",
    powerType: "Gas",
    velocity025: 95,
    velocity036: 80,
    lastMaintenanceAt: "2023-12-05T14:30:00",
    ownerId: 1001,
    imageUrl: "https://images.unsplash.com/photo-1585589266782-f667775938d5?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    model: "AK-74M",
    serialNumber: "RU-998811",
    powerType: "AEG",
    velocity025: 120,
    velocity036: 105,
    lastMaintenanceAt: "2023-10-15T09:00:00",
    ownerId: 1002,
    imageUrl: "https://images.unsplash.com/photo-1584039253675-39a472354346?auto=format&fit=crop&q=80&w=600",
  },
];

/*
const fetchGuns = async (memberId?: string) => {
  const url = memberId ? `/guns/by-user/${memberId}` : `/guns/getAll`;
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
*/

export const AirsoftManager = () => {
  const [guns, setGuns] = useState<Gun[]>(MOCK_GUNS);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<Partial<Gun>>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [queryMemberId, setQueryMemberId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const appName = import.meta.env.VITE_APP_NAME;
  const { t: tCommon } = useTranslation("common");

  // Mock loading
  const loadGuns = async () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setGuns(MOCK_GUNS); // Reset to mock data for demo
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    // loadUser();
    loadGuns();
  }, []);

  const handleSubmit = async () => {
    if (!input.model || !input.serialNumber) return;

    setLoading(true);
    setTimeout(() => {
      if (editId !== null) {
        setGuns((prev) =>
          prev.map((g) => (g.id === editId ? ({ ...g, ...input } as Gun) : g))
        );
      } else {
        const newGun = { ...input, id: Math.random(), ownerId: 1001 } as Gun;
        setGuns((prev) => [...prev, newGun]);
      }
      setInput({});
      setEditId(null);
      setDialogOpen(false);
      setLoading(false);
    }, 500);
  };

  const handleDelete = async (id: number) => {
    if (confirm("確定要刪除嗎？")) {
      setGuns((prev) => prev.filter((g) => g.id !== id));
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${appName} | ${tCommon("page_title_airsoft")}`}</title>
      </Helmet>

      <Box p={{ base: 4, md: 8 }} pt={{ base: 20, md: 24 }} minH="100vh">
        <Box
          maxW="7xl"
          mx="auto"
          bg="whiteAlpha.50"
          backdropFilter="blur(12px)"
          border="1px solid"
          borderColor="whiteAlpha.200"
          rounded="2xl"
          p={{ base: 4, md: 6 }}
          shadow="2xl"
        >
          <Flex
            justify="space-between"
            align="center"
            mb={8}
            wrap="wrap"
            gap={4}
          >
            <Heading
              color="orange.400"
              fontSize="2xl"
              fontWeight="bold"
              letterSpacing="wide"
            >
              氣槍管理系統
            </Heading>

            <Dialog.Root
              open={dialogOpen}
              onOpenChange={(e) => setDialogOpen(e.open)}
            >
              <Dialog.Trigger asChild>
                <Button
                  bg="orange.500"
                  color="white"
                  _hover={{ bg: "orange.600" }}
                  size="sm"
                  onClick={() => {
                    setInput({});
                    setEditId(null);
                  }}
                >
                  <MdAdd /> 新增槍枝
                </Button>
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop
                  bg="blackAlpha.600"
                  backdropFilter="blur(4px)"
                />
                <Dialog.Positioner>
                  <Dialog.Content
                    bg="#1a1a1a"
                    color="white"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    rounded="xl"
                  >
                    <Dialog.Header>
                      <Dialog.Title color="orange.400">
                        {editId ? "編輯槍枝" : "新增槍枝"}
                      </Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                      <Stack gap={4}>
                        <Input
                          placeholder="槍型 (Model)"
                          value={input.model ?? ""}
                          onChange={(e) =>
                            setInput({ ...input, model: e.target.value })
                          }
                          bg="whiteAlpha.100"
                          border="none"
                          _focus={{ ring: 2, ringColor: "orange.400" }}
                        />
                        <Input
                          placeholder="圖片 URL"
                          value={input.imageUrl ?? ""}
                          onChange={(e) =>
                            setInput({ ...input, imageUrl: e.target.value })
                          }
                          bg="whiteAlpha.100"
                          border="none"
                          _focus={{ ring: 2, ringColor: "orange.400" }}
                        />
                        <Input
                          placeholder="序號 (Serial Number)"
                          value={input.serialNumber ?? ""}
                          onChange={(e) =>
                            setInput({ ...input, serialNumber: e.target.value })
                          }
                          bg="whiteAlpha.100"
                          border="none"
                          _focus={{ ring: 2, ringColor: "orange.400" }}
                        />
                        <Input
                          placeholder="動力類型 (AEG/Gas/CO2)"
                          value={input.powerType ?? ""}
                          onChange={(e) =>
                            setInput({ ...input, powerType: e.target.value })
                          }
                          bg="whiteAlpha.100"
                          border="none"
                          _focus={{ ring: 2, ringColor: "orange.400" }}
                        />
                        <Flex gap={2}>
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
                            bg="whiteAlpha.100"
                            border="none"
                            _focus={{ ring: 2, ringColor: "orange.400" }}
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
                            bg="whiteAlpha.100"
                            border="none"
                            _focus={{ ring: 2, ringColor: "orange.400" }}
                          />
                        </Flex>
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
                          bg="whiteAlpha.100"
                          border="none"
                          _focus={{ ring: 2, ringColor: "orange.400" }}
                          css={{ "color-scheme": "dark" }}
                        />
                      </Stack>
                    </Dialog.Body>
                    <Dialog.Footer>
                      <Dialog.ActionTrigger asChild>
                        <Button
                          variant="outline"
                          color="white"
                          borderColor="whiteAlpha.400"
                          _hover={{ bg: "whiteAlpha.100" }}
                        >
                          取消
                        </Button>
                      </Dialog.ActionTrigger>
                      <Button
                        onClick={handleSubmit}
                        bg="orange.500"
                        color="white"
                        _hover={{ bg: "orange.600" }}
                      >
                        {editId ? "更新" : "新增"}
                      </Button>
                    </Dialog.Footer>
                    <Dialog.CloseTrigger asChild>
                      <CloseButton size="sm" color="white" />
                    </Dialog.CloseTrigger>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          </Flex>

          <Flex
            mb={6}
            gap={2}
            bg="whiteAlpha.50"
            p={4}
            rounded="xl"
            border="1px solid"
            borderColor="whiteAlpha.100"
          >
            <Input
              placeholder="輸入會員編號查詢..."
              value={queryMemberId}
              onChange={(e) => setQueryMemberId(e.target.value)}
              bg="transparent"
              border="none"
              color="white"
              _placeholder={{ color: "gray.500" }}
              _focus={{ ring: 0 }}
            />
            <IconButton
              aria-label="Search"
              onClick={loadGuns}
              bg="orange.500"
              color="white"
              _hover={{ bg: "orange.600" }}
            >
              <MdSearch />
            </IconButton>
          </Flex>

          {loading ? (
            <Flex justify="center" py={10}>
              <Spinner color="orange.400" size="xl" />
            </Flex>
          ) : (
            <Box overflowX="auto">
              <Table.Root variant="outline" size="sm">
                <Table.Header>
                  <Table.Row
                    borderBottom="1px solid"
                    borderColor="whiteAlpha.200"
                  >
                    <Table.ColumnHeader
                      color="gray.400"
                      textTransform="uppercase"
                      fontSize="xs"
                    >
                      會員編號
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      color="gray.400"
                      textTransform="uppercase"
                      fontSize="xs"
                    >
                      槍型
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      color="gray.400"
                      textTransform="uppercase"
                      fontSize="xs"
                    >
                      圖片
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      color="gray.400"
                      textTransform="uppercase"
                      fontSize="xs"
                    >
                      序號
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      color="gray.400"
                      textTransform="uppercase"
                      fontSize="xs"
                    >
                      動力
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      color="gray.400"
                      textTransform="uppercase"
                      fontSize="xs"
                    >
                      0.25g
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      color="gray.400"
                      textTransform="uppercase"
                      fontSize="xs"
                    >
                      0.36g
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      color="gray.400"
                      textTransform="uppercase"
                      fontSize="xs"
                    >
                      上次保養
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      color="gray.400"
                      textTransform="uppercase"
                      fontSize="xs"
                      textAlign="right"
                    >
                      操作
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {guns.map((gun) => (
                    <Table.Row
                      key={gun.id}
                      _hover={{ bg: "whiteAlpha.50" }}
                      borderBottom="1px solid"
                      borderColor="whiteAlpha.100"
                    >
                      <Table.Cell color="whiteAlpha.800">
                        {gun.ownerId}
                      </Table.Cell>
                      <Table.Cell color="white" fontWeight="medium">
                        {gun.model}
                      </Table.Cell>
                      <Table.Cell>
                        <Image
                          boxSize="50px"
                          objectFit="cover"
                          rounded="md"
                          src={gun.imageUrl}
                          alt={gun.model}
                        />
                      </Table.Cell>
                      <Table.Cell color="whiteAlpha.700" fontFamily="mono">
                        {gun.serialNumber}
                      </Table.Cell>
                      <Table.Cell>
                        <Badge
                          colorScheme={
                            gun.powerType === "AEG"
                              ? "blue"
                              : gun.powerType === "Gas"
                              ? "green"
                              : "purple"
                          }
                        >
                          {gun.powerType}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell color="orange.300">
                        <FormatNumber
                          value={gun.velocity025}
                          style="unit"
                          unit="meter-per-second"
                          minimumFractionDigits={0}
                          maximumFractionDigits={0}
                        />
                      </Table.Cell>
                      <Table.Cell color="orange.300">
                        <FormatNumber
                          value={gun.velocity036}
                          style="unit"
                          unit="meter-per-second"
                          minimumFractionDigits={0}
                          maximumFractionDigits={0}
                        />
                      </Table.Cell>
                      <Table.Cell color="whiteAlpha.600" fontSize="sm">
                        {gun.lastMaintenanceAt
                          ? new Date(gun.lastMaintenanceAt).toLocaleDateString()
                          : "—"}
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        <Flex justify="flex-end" gap={2}>
                          <IconButton
                            aria-label="edit"
                            size="sm"
                            variant="ghost"
                            color="blue.300"
                            _hover={{ bg: "whiteAlpha.200" }}
                            onClick={() => {
                              setInput(gun);
                              setEditId(gun.id);
                              setDialogOpen(true);
                            }}
                          >
                            <MdEdit />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            size="sm"
                            variant="ghost"
                            color="red.300"
                            _hover={{ bg: "whiteAlpha.200" }}
                            onClick={() => handleDelete(gun.id)}
                          >
                            <MdDeleteForever />
                          </IconButton>
                        </Flex>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};
