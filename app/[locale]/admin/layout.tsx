import AntdConfigProvider from './components/AntdConfigProvider';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AntdConfigProvider>
      {children}
    </AntdConfigProvider>
  );
}
