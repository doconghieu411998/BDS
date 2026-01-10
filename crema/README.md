# Crema - Ant Design Wrapper Components

Thư mục này chứa các wrapper components cho Ant Design. Mục đích là tạo một lớp abstraction giữa UI library và application code.

## 🎯 Mục đích

1. **Tách biệt UI Library**: Không import trực tiếp từ `antd` trong application code
2. **Dễ dàng thay thế**: Có thể thay đổi UI library mà không ảnh hưởng toàn bộ codebase
3. **Customization**: Có thể thêm logic custom hoặc styling riêng cho từng component
4. **Consistency**: Đảm bảo tất cả components sử dụng cùng một pattern

## 📁 Cấu trúc

```
crema/
├── AntButton.tsx       # Wrapper cho Button
├── AntInput.tsx        # Wrapper cho Input (có Input.Password)
├── AntForm.tsx         # Wrapper cho Form (có Form.Item, Form.useForm)
├── AntCard.tsx         # Wrapper cho Card
├── AntTypography.tsx   # Wrapper cho Typography
├── AntLayout.tsx       # Wrapper cho Layout
├── AntMenu.tsx         # Wrapper cho Menu
├── AntDropdown.tsx     # Wrapper cho Dropdown
├── AntAvatar.tsx       # Wrapper cho Avatar
├── AntCheckbox.tsx     # Wrapper cho Checkbox
├── AntRow.tsx          # Wrapper cho Row
├── AntCol.tsx          # Wrapper cho Col
├── AntStatistic.tsx    # Wrapper cho Statistic
├── AntUpload.tsx       # Wrapper cho Upload
├── AntMessage.tsx      # Wrapper cho message
└── index.ts            # Export tất cả components
```

## 🔧 Quy tắc Wrapper Pattern

### 1. Naming Convention

-   Thêm prefix `Ant` vào tên component gốc
-   Ví dụ: `Button` → `AntButton`, `Input` → `AntInput`

### 2. Props Forwarding

-   Sử dụng spread operator để forward toàn bộ props
-   Đảm bảo TypeScript types được giữ nguyên

### 3. Sub-components

-   Giữ nguyên sub-components của Ant Design
-   Ví dụ: `AntInput.Password`, `AntForm.Item`, `AntLayout.Header`

## 💻 Sử dụng

### ❌ Không nên (Before)

```tsx
import { Button, Input, Form } from 'antd';

function MyComponent() {
    return (
        <Form>
            <Form.Item>
                <Input />
            </Form.Item>
            <Button>Submit</Button>
        </Form>
    );
}
```

### ✅ Nên (After)

```tsx
import { AntButton, AntInput, AntForm } from '@/crema';

function MyComponent() {
    return (
        <AntForm>
            <AntForm.Item>
                <AntInput />
            </AntForm.Item>
            <AntButton>Submit</AntButton>
        </AntForm>
    );
}
```

## 📦 Export Pattern

File `index.ts` export tất cả components và types:

```typescript
// Components
export { AntButton } from './AntButton';
export { AntInput } from './AntInput';
// ...

// Types
export type { MenuProps } from './AntMenu';
export type { FormInstance } from './AntForm';
```

## 🎨 Customization Example

Nếu cần customize một component, chỉ cần sửa trong file wrapper:

```typescript
// AntButton.tsx
export const AntButton: React.FC<ButtonProps> = (props) => {
    // Có thể thêm custom logic ở đây
    const handleClick = (e: React.MouseEvent) => {
        // Custom logic
        props.onClick?.(e);
    };

    return <AntdButton {...props} onClick={handleClick} />;
};
```

## 🔄 Tương lai

Khi cần migrate sang UI library khác (Material-UI, Chakra UI, etc.), chỉ cần:

1. Thay đổi implementation trong thư mục `crema`
2. Giữ nguyên API interface
3. Application code không cần sửa gì

## 📝 Best Practices

1. **Luôn import từ `@/crema`**, không bao giờ import trực tiếp từ `antd`
2. Khi cần thêm component mới, tạo wrapper tương ứng
3. Đặt tên wrapper theo convention: `Ant + ComponentName`
4. Export qua `index.ts` để dễ dàng import
5. Giữ nguyên TypeScript types của component gốc

## 🚀 Thêm Component Mới

Để thêm wrapper cho component mới:

1. Tạo file `AntComponentName.tsx`
2. Import component từ `antd`
3. Tạo wrapper component với props forwarding
4. Export trong `index.ts`

Example:

```typescript
// AntNewComponent.tsx
import React from 'react';
import { NewComponent as AntdNewComponent, NewComponentProps } from 'antd';

export const AntNewComponent: React.FC<NewComponentProps> = (props) => {
    return <AntdNewComponent {...props} />;
};

export default AntNewComponent;
```

```typescript
// index.ts
export { AntNewComponent } from './AntNewComponent';
```
