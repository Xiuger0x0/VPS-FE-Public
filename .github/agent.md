# VPS Project UI Style Guide

此文檔定義了 VPS 專案的 UI 設計規範，旨在確保所有頁面風格的一致性。本專案採用 **永久深色模式 (Permanent Dark Mode)** 搭配 **玻璃擬態 (Glassmorphism)** 風格。

## 1. 核心設計理念 (Core Philosophy)
- **風格**: 極簡主義 (Minimalist)、深色主題 (Dark Theme)、科技感。
- **視覺效果**: 大量使用半透明背景 (`whiteAlpha`) 與背景模糊 (`backdropFilter`)。
- **主要色調**: 深灰/黑背景，搭配 橘色 (`#FF6600`) 主色與 青色 (`#00FFFF`) 輔助色。

## 2. 色彩規範 (Color Palette)

### 背景色 (Backgrounds)
- **頁面背景 (Page Background)**: `#0f0f0f` (極深灰，接近黑)
- **表面背景 (Surface/Dialog)**: `#1a1a1a` (用於 Modal、Dropdown 等不透明層)
- **玻璃背景 (Glass Background)**: `whiteAlpha.50` (常用於卡片、區塊)

### 品牌色 (Brand Colors)
- **主色 (Primary - Orange)**: `#FF6600` (Chakra: `orange.500` / `orange.400`)
  - 用途: 主要按鈕、標題強調、Hover 效果、Focus Ring。
- **輔助色 (Secondary - Cyan)**: `#00FFFF` (Chakra: `cyan.400`)
  - 用途: 漸層搭配、特殊標籤、科技感裝飾。

### 文字顏色 (Typography Colors)
- **主要文字**: `white` (純白)
- **次要文字**: `gray.300` 或 `gray.400`
- **微弱文字/佔位符**: `gray.500` or `whiteAlpha.400`

### 邊框與分隔線 (Borders & Dividers)
- **標準邊框**: `whiteAlpha.200` (用於卡片邊框、分隔線)
- **輸入框邊框**: 通常移除預設邊框，改用背景色區分。

## 3. 元件樣式 (Component Styles)

### 卡片與容器 (Cards & Containers)
標準的玻璃擬態容器樣式：
```tsx
<Box
  bg="whiteAlpha.50"
  backdropFilter="blur(12px)" // 或 blur(10px)
  border="1px solid"
  borderColor="whiteAlpha.200"
  rounded="2xl" // 或 xl
  shadow="lg"
>
  {/* Content */}
</Box>
```

### 按鈕 (Buttons)
**主要按鈕 (Primary Action)**:
```tsx
<Button
  bg="orange.500"
  color="white"
  _hover={{ bg: "orange.600" }}
>
  Action
</Button>
```

**次要/幽靈按鈕 (Ghost/Secondary)**:
```tsx
<Button
  variant="ghost"
  color="gray.400"
  _hover={{ color: "white", bg: "whiteAlpha.100" }}
>
  Cancel
</Button>
```

**圖標按鈕 (Icon Button)**:
```tsx
<IconButton
  variant="ghost"
  color="gray.400"
  _hover={{ bg: "whiteAlpha.200", color: "white" }}
  icon={<IconName />}
/>
```

### 輸入框 (Inputs)
去除預設邊框，使用半透明背景，Focus 時顯示品牌色光暈：
```tsx
<Input
  bg="whiteAlpha.100"
  border="none"
  color="white"
  _placeholder={{ color: "gray.500" }}
  _focus={{ ring: 2, ringColor: "orange.400" }}
/>
```

### 表格 (Tables)
```tsx
<Table.Root variant="outline" size="sm">
  <Table.Header>
    <Table.Row borderBottom="1px solid" borderColor="whiteAlpha.200">
      <Table.ColumnHeader color="gray.400" textTransform="uppercase" fontSize="xs">
        Title
      </Table.ColumnHeader>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row _hover={{ bg: "whiteAlpha.50" }} borderBottom="1px solid" borderColor="whiteAlpha.100">
      <Table.Cell color="white">Content</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>
```

### 對話框 (Dialogs / Modals)
由於 `Portal` 會脫離玻璃背景，通常使用實色背景以避免視覺干擾，但保持深色風格：
```tsx
<Dialog.Content
  bg="#1a1a1a"
  color="white"
  border="1px solid"
  borderColor="whiteAlpha.200"
>
  {/* ... */}
</Dialog.Content>
```

## 4. 佈局規範 (Layout)

### 固定 Header 避讓
由於 Header 是 `fixed` 定位，頁面最外層容器需要設定頂部內距：
```tsx
<Box 
  minH="100vh" 
  p={{ base: 4, md: 8 }} 
  pt={{ base: 20, md: 24 }} // 關鍵：避開 Header 高度
>
  {/* Page Content */}
</Box>
```

### 響應式容器
主要內容通常限制最大寬度：
```tsx
<Box maxW="7xl" mx="auto">
  {/* ... */}
</Box>
```

## 5. 圖標 (Icons)
- 主要使用 `react-icons/md` (Material Design) 或 `react-icons/fa` (FontAwesome)。
- 圖標顏色通常與文字顏色一致 (`gray.400` -> `white` on hover) 或使用品牌色 (`orange.400`) 強調。
