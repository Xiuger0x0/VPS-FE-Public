import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Badge,
  Tabs,
  VStack,
  HStack,
  Dialog,
  IconButton,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { usePhotos, PhotoCategory, Photo } from "@/context/PhotoContext";
import { FaTimes } from "react-icons/fa";

export const PhotographyPage = () => {
  const { photos } = usePhotos();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [open, setOpen] = useState(false);

  const categories: (PhotoCategory | "All")[] = [
    "All",
    "Motorcycle",
    "Airsoft",
    "Drone",
    "Others",
  ];

  const filteredPhotos = photos.filter(
    (p) =>
      p.visible &&
      (selectedCategory === "All" || p.category === selectedCategory)
  );

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <>
      <Helmet>
        <title>XIUGER VISION | Photography</title>
      </Helmet>

      <Box bg="#0f0f0f" minH="100vh" py={12}>
        <Container maxW="7xl">
          <VStack gap={8} align="start" mb={12}>
            <Heading size="2xl" color="white">
              XIUGER VISION
            </Heading>
            <Text color="gray.400" fontSize="lg">
              Capturing the world through different lenses.
            </Text>

            {/* Filter Tabs */}
            <Tabs.Root
              value={selectedCategory}
              onValueChange={(e) => setSelectedCategory(e.value)}
              variant="line"
              colorPalette="orange"
            >
              <Tabs.List bg="transparent" borderBottomColor="whiteAlpha.200">
                {categories.map((cat) => (
                  <Tabs.Trigger
                    key={cat}
                    value={cat}
                    color="gray.400"
                    _selected={{ color: "#FF6600", borderColor: "#FF6600" }}
                    _hover={{ color: "white" }}
                  >
                    {cat}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
            </Tabs.Root>
          </VStack>

          {/* Photo Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {filteredPhotos.map((photo) => (
              <Box
                key={photo.id}
                position="relative"
                cursor="pointer"
                overflow="hidden"
                borderRadius="lg"
                role="group"
                onClick={() => handlePhotoClick(photo)}
                borderWidth="1px"
                borderColor="transparent"
                transition="all 0.3s"
                _hover={{
                  borderColor: "#FF6600",
                  transform: "translateY(-4px)",
                  shadow: "lg",
                }}
              >
                <Image
                  src={photo.url}
                  alt={photo.title}
                  w="full"
                  h="300px"
                  objectFit="cover"
                  transition="transform 0.3s"
                  _groupHover={{ transform: "scale(1.05)" }}
                />
                
                {/* Overlay */}
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  w="full"
                  bg="blackAlpha.700"
                  p={4}
                  transform="translateY(100%)"
                  transition="transform 0.3s"
                  _groupHover={{ transform: "translateY(0)" }}
                >
                  <VStack align="start" gap={1}>
                    <Heading size="sm" color="white">
                      {photo.title}
                    </Heading>
                    <HStack>
                      <Badge colorPalette="orange" variant="solid">
                        {photo.category}
                      </Badge>
                      <Text fontSize="xs" color="gray.300">
                        {photo.date}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              </Box>
            ))}
          </SimpleGrid>

          {filteredPhotos.length === 0 && (
            <Box textAlign="center" py={20}>
              <Text color="gray.500">No photos found in this category.</Text>
            </Box>
          )}
        </Container>
      </Box>

      {/* Lightbox Modal */}
      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} size="full">
        <Dialog.Backdrop bg="blackAlpha.900" backdropFilter="blur(5px)" />
        <Dialog.Positioner>
          <Dialog.Content bg="transparent" boxShadow="none" h="100vh" w="100vw">
            <Dialog.Body p={0} display="flex" alignItems="center" justifyContent="center" h="full" position="relative">
               <IconButton
                  aria-label="Close"
                  position="absolute"
                  top={4}
                  right={4}
                  onClick={handleClose}
                  variant="ghost"
                  color="white"
                  size="lg"
                  zIndex={10}
                  _hover={{ bg: "whiteAlpha.200" }}
                >
                  <FaTimes />
                </IconButton>
              
              {selectedPhoto && (
                <Image
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  maxH="90vh"
                  maxW="90vw"
                  objectFit="contain"
                  boxShadow="2xl"
                />
              )}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
};
