"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "../ui/Layout";
import { Button } from "../ui/Button";
import { InkGamesLogo } from "../icons/InkGamesLogo";
import { header } from "../content";
import styles from "./Header.module.css";

/**
 * Fixed header. It starts transparent and fades in once the page loader clears
 * (`html[data-loaded]`), and retracts upward while scrolling down, returning on
 * scroll up — the same behaviour the source's header has.
 */
export function Header() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScroll.current;
      if (y < 80) setHidden(false);
      else if (Math.abs(delta) > 6) setHidden(delta > 0);
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("disable-scroll", menuOpen);
    return () => document.body.classList.remove("disable-scroll");
  }, [menuOpen]);

  return (
    <header className={styles.container} data-hidden={hidden && !menuOpen ? "true" : "false"}>
      <a className={styles.skipToContent} href="#main">
        Skip to content
      </a>
      <Container>
        <div className={styles.main}>
          <div className={styles.logo}>
            <Link href="/" aria-label="INK Games home">
              <InkGamesLogo className={styles.logoSvg} />
            </Link>
          </div>

          <nav className={styles.nav} aria-label="Primary">
            <ul className={styles.menu}>
              {header.links.map((link) => (
                <li key={link.label}>
                  <Button href={link.url} variant="ghost">
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.buttons}>
            <div className={styles.notMobileButton}>
              <Button href={header.loginLink.url} newTab={header.loginLink.newTab} variant="ghost">
                {header.loginLink.label}
              </Button>
            </div>
            <div className={styles.notMobileButton}>
              <Button
                href={header.signUpLink.url}
                newTab={header.signUpLink.newTab}
                variant="primary"
                withIcon
              >
                {header.signUpLink.label}
              </Button>
            </div>
            <div className={styles.mobileButton}>
              <Button
                href={header.inkIDLink.url}
                newTab={header.inkIDLink.newTab}
                variant="primary"
                withIcon
              >
                {header.inkIDLink.label}
              </Button>
            </div>
            <div className={styles.toggleButton}>
              <button
                type="button"
                className={styles.navToggle}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span className={styles.burger} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </button>
            </div>
          </div>
        </div>
      </Container>

      <div className={styles.mobileNav} id="mobile-nav" data-open={menuOpen ? "true" : "false"}>
        <nav aria-label="Mobile">
          <ul className={styles.mobileMenu}>
            {header.links.map((link) => (
              <li key={link.label}>
                <Button href={link.url} variant="ghost">
                  {link.label}
                </Button>
              </li>
            ))}
            <li>
              <Button href={header.loginLink.url} newTab={header.loginLink.newTab} variant="ghost">
                {header.loginLink.label}
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
