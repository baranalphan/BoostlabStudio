"use client";

import { useEffect, useState } from "react";
import { Container } from "../ui/Layout";
import { Button } from "../ui/Button";
import { cookies } from "../content";
import styles from "./Cookies.module.css";

const STORAGE_KEY = "inkgames-cookie-consent";

/**
 * Matches the source's banner: a #272727 chip pinned spacing(m) from the bottom with a
 * "Learn More" text link and Accept / Deny. The choice is remembered per browser.
 */
export function Cookies() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let reveal = 0;
    const frame = requestAnimationFrame(() => {
      let stored: string | null = null;
      try {
        stored = window.localStorage.getItem(STORAGE_KEY);
      } catch {
        // Private browsing or blocked storage — just show the banner.
      }
      if (stored) return;
      setOpen(true);
      reveal = window.setTimeout(() => setShown(true), 900);
    });
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(reveal);
    };
  }, []);

  const choose = (value: "accept" | "deny") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Ignore — the banner still closes for this visit.
    }
    setShown(false);
    window.setTimeout(() => setOpen(false), 400);
  };

  if (!open) return null;

  return (
    <Container className={styles.wrapper} data-shown={shown ? "true" : "false"}>
      <div className={styles.inner}>
        <div className={styles.textWrapper}>
          <p className={styles.text}>{cookies.text}</p>
          <Button href={cookies.moreButton.url} variant="simpleUnderline">
            {cookies.moreButton.label}
          </Button>
        </div>
        <div className={styles.buttonWrapper}>
          <Button variant="simple" onClick={() => choose("accept")}>
            Accept
          </Button>
          <Button variant="simple" onClick={() => choose("deny")}>
            Deny
          </Button>
        </div>
      </div>
    </Container>
  );
}
