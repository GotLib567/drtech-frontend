"use client";

import { useEffect, useState } from "react";
import styles from "./News.module.css";
import Image from "next/image";
import arrow from "../../assets/icons/arrow-to-right.svg";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
export interface INews {
  id: number;
  title: { rendered: string };
  acf: {
    show_on_main_page: string;
    post_location: string;
    post_subtitle: string;
    post_img: string;
    post_text: string;
    post_text_excerpt: string;
  };
}

export function News() {
  const [news, setNews] = useState<INews[]>([]);
  async function getNewsData() {
    try {
      const response = await fetch(
        "https://nozhtoporshop.na4u.ru/wp-json/wp/v2/posts?acf_format=standard&_fields=id,title,acf&show_on_main_page=true&post_location=down"
      );
      const data = await response.json();
      setNews(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getNewsData();
  }, []);
  return (
    <div className={styles["news"]}>
      <p className={styles["news-title"]}>Новости</p>
      <div className={styles["news-container"]}>
        <Swiper
          slidesPerView={
            typeof window !== "undefined" && window.innerWidth < 900 ? 1 : 3
          }
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className={styles['my-swiper']}
        >
          {news?.map((newData, index) => {
            return (
              <SwiperSlide className={styles['swiper-slide']} key={index}>
                <Link
                  href={`/News/${newData.id}`}
                  className={styles["new-containier"]}
                  key={index}
                >
                  <Image
                  unoptimized
                    className={styles["main-img"]}
                    width={180}
                    height={180}
                    src={newData.acf.post_img}
                    alt="img"
                  />
                  <div className={styles["new-info"]}>
                    <div className={styles["new-info-text-part"]}>
                      <p className={styles["new-title"]}>
                        {newData.title.rendered.toLocaleUpperCase()}
                      </p>
                      <p className={styles["new-subtitle"]}>
                        {newData.acf.post_text_excerpt}
                      </p>
                    </div>

                    <Image
                      src={arrow}
                      className={styles["arrow-img"]}
                      alt="img"
                    />
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
