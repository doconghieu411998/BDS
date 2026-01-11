import Footer from "./(components)/footer";
import Header from "./(components)/header";
import LanguageSwitcher from "./(components)/language-switcher";
import Preloader from "./(components)/pre-loading";

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