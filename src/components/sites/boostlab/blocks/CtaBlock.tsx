import { Kicker, Spacer } from "../ui/Layout";
import { SplitText } from "../ui/SplitText";
import { Reveal } from "../ui/Reveal";
import { SteamIcon } from "../icons/SteamIcon";
import type { SiteLink } from "@/types/boostlab";
import styles from "./CtaBlock.module.css";

type CtaBlockProps = {
  heading: string;
  label?: string;
  steamLink?: SiteLink;
};

/** The games page's closing panel: plain black, with the heading and a Steam button
 *  centred. */
export function CtaBlock({ heading, label, steamLink }: CtaBlockProps) {
  return (
    <section className={styles.main}>
      <div className={styles.inner}>
        <div className={styles.content}>
          {label ? (
            <Reveal>
              <Kicker>{label}</Kicker>
            </Reveal>
          ) : null}
          <h2 className={styles.heading}>
            <SplitText>{heading}</SplitText>
          </h2>
          {steamLink ? (
            <Reveal delay={0.2}>
              <a
                className={styles.steamButton}
                href={steamLink.url}
                target={steamLink.newTab ? "_blank" : undefined}
                rel={steamLink.newTab ? "noreferrer noopener" : undefined}
              >
                <SteamIcon className={styles.steamIcon} />
                <span>{steamLink.label}</span>
              </a>
            </Reveal>
          ) : null}
        </div>
      </div>
      <Spacer size="xs" />
    </section>
  );
}
