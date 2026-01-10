# Crema Core Modules Documentation

## 📁 Cấu trúc thư mục

```
src/crema/
├── components/          # Wrapper components cho Ant Design
│   ├── AntButton/
│   ├── AntModal/
│   ├── AntTable/
│   ├── AntInput/
│   └── AntSelect/
├── core/               # High-level reusable components
│   ├── DataTable/      # Module quản lý bảng dữ liệu
│   ├── DialogConfirm/  # Modal xác nhận
│   └── FormRowDataTable/ # Form thêm/sửa cho bảng
└── index.ts           # Barrel export
```

## 🎯 Core Modules

### 1. DataTable

Module quản lý bảng dữ liệu với đầy đủ tính năng.

**Files:**

-   `types.ts` - TypeScript interfaces
-   `DataTable.module.css` - Styles với Tailwind @apply
-   `TableHeader.tsx` - Header với search và nút thêm
-   `TableContent.tsx` - Wrapper cho AntTable
-   `ActionColumn.tsx` - Cột actions (Edit, Delete, View)
-   `index.tsx` - Main component

**Props:**

````typescript
interface DataTableProps<T> {
    // Data
    data: T[];
    columns: DataTableColumn<T>[];
    loading?: boolean;
    rowKey?: string | ((record: T) => string);

    // Pagination
    pagination?: {
        current: number;
        pageSize: number;
        total: number;
        onChange?: (page: number, pageSize: number) => void;
    };

    // Actions
    onAdd?: () => void;
    onEdit?: (record: T) => void;
    onDelete?: (record: T) => void;
    onView?: (record: T) => void;

    // Header
    title?: string;
    showSearch?: boolean;
    searchPlaceholder?: string;
    onSearch?: (value: string) => void;
    addButtonText?: string;
    headerExtra?: React.ReactNode;

**Sử dụng:**

```tsx
import { DataTable } from '@/crema/core/DataTable';

<DataTable
    title="Quản lý Bất động sản"
    data={properties}
    columns={columns}
    loading={loading}
    pagination={pagination}
    onAdd={handleAdd}
    onEdit={handleEdit}
    onDelete={handleDelete}
    onSearch={handleSearch}
/>;
````

### 2. DialogConfirm

Modal xác nhận hành động (Xóa, Hủy, etc.)

**Props:**

```typescript
interface DialogConfirmProps {
    open: boolean;
    onConfirm: () => void | Promise<void>;
    onCancel: () => void;
    title?: string;
    content?: string | React.ReactNode;
    type?: 'warning' | 'danger' | 'info';
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
}
```

**Sử dụng:**

```tsx
import { DialogConfirm } from '@/crema/core/DialogConfirm';

<DialogConfirm
    open={isOpen}
    title="Xác nhận xóa"
    content="Bạn có chắc chắn muốn xóa?"
    type="danger"
    onConfirm={handleConfirm}
    onCancel={handleCancel}
    loading={loading}
/>;
```

### 3. FormRowDataTable

Form Modal thêm/sửa dữ liệu cho bảng với Rich Text Editor.

**Props:**

```typescript
interface FormRowDataTableProps {
    open: boolean;
    onSave: (values: any) => void | Promise<void>;
    onCancel: () => void;
    title?: string;
    fields: FormField[];
    initialData?: any;
    loading?: boolean;
    width?: number;
}

interface FormField {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'number' | 'email' | 'select' | 'richtext' | 'upload';
    placeholder?: string;
    required?: boolean;
    options?: Array<{ label: string; value: any }>;
    rules?: any[];
    span?: number; // 1 = half width, 2 = full width
}
```

**Sử dụng:**

```tsx
import { FormRowDataTable } from '@/crema/core/FormRowDataTable';

const fields: FormField[] = [
  { name: 'title', label: 'Tiêu đề', type: 'text', required: true, span: 2 },
  { name: 'type', label: 'Loại', type: 'select', required: true, options: [...] },
  { name: 'price', label: 'Giá', type: 'number', required: true },
  { name: 'description', label: 'Mô tả', type: 'richtext', span: 2 },
];

<FormRowDataTable
  open={isOpen}
  title="Thêm Bất động sản"
  fields={fields}
  initialData={selectedItem}
  onSave={handleSave}
  onCancel={handleCancel}
  loading={loading}
/>
```

## 🔧 Wrapper Components

### Quy tắc

1. **Mỗi wrapper nằm trong folder riêng**: `src/crema/components/AntButton/index.tsx`
2. **Forward refs khi cần**: Input, Button, etc.
3. **Giữ nguyên props gốc**: Spread `{...props}` để maintain API
4. **Display name**: Set `displayName` cho debugging

### Ví dụ

```tsx
// src/crema/components/AntButton/index.tsx
import React from 'react';
import { Button as AntdButton, ButtonProps } from 'antd';

export const AntButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    return <AntdButton ref={ref} {...props} />;
});

