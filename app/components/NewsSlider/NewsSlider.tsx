"use client";
import { useEffect, useState } from "react";
import styles from "./NewsSlider.module.css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
interface INewsData {
  acf: {
    post_img: string;
    post_location: string;
    post_subtitle: string;
    post_text: string;
    show_on_main_page: boolean;
    post_text_excerpt: string;
  };
  id: number;
  title: { rendered: string };
}

export function NewsSlider() {
  const [newsData, setNewsData] = useState<INewsData[]>([]);

  async function getNewsData() {
    try {
      const response = await fetch(
        "https://nozhtoporshop.na4u.ru/wp-json/wp/v2/posts?acf_format=standard&_fields=id,title,acf&show_on_main_page=true&post_location=up"
      );
      const data = await response.json();
      setNewsData(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getNewsData();
  }, []);

  return (
    <section className={styles["news-slider"]}>
      <div className={styles["slider"]}>
        <Swiper
          slidesPerView={1}
          spaceBetween={1}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {newsData.map((newData, index) => {
            const element = document.createElement("p");
            element.innerHTML = newData.acf.post_text_excerpt;
            const decodedText = element.textContent;
            return (
              <SwiperSlide key={index}>
                <div
                  style={{ backgroundImage: `url(${newData.acf.post_img})` }}
                  className={styles["slider-element"]}
                >
                  <div className={styles["new-container"]}>
                    <div className={styles["new-text-container"]}>
                      <p className={styles["title"]}>
                        {newData.title.rendered}
                      </p>
                      <p className={styles["subtitle"]}>{decodedText}</p>
                    </div>
                    <Link
                      href={`/News/${newData.id}`}
                      className={styles["button"]}
                    >
                      <p>Узнать больше</p>
                      <svg
                        className={styles["arrow"]}
                        width="35"
                        height="26"
                        viewBox="0 0 35 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 13.0002H32M21.9998 24.3139L33.3135 13.0002L21.9998 1.68652"
                          stroke="#F7F9FC"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
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
