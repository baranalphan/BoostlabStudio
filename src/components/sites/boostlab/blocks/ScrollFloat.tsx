"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { Container, Grid, Kicker, Spacer } from "../ui/Layout";
import { Button } from "../ui/Button";
import { SplitText } from "../ui/SplitText";
import { Reveal } from "../ui/Reveal";
import { R3FBlock } from "../three/R3FBlock";
import { ScrollFloatScene } from "../three/ScrollFloatScene";
import type { CmsLink, GamesTab } from "@/types/boostlab";
import styles from "./ScrollFloat.module.css";

type Props =
  | {
      variant: "gamesExplore";
      label?: string;
      title: string;
      cta?: CmsLink;
      tabs?: never;
    }
  | {
      variant: "gamesTabs";
      label?: never;
      title?: never;
      cta?: never;
      tabs: GamesTab[];
    };

/**
 * The source's ComponentBlocksScrollFloat: a 160vh section whose inner 100vh wrapper
 * pins while objects travel past, driven by scroll progress. The `gamesTabs` variant adds
 * a tab bar that swaps the copy, the object set and the section's whole palette.
 */
export function ScrollFloat(props: Props) {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const [active, setActive] = useState(0);

  const isTabs = props.variant === "gamesTabs";
  const tab = isTabs ? props.tabs[active] : undefined;

  return (
    <section ref={ref} className={styles.main} data-tab={tab?.tabVariant}>
      <div className={styles.pinned}>
        <R3FBlock>
          <ScrollFloatScene
            variant={props.variant}
            tab={tab?.tabVariant}
            progress={progress}
          />
        </R3FBlock>
        <Container className={styles.container}>
          <Grid className={styles.grid}>
            <div className={styles.item}>
              <div className={cn(styles.contentWrapper, isTabs && styles.spacedOut)}>
                {isTabs ? (
                  <>
                    <h2 className={styles.heading} key={tab!.tabVariant}>
                      <SplitText>{tab!.title}</SplitText>
                    </h2>
                    <p className={styles.description}>{tab!.description}</p>
                    <div className={styles.tabsWrapper}>
                      <div className={styles.tabs} role="tablist">
                        {props.tabs.map((item, i) => (
                          <Button
                            key={item.tabVariant}
                            variant="tab"
                            active={i === active}
                            onClick={() => setActive(i)}
                          >
                            {item.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {props.label ? (
                      <Reveal>
                        <Kicker>{props.label}</Kicker>
                      </Reveal>
                    ) : null}
                    <h2 className={styles.heading}>
                      <SplitText>{props.title}</SplitText>
                    </h2>
                    {props.cta ? (
                      <Button
                        href={props.cta.url}
                        newTab={props.cta.newTab}
                        variant="secondary"
                        withIcon
                      >
                        {props.cta.label}
                      </Button>
                    ) : null}
                  </>
                )}
              </div>
            </div>
          </Grid>
        </Container>
      </div>
      <Spacer size="xs" />
    </section>
  );
}
