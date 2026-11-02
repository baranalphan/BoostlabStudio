import { Container } from "../ui/Layout";
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

/** A slim white footer: the copyright on the left, round social icon buttons on the right
 *  (stacked and centred on small screens). */
export function Footer() {
  return (
    <footer className={styles.main}>
      <Container className={styles.container}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} {footer.copyright}
        </p>
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
