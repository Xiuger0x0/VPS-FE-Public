import { createContext, useContext, useState, ReactNode } from "react";

export type PhotoCategory = "Motorcycle" | "Airsoft" | "Drone" | "Others";

export interface Photo {
  id: string;
  url: string;
  title: string;
  category: PhotoCategory;
  date: string;
  visible: boolean;
}

const MOCK_PHOTOS: Photo[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    title: "Urban Rider",
    category: "Motorcycle",
    date: "2023-10-01",
    visible: true,
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80",
    title: "Tactical Gear",
    category: "Airsoft",
    date: "2023-10-05",
    visible: true,
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80",
    title: "Sky High",
    category: "Drone",
    date: "2023-10-10",
    visible: true,
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1625043484555-47841a752840?auto=format&fit=crop&w=800&q=80",
    title: "Forest Trail",
    category: "Motorcycle",
    date: "2023-10-12",
    visible: true,
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&w=800&q=80",
    title: "Mountain View",
    category: "Others",
    date: "2023-10-15",
    visible: false, // Hidden by default
  },
];

interface PhotoContextType {
  photos: Photo[];
  addPhoto: (photo: Omit<Photo, "id">) => void;
  updatePhoto: (id: string, updatedPhoto: Partial<Photo>) => void;
  deletePhoto: (id: string) => void;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const PhotoProvider = ({ children }: { children: ReactNode }) => {
  const [photos, setPhotos] = useState<Photo[]>(MOCK_PHOTOS);

  const addPhoto = (photo: Omit<Photo, "id">) => {
    const newPhoto = { ...photo, id: Math.random().toString(36).substr(2, 9) };
    setPhotos((prev) => [newPhoto, ...prev]);
  };

  const updatePhoto = (id: string, updatedPhoto: Partial<Photo>) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedPhoto } : p))
    );
  };

  const deletePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <PhotoContext.Provider value={{ photos, addPhoto, updatePhoto, deletePhoto }}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotos = () => {
  const context = useContext(PhotoContext);
  if (context === undefined) {
    throw new Error("usePhotos must be used within a PhotoProvider");
  }
  return context;
};
