import { Header } from "@/components/sites/boostlab/layout/Header";
import { Footer } from "@/components/sites/boostlab/layout/Footer";
import { Button } from "@/components/sites/boostlab/ui/Button";
import styles from "./not-found.module.css";

/** Renders outside the (site) group, so it brings the header and footer itself. */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className={styles.main}>
        <p className={styles.code}>404</p>
        <h1 className={styles.heading}>Page not found</h1>
        <Button href="/" withIcon>
          Back to home
        </Button>
      </main>
      <Footer />
    </>
  );
}