AntButton.displayName = 'AntButton';
```

## 📦 Export Pattern

```typescript
// src/crema/core/index.ts
export { DataTable } from './DataTable';
export { DialogConfirm } from './DialogConfirm';
export { FormRowDataTable } from './FormRowDataTable';

export type { DataTableProps, DataTableColumn } from './DataTable/types';
export type { DialogConfirmProps } from './DialogConfirm';
export type { FormRowDataTableProps, FormField } from './FormRowDataTable';
```

## 🎨 Styling Guidelines

1. **Luôn dùng CSS Modules**: `Component.module.css`
2. **Luôn dùng @apply**: Không inline Tailwind trong JSX
3. **Semantic class names**: `.submitButton` thay vì `.blueButton`
4. **@reference directive**: Bắt buộc cho Tailwind CSS 4

```css
@reference 'tailwindcss';

.submitButton {
    @apply w-full h-12 bg-blue-600 hover:bg-blue-700;
    @apply text-white font-semibold rounded-lg;
    @apply transition-colors duration-200;
}
```

## 🚀 Sử dụng trong Module

### Ví dụ: PropertyList Module

```
src/modules/property/
├── mockData.ts          # Mock service và data
├── PropertyList.tsx     # Main component
└── PropertyList.module.css
```

**PropertyList.tsx:**

```tsx
import { DataTable } from '@/crema/core/DataTable';
import { DialogConfirm } from '@/crema/core/DialogConfirm';
import { FormRowDataTable } from '@/crema/core/FormRowDataTable';

export const PropertyList: React.FC = () => {
  // State management
  const [properties, setProperties] = useState<Property[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Define columns
  const columns: DataTableColumn<Property>[] = [...];

  // Define form fields
  const fields: FormField[] = [...];

  return (
    <div>
      <DataTable {...} />
      <FormRowDataTable {...} />
      <DialogConfirm {...} />
    </div>
  );
};
```

## ✅ Best Practices

1. **Tách logic ra hooks** khi component phức tạp
2. **Mock data riêng file** cho từng module
3. **TypeScript strict mode** - Định nghĩa đầy đủ types
4. **CSS Modules naming**: `camelCase` cho class names
5. **Component composition**: Tái sử dụng core modules thay vì viết lại

## 📚 Dependencies

-   **react-quill**: Rich text editor cho FormRowDataTable
-   **next/image**: Tối ưu hình ảnh thay vì `<img>`
-   **antd**: Base UI library (wrapped)
-   **tailwindcss**: Styling framework

## 🔄 Migration từ code cũ

1. Import từ `@/crema/core` thay vì `antd`
2. Chuyển inline classes sang CSS modules
3. Sử dụng DataTable thay vì viết AntTable trực tiếp
4. Form logic dùng FormRowDataTable với field config

---

**Updated:** January 9, 2026
**Version:** 1.0.0
