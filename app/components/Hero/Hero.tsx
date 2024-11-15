"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import styles from "./Hero.module.css";

export function Hero() {
  const [heroData, setHeroData] = useState([]);
  async function getHeroData() {
    try {
      const response = await fetch(
        "https://nozhtoporshop.na4u.ru/wp-json/wp/v2/posts?acf_format=standard&_fields=id,title,acf&show_on_main_page=true&post_location=head"
      );
      const data = await response.json();
      setHeroData(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getHeroData();
  }, []);

  return (
    <section className={styles["hero"]}>
      <div className={styles["slider"]}>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {heroData.map((elem: any, index) => {
            const element = document.createElement("span");
            element.innerHTML = elem.acf.post_text_excerpt;
            const decodedText = element.textContent;
            return (
              <SwiperSlide className={styles['swiper-slider-container']} key={index}>
                <div className={styles["slider-container"]}>
                  <Image
                  unoptimized
                    className={styles["image"]}
                    width={300}
                    height={300}
                    src={elem.acf.post_img}
                    alt="img"
                  />
                  <div className={styles["text-content"]}>
                    <p className={styles["title"]}>{elem.title.rendered}</p>
                    <p className={styles["text"]}><span>{decodedText}</span></p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
7;
