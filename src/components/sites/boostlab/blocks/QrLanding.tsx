import Image from "next/image";
import Link from "next/link";
import { SplitText } from "../ui/SplitText";
import { ArrowIcon } from "../icons/ArrowIcon";
import { CameraIcon } from "../icons/CameraIcon";
import { SteamIcon } from "../icons/SteamIcon";
import { DiscordIcon, InstagramIcon, LinkedInIcon } from "../icons/SocialIcons";
import { footer, header, qrLanding } from "../content";
import styles from "./QrLanding.module.css";

const ICONS = {
  instagram: InstagramIcon,
  steam: SteamIcon,
  linkedin: LinkedInIcon,
  discord: DiscordIcon,
};

const external = { target: "_blank", rel: "noreferrer noopener" };

/** The page behind the QR stickers: a home link, the logo, two big tap targets (the photo
 *  form and the Steam page) and the social icons, sized for a phone held in one hand. */
export function QrLanding() {
  const socials = footer.socials.filter((social) => social.url);

  return (
    <div className={styles.main} lang={qrLanding.lang}>
      <Link href="/" className={styles.home}>
        <ArrowIcon className={styles.homeIcon} />
        {qrLanding.home}
      </Link>

      <div className={styles.content}>
        <Image
          src={header.logo.url}
          alt={header.logo.alt}
          width={header.logo.width}
          height={header.logo.height}
          className={styles.logo}
          priority
        />
        {/* English name: under lang="tr" the uppercase would turn "Studio" into "STUDİO". */}
        <p className={styles.kicker} lang="en">
          {qrLanding.kicker}
        </p>
        <h1 className={styles.heading}>
          <SplitText shrink delay={0.1}>
            {qrLanding.title}
          </SplitText>
        </h1>

        <div className={styles.actions}>
          <a className={`${styles.action} ${styles.primary}`} href={qrLanding.photoLink.url} {...external}>
            <CameraIcon className={styles.actionIcon} />
            <span>{qrLanding.photoLink.label}</span>
          </a>
          <a className={`${styles.action} ${styles.secondary}`} href={qrLanding.steamLink.url} {...external}>
            <SteamIcon className={styles.actionIcon} />
            <span>{qrLanding.steamLink.label}</span>
          </a>
        </div>
      </div>

      <nav aria-label={qrLanding.socialsLabel}>
        <ul className={styles.socials}>
          {socials.map((social) => {
            const Icon = ICONS[social.icon];
            return (
              <li key={social.label}>
                <a className={styles.social} href={social.url} aria-label={social.label} {...external}>
                  <Icon className={styles.socialIcon} />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
