import { Container, Grid, Spacer } from "../ui/Layout";
import { Button } from "../ui/Button";
import { SplitText } from "../ui/SplitText";
import { supportDepartments } from "../content";
import styles from "./DepartmentLinks.module.css";

/**
 * The source's ComponentBlocksDepartmentLinks: five bordered cards in the 12-column
 * grid — full width below 768px, half width to 1024px, a third above.
 */
export function DepartmentLinks() {
  return (
    <section className={styles.main}>
      <Spacer size="l" />
      <Container>
        <Grid className={styles.grid}>
          {supportDepartments.items.map((item) => (
            <div className={styles.item} key={item.title}>
              <h2 className={styles.title}>
                <SplitText>{item.title}</SplitText>
              </h2>
              <Spacer size="m" />
              <p className={styles.description}>
                <SplitText>{item.description}</SplitText>
              </p>
              <Spacer size="l" />
              <Button href={item.cta.url} variant="secondary">
                {item.cta.label}
              </Button>
            </div>
          ))}
        </Grid>
      </Container>
      <Spacer size="l" />
    </section>
  );
}
