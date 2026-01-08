import Footer from "./footer";
import Header from "./header";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ position: 'relative' }}>
      {/* Header nằm ở đây, sẽ hiển thị ở tất cả các trang con */}
      <Header />
      
      {/* Nội dung thay đổi (Home, News Detail...) sẽ được render vào đây */}
      {children}

      <Footer />
    </div>
  );
}
