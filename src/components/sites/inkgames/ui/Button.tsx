import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "../icons/ArrowIcon";
import styles from "./Button.module.css";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "tab"
  | "simple"
  | "simpleUnderline"
  | "light"
  | "simpleDark";

type CommonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  withIcon?: boolean;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  newTab?: boolean | null;
  onClick?: never;
  active?: never;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  newTab?: never;
  onClick?: () => void;
  active?: boolean;
  type?: "button" | "submit";
};

/**
 * The source's button renders its label twice. On hover the first copy slides up out of
 * the clipped chip while the duplicate slides in from below, so the label appears to
 * roll over. Both copies move on the same 0.5s back-ease.
 */
function Label({ children, withIcon }: { children: React.ReactNode; withIcon?: boolean }) {
  return (
    <>
      <span className={styles.label}>{children}</span>
      {withIcon ? (
        <span className={styles.icon}>
          <ArrowIcon />
        </span>
      ) : null}
    </>
  );
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "secondary", withIcon = false, className } = props;

  const body = (
    <span className={styles.content}>
      <span className={styles.inner}>
        <Label withIcon={withIcon}>{children}</Label>
      </span>
      <span className={styles.hover} aria-hidden="true">
        <Label withIcon={withIcon}>{children}</Label>
      </span>
    </span>
  );

  const rootClass = cn(styles.main, styles[variant], className);

  if ("href" in props && props.href) {
    const external = /^(https?:|mailto:|tel:)/.test(props.href);
    const target = props.newTab ? { target: "_blank", rel: "noreferrer noopener" } : {};
    return (
      <span className={rootClass}>
        {external ? (
          <a className={styles.link} href={props.href} {...target}>
            {body}
          </a>
        ) : (
          <Link className={styles.link} href={props.href} {...target}>
            {body}
          </Link>
        )}
      </span>
    );
  }

  const buttonType = "type" in props ? props.type : undefined;

  return (
    <button
      type={buttonType ?? "button"}
      className={rootClass}
      onClick={props.onClick}
      data-active={props.active ? "true" : undefined}
      aria-pressed={props.active === undefined ? undefined : props.active}
    >
      {body}
    </button>
  );
}
