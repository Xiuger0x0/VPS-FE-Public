// projectData.ts
export interface ProjectItem {
  id: number;
  name: string;
  description: string;
  image: string;
  link?: string;
}

export const projectList: ProjectItem[] = [
  {
    id: 1,
    name: "AI 個人助理",
    description: "一個基於 GPT 模型的個人智慧助理，支援多語音互動。",
    image:
      "https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?auto=format&fit=crop&w=900&q=60",
    link: "https://example.com/ai-assistant",
  },
  {
    id: 2,
    name: "旅遊相簿",
    description: "以地圖為核心的旅遊相簿展示平台。",
    image:
      "https://images.unsplash.com/photo-1438183972690-6d4658e3290e?auto=format&fit=crop&w=2274&q=80",
    link: "https://example.com/travel-album",
  },
  // 可繼續添加其他專案
];
