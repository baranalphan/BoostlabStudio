import { Container, Grid, Spacer } from "../ui/Layout";
import { Button } from "../ui/Button";
import { SplitText } from "../ui/SplitText";
import { supportFaqs } from "../content";
import styles from "./FAQs.module.css";

/**
 * The source's ComponentBlocksFaqs: the heading and a "view all" button in the left
 * four columns, the question list in columns 7–12. Each row is a link to the hosted
 * help centre, not an accordion — hovering inverts it to the light chip.
 */
export function FAQs() {
  return (
    <section className={styles.main}>
      <Spacer size="l" />
      <Container>
        <Grid>
          <div className={styles.headCol}>
            <h2 className={styles.title}>
              <SplitText>{supportFaqs.title}</SplitText>
            </h2>
            <Spacer size="m" />
            <Button href={supportFaqs.viewAllButton.url} newTab variant="secondary" withIcon>
              {supportFaqs.viewAllButton.label}
            </Button>
            <Spacer size="l" />
          </div>

          <div className={styles.listCol}>
            {supportFaqs.items.map((item) => (
              <a
                className={styles.item}
                key={item.question}
                href={item.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                <p className={styles.category}>
                  <SplitText>{item.category}</SplitText>
                </p>
                <Spacer size="s" />
                <p className={styles.question}>
                  <SplitText>{item.question}</SplitText>
                </p>
              </a>
            ))}
            <Button href={supportFaqs.listButton.url} newTab variant="secondary" withIcon>
              {supportFaqs.listButton.label}
            </Button>
          </div>
        </Grid>
      </Container>
      <Spacer size="l" />
    </section>
  );
}
