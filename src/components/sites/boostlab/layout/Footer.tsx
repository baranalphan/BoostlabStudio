import Image from "next/image";
import Link from "next/link";
import { Container } from "../ui/Layout";
import { Reveal } from "../ui/Reveal";
import { SteamIcon } from "../icons/SteamIcon";
import { DiscordIcon, InstagramIcon, LinkedInIcon } from "../icons/SocialIcons";
import { footer } from "../content";
import styles from "./Footer.module.css";

const ICONS = {
  instagram: InstagramIcon,
  steam: SteamIcon,
  linkedin: LinkedInIcon,
  discord: DiscordIcon,
};

/** A slim white footer: the copyright on the left, the outlined flask mark in the centre and
 *  round social icon buttons on the right (stacked and centred on small screens). */
export function Footer() {
  return (
    <footer className={styles.main}>
      <Container className={styles.container}>
        <Link href="/" aria-label="Boostlab home" className={styles.logo}>
          <Image
            src="/sites/boostlab/images/boost-black-outline.png"
            alt=""
            width={216}
            height={240}
            className={styles.logoImage}
          />
        </Link>
        <Reveal mode="slide" className={styles.copyright}>
          <p>
            © {new Date().getFullYear()} {footer.copyright}
          </p>
        </Reveal>
        <ul className={styles.socials}>
          {footer.socials.map((social) => {
            const Icon = ICONS[social.icon];
            return (
              <li key={social.label}>
                {social.url ? (
                  <a
                    className={styles.social}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                  >
                    <Icon className={styles.icon} />
                  </a>
                ) : (
                  <span className={styles.social} role="img" aria-label={social.label}>
                    <Icon className={styles.icon} />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </footer>
  );
}
