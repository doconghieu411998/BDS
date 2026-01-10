import Footer from "./footer";
import Header from "./header";
import Preloader from "./pre-loading";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ position: 'relative' }}>
      
      <Preloader />

      <Header />
      
      <main className="content-fade-in">
        {children}
      </main>

      <Footer />
    </div>
  );
}