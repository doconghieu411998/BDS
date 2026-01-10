import Footer from "./footer";
import Header from "./header";
import LanguageSwitcher from "./language-switcher";
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

      <LanguageSwitcher />

      <Footer />
    </div>
  );
}