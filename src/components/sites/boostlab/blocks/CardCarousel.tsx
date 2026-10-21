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

/**
 * The source's ComponentBlocksCardCarousel. Inactive slides sit at scale(0.7); the active
 * one scales to 1 and rotates a half turn on Y, flipping from the still artwork to the
 * gameplay video on its back face.
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
          slidesPerView={1.5}
          spaceBetween={0}
          centeredSlides
          initialSlide={Math.floor(gamesCarousel.cards.length / 2)}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1440: { slidesPerView: 3.5, spaceBetween: 30 },
            1800: { slidesPerView: 4, spaceBetween: 40 },
          }}
        >
          {gamesCarousel.cards.map((card) => (
            <SwiperSlide key={card.label}>
              <div className={cn(styles.face, styles.faceBack)}>
                <div className={styles.faceMedia}>
                  <video
                    src={card.video.url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={card.video.alt ?? undefined}
                  />
                </div>
                <div className={styles.faceInner}>
                  <Kicker>{card.label}</Kicker>
                  <p className={styles.itemTitle}>{card.title}</p>
                </div>
              </div>
              <div className={styles.face}>
                <div className={styles.faceMedia}>
                  <Image
                    src={card.image.url}
                    alt={card.image.alt ?? ""}
                    width={card.image.width ?? 900}
                    height={card.image.height ?? 900}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className={styles.faceInner}>
                  <Kicker>{card.label}</Kicker>
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
