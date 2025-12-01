import { useState } from "react";
import {
  Box,
  Heading,
  Button,
  Table,
  HStack,
  IconButton,
  Badge,
  Image,
  Dialog,
  Input,
  VStack,
  Text,
  createListCollection,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Switch,
  SelectValueChangeDetails,
  SwitchCheckedChangeDetails,
  Spacer
} from "@chakra-ui/react";
import { usePhotos, Photo, PhotoCategory } from "@/context/PhotoContext";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export const PhotoCMS = () => {
  const { photos, addPhoto, updatePhoto, deletePhoto } = usePhotos();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    title: string;
    url: string;
    category: PhotoCategory;
    visible: boolean;
  }>({
    title: "",
    url: "",
    category: "Others",
    visible: true,
  });

  const categories = createListCollection({
    items: [
      { label: "Motorcycle", value: "Motorcycle" },
      { label: "Airsoft", value: "Airsoft" },
      { label: "Drone", value: "Drone" },
      { label: "Others", value: "Others" },
    ],
  });

  const handleOpenModal = (photo?: Photo) => {
    if (photo) {
      setEditingPhoto(photo);
      setFormData({
        title: photo.title,
        url: photo.url,
        category: photo.category,
        visible: photo.visible,
      });
    } else {
      setEditingPhoto(null);
      setFormData({
        title: "",
        url: "",
        category: "Others",
        visible: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPhoto(null);
  };

  const handleSubmit = () => {
    if (editingPhoto) {
      updatePhoto(editingPhoto.id, formData);
    } else {
      addPhoto({
        ...formData,
        date: new Date().toISOString().split("T")[0],
      });
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this photo?")) {
      deletePhoto(id);
    }
  };

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">Photo Manager</Heading>
        <Button colorPalette="blue" onClick={() => handleOpenModal()}>
          <FaPlus style={{ marginRight: "8px" }} /> Add Photo
        </Button>
      </HStack>

      <Box overflowX="auto" bg="bg.panel" borderRadius="md" borderWidth="1px">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Image</Table.ColumnHeader>
              <Table.ColumnHeader>Title</Table.ColumnHeader>
              <Table.ColumnHeader>Category</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Date</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="right">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {photos.map((photo) => (
              <Table.Row key={photo.id}>
                <Table.Cell>
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    boxSize="50px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                </Table.Cell>
                <Table.Cell fontWeight="medium">{photo.title}</Table.Cell>
                <Table.Cell>
                  <Badge variant="outline">{photo.category}</Badge>
                </Table.Cell>
                <Table.Cell>
                  <Badge colorPalette={photo.visible ? "green" : "gray"}>
                    {photo.visible ? "Visible" : "Hidden"}
                  </Badge>
                </Table.Cell>
                <Table.Cell color="fg.muted">{photo.date}</Table.Cell>
                <Table.Cell textAlign="right">
                  <HStack justify="end">
                    <IconButton
                      variant="ghost"
                      size="sm"
                      aria-label="Edit"
                      onClick={() => handleOpenModal(photo)}
                    >
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      variant="ghost"
                      size="sm"
                      colorPalette="red"
                      aria-label="Delete"
                      onClick={() => handleDelete(photo.id)}
                    >
                      <FaTrash />
                    </IconButton>
                  </HStack>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>

      {/* Add/Edit Modal */}
      <Dialog.Root
        open={isModalOpen}
        onOpenChange={(e) => setIsModalOpen(e.open)}
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {editingPhoto ? "Edit Photo" : "Add New Photo"}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack gap={4} align="stretch">
                <Box>
                  <Text mb={1} fontSize="sm" fontWeight="medium">
                    Title
                  </Text>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter photo title"
                  />
                </Box>

                <Box>
                  <Text mb={1} fontSize="sm" fontWeight="medium">
                    Image URL
                  </Text>
                  <Input
                    value={formData.url}
                    onChange={(e) =>
                      setFormData({ ...formData, url: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                </Box>

                <Box>
                  <SelectRoot
                    collection={categories}
                    value={[formData.category]}
                    onValueChange={(e: SelectValueChangeDetails) =>
                      setFormData({
                        ...formData,
                        category: e.value[0] as PhotoCategory,
                      })
                    }
                  >
                    <SelectLabel>Category</SelectLabel>
                    <SelectTrigger>
                      <SelectValueText placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.items.map((item) => (
                        <SelectItem item={item} key={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                </Box>

                <HStack justify="space-between">
                  <Switch.Root
                   checked={formData.visible}
                    onCheckedChange={(e: SwitchCheckedChangeDetails) =>
                      setFormData({ ...formData, visible: e.checked })
                    }
                  >
                    <Switch.Label>Visible</Switch.Label>
                    <Spacer />
                    <Switch.HiddenInput />
                    <Switch.Control />
                  </Switch.Root>
                </HStack>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={handleCloseModal}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button onClick={handleSubmit}>Save</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Box>
  );
};
