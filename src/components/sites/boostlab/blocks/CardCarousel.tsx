"use client";

import Image from "next/image";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { cn } from "@/lib/utils";
import { Container, Kicker } from "../ui/Layout";
import { SplitText } from "../ui/SplitText";
import { Reveal } from "../ui/Reveal";
import { ChevronIcon } from "../icons/ChevronIcon";
import { gamesCarousel } from "../content";
import styles from "./CardCarousel.module.css";

import "swiper/css";

/*
 * Swiper's loop mode needs more slides than are on screen at once, so the game list is
 * repeated; scrolling past the last game simply brings the first one back round.
 */
const REPEAT = 3;
const SLIDES = Array.from({ length: REPEAT }, () => gamesCarousel.cards).flat();

/**
 * The source's ComponentBlocksCardCarousel, looping endlessly through our games. Inactive
 * slides sit at scale(0.7); the active one scales up to 1.
 */
export function CardCarousel() {
  const swiper = useRef<SwiperClass | null>(null);

  return (
    <section className={styles.main}>
      <Container>
        <div className={styles.titleWrapper}>
          <Reveal>
            <Kicker>{gamesCarousel.label}</Kicker>
          </Reveal>
          <h2 className={styles.title}>
            <SplitText>{gamesCarousel.title}</SplitText>
          </h2>
        </div>
      </Container>

      <div className={styles.swiperWrapper}>
        <Swiper
          onSwiper={(instance) => {
            swiper.current = instance;
          }}
          // Exactly three whole cards on screen (one on phones) — no peeking neighbours.
          slidesPerView={1}
          spaceBetween={0}
          centeredSlides
          loop
          breakpoints={{
            768: { slidesPerView: 3, spaceBetween: 20 },
            1440: { slidesPerView: 3, spaceBetween: 30 },
            1800: { slidesPerView: 3, spaceBetween: 40 },
          }}
        >
          {SLIDES.map((card, i) => (
            <SwiperSlide key={`${card.title}-${i}`}>
              <div className={styles.face}>
                {card.url ? (
                  <a
                    className={styles.cardLink}
                    href={card.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${card.title} on Steam`}
                  />
                ) : null}
                <div className={styles.faceMedia}>
                  <Image
                    className={styles.faceImage}
                    src={card.image.url}
                    alt={card.image.alt ?? ""}
                    width={card.image.width ?? 900}
                    height={card.image.height ?? 900}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className={styles.faceInner}>
                  <p className={styles.itemTitle}>{card.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.paginationWrapper}>
          <div className={styles.pagination}>
            <button
              type="button"
              className={styles.paginationButton}
              aria-label="Previous card"
              onClick={() => swiper.current?.slidePrev()}
            >
              <ChevronIcon className={styles.paginationIcon} />
            </button>
            <button
              type="button"
              className={styles.paginationButton}
              aria-label="Next card"
              onClick={() => swiper.current?.slideNext()}
            >
              <ChevronIcon className={cn(styles.paginationIcon, styles.flip)} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
