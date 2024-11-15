"use client";
import { useEffect, useState } from "react";
import styles from "./SimilarProducts.module.css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ProductBox, {
  IFavouriteProduct,
} from "@/app/Manufacturer/[id]/components/Products/components/ProductBox";
import { consumer_key, consumer_secret } from "@/app/assets/data/wooCommerce";

export function SimilarProducts() {
  const [similarProducts, setSimilarProducts] = useState<IFavouriteProduct[]>(
    []
  );

  const getSimilarProduct = async (id: number) => {
    try {
      const response = await fetch(
        `https://nozhtoporshop.na4u.ru/wp-json/wc/v3/products/${id}?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}`
      );

      const data = await response.json();
      console.log(data);
      setSimilarProducts((prev) => [...prev, data]);

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const similarProducts =
      JSON.parse(String(localStorage.getItem("cart"))) || [];
    similarProducts.map((product: IFavouriteProduct) => {
      if (
        product.acf.extra_product1 &&
        typeof product.acf.extra_product1 !== "boolean"
      ) {
        getSimilarProduct(product.acf.extra_product1);
      }
      if (
        product.acf.extra_product2 &&
        typeof product.acf.extra_product2 !== "boolean"
      ) {
        getSimilarProduct(product.acf.extra_product2);
      }
      if (
        product.acf.extra_product3 &&
        typeof product.acf.extra_product3 !== "boolean"
      ) {
        getSimilarProduct(product.acf.extra_product3);
      }
    });
  }, []);
  console.log();
  return similarProducts.length ? (
    <section className={styles["slider"]}>
      <p className={styles["title"]}>С этими товарами также заказывают</p>
      <div className={styles["slider"]}>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className={styles.mySwiper}
        >
          {similarProducts.map((product: IFavouriteProduct, index: number) => {
            return (
              <SwiperSlide className={styles.swiperSlide} key={index}>
                <div className={styles.productContainer}>
                  <ProductBox product={product} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  ) : (
    <></>
  );
}
