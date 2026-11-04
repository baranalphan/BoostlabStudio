import { Container, Grid, Kicker } from "../ui/Layout";
import { SplitText } from "../ui/SplitText";
import { Reveal } from "../ui/Reveal";
import { homeNews } from "../content";
import type { NewsItem } from "@/types/boostlab";
import styles from "./NewsList.module.css";

/** `2025-05-14` → `05.14.25`; undated items read "Soon". */
function formatDate(iso?: string) {
  if (!iso) return "Soon";
  const [y, m, d] = iso.split("-");
  return `${m}.${d}.${y.slice(2)}`;
}

const NEWS: NewsItem[] = homeNews.news;

export function NewsList() {
  return (
    <section className={styles.main}>
      <Container className={styles.container}>
        <Grid>
          <div className={styles.titleColumn}>
            <Reveal>
              <Kicker className={styles.label}>{homeNews.label}</Kicker>
            </Reveal>
            <h2 className={styles.title}>
              <SplitText>{homeNews.title}</SplitText>
            </h2>
          </div>
        </Grid>

        <ul className={styles.list}>
          {NEWS.map((item, i) => {
            // Each row rises in as it scrolls into view, a beat after the one above it.
            const delay = i * 0.08;
            const content = (
              <>
                <Reveal mode="slide" delay={delay} className={styles.cap}>
                  {formatDate(item.date)}
                </Reveal>
                <Reveal mode="slide" delay={delay + 0.05} className={styles.cap}>
                  {item.title}
                </Reveal>
                <span className={styles.body}>
                  <SplitText delay={delay + 0.1} lineStagger={0.04}>
                    {item.description}
                  </SplitText>
                </span>
              </>
            );
            return (
              <li key={item.description} style={{ display: "contents" }}>
                {item.url ? (
                  <a className={styles.line} href={item.url} target="_blank" rel="noreferrer noopener">
                    {content}
                  </a>
                ) : (
                  <div className={styles.line}>{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
