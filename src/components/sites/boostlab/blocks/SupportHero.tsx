import { SplitText } from "../ui/SplitText";
import { supportHero } from "../content";
import styles from "./SupportHero.module.css";

/** The support page's opening line: a flush-left h1 on plain black. */
export function SupportHero() {
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.heading}>
        <SplitText shrink>{supportHero.title}</SplitText>
      </h1>
    </section>
  );
}
