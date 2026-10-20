import { Container, Grid } from "../ui/Layout";
import { Button } from "../ui/Button";
import { OctoMark } from "../icons/OctoMark";
import { footer } from "../content";
import type { CmsLink } from "@/types/inkgames";
import styles from "./Footer.module.css";

/**
 * The source's footer sits on white. Its three link columns render each link as a light
 * #EFEFEF chip that inverts to the dark chip on hover, while the legal links below are
 * plain text. Column titles are plain mono caps — no leading square.
 */
function LinkColumn({
  title,
  links,
  className,
  variant = "light",
}: {
  title: string;
  links: CmsLink[];
  className: string;
  variant?: "light" | "simpleDark";
}) {
  return (
    <div className={className}>
      <p className={styles.columnTitle}>{title}</p>
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.label}>
            <Button href={link.url} newTab={link.newTab} variant={variant}>
              {link.label}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className={styles.main}>
      <Container className={styles.container}>
        <Grid className={styles.grid}>
          <LinkColumn
            title={footer.inkLinks.title}
            links={footer.inkLinks.links}
            className={styles.colLinks}
          />
          <LinkColumn
            title={footer.socialLinks.title}
            links={footer.socialLinks.links}
            className={styles.colLinks}
          />
          <LinkColumn
            title={footer.contactLinks.title}
            links={footer.contactLinks.links}
            className={styles.colLinks}
          />

          <div className={styles.colAddress}>
            <p className={styles.columnTitle}>{footer.address.title}</p>
            <p className={styles.description}>{footer.address.description}</p>
          </div>

          <LinkColumn
            title={footer.legalLinks.title}
            links={footer.legalLinks.links}
            className={styles.colLegal}
            variant="simpleDark"
          />

          <div className={styles.colLogo}>
            <OctoMark className={styles.logo} />
          </div>
        </Grid>
      </Container>
    </footer>
  );
}
