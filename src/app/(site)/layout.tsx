import { Header } from "@/components/sites/boostlab/layout/Header";
import { Footer } from "@/components/sites/boostlab/layout/Footer";

/** Every public page: the fixed header, the page itself and the footer. */
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
