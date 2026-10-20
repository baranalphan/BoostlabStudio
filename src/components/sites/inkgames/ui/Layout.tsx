import { cn } from "@/lib/utils";
import styles from "./Layout.module.css";

export function Container({
  children,
  className,
  as: As = "div",
  ...rest
}: React.ComponentPropsWithoutRef<"div"> & {
  as?: "div" | "section" | "header" | "footer";
}) {
  return (
    <As className={cn(styles.container, className)} {...rest}>
      {children}
    </As>
  );
}

export function Grid({
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn(styles.grid, className)} {...rest}>
      {children}
    </div>
  );
}

/**
 * The source drives column spans off its breakpoint set. Rather than generate a class
 * per combination, spans are passed through as custom properties and read by the
 * media queries in GridItem.module.css.
 */
export function GridItem({
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn(styles.gridItem, className)} {...rest}>
      {children}
    </div>
  );
}

/** Vertical rhythm element. `size` maps onto the source's spacing scale. */
export function Spacer({ size = "m" }: { size?: "xs" | "s" | "m" | "l" | "xl" }) {
  return <span className={styles.spacer} style={{ minHeight: `var(--space-${size})` }} />;
}

/** The small mono label with the filled square in front of it. */
export function Kicker({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn(styles.kicker, className)}>
      <span className={styles.kickerSquare} aria-hidden="true" />
      {children}
    </p>
  );
}
