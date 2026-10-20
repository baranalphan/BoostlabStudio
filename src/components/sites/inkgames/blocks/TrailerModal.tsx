"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { CmsMedia } from "@/types/inkgames";
import styles from "./TrailerModal.module.css";

/**
 * The trailer overlay the source opens from "Watch trailer": the video plays immediately,
 * a progress bar tracks it, Escape or the close button dismisses it, and the page behind
 * stops scrolling while it is open.
 */
export function TrailerModal({
  open,
  onClose,
  video,
}: {
  open: boolean;
  onClose: () => void;
  video: CmsMedia;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [closing, setClosing] = useState(false);
  const [shown, setShown] = useState(false);
  const [progress, setProgress] = useState(0);
  const mounted = open || closing;

  // One frame after mounting we flip `shown`, which is what the CSS transitions on.
  // Closing keeps the overlay mounted for the length of the fade.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(open));
    const t = open ? 0 : window.setTimeout(() => setClosing(false), 400);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    document.body.classList.toggle("disable-scroll", open);
    return () => document.body.classList.remove("disable-scroll");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!mounted) return;
    const el = videoRef.current;
    if (!el) return;
    if (open) void el.play().catch(() => undefined);
    else el.pause();
  }, [open, mounted]);

  if (!mounted) return null;

  return (
    <div
      className={styles.overlay}
      data-open={shown ? "true" : "false"}
      role="dialog"
      aria-modal="true"
      aria-label={video.alt ?? "Trailer"}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setClosing(true);
          onClose();
        }
      }}
    >
      <div className={styles.content}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close trailer">
          <X size={16} aria-hidden="true" />
        </button>
        <video
          ref={videoRef}
          src={video.url}
          playsInline
          controls={false}
          onTimeUpdate={(e) => {
            const el = e.currentTarget;
            setProgress(el.duration ? (el.currentTime / el.duration) * 100 : 0);
          }}
          onClick={(e) => {
            const el = e.currentTarget;
            if (el.paused) void el.play();
            else el.pause();
          }}
        />
        <div className={styles.progress} aria-hidden="true">
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
