"use client";

import React, { useEffect, useState } from "react";
import { IProduct } from "../../page";
import styles from "./styles.module.css";
import Image from "next/image";
import cartImage from "@/app/assets/icons/cart.svg";
import heart from "@/app/assets/icons/heart.svg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
interface IProps {
  data: IProduct;
}

export function ImageGallery({ data }: IProps) {
  const lsDataFavourite = JSON.parse(
    String(localStorage.getItem("favourite")) || ""
  );
  const lsDataCart = JSON.parse(String(localStorage.getItem("cart")) || "");

  const [isAddedToCart, setIsAddedToCart] = useState(
    lsDataCart ? Boolean(lsDataCart.find((x: any) => x.id === data.id)) : false
  );
  const [isAddedToFavourite, setIsAddedToFavourite] = useState(
    lsDataFavourite
      ? Boolean(lsDataFavourite.find((x: any) => x.id === data.id))
      : false
  );

  const handleAddToFavourite = () => {
    const favouriteStorage = JSON.parse(
      String(localStorage.getItem("favourite")) || ""
    );
    if (isAddedToFavourite) {
      const filteredStorage = favouriteStorage.filter(
        (elem: any) => elem.id !== data.id
      );
      localStorage.setItem("favourite", JSON.stringify([...filteredStorage]));
    } else {
      if (favouriteStorage === null) {
        localStorage.setItem("favourite", JSON.stringify([data]));
      } else {
        localStorage.setItem(
          "favourite",
          JSON.stringify([...favouriteStorage, data])
        );
      }
    }

    setIsAddedToFavourite((prev: boolean) => !prev);
  };

  const handleAddToCart = () => {
    const cartStorage = JSON.parse(String(localStorage.getItem("cart")) || "");
    if (isAddedToCart) {
      const filteredStorage = cartStorage.filter(
        (elem: any) => elem.id !== data.id
      );
      localStorage.setItem("cart", JSON.stringify([...filteredStorage]));
    } else {
      if (cartStorage === null) {
        localStorage.setItem("cart", JSON.stringify([data]));
      } else {
        localStorage.setItem("cart", JSON.stringify([...cartStorage, data]));
      }
    }
    setIsAddedToCart((prev: boolean) => !prev);
  };

  return (
    <div>
      <div className={styles["swiper-container"]}>
        <Swiper
          slidesPerView={1}
          spaceBetween={1}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          {data.acf.product_photos.map((imgUrl, index) => {
            return (
              <SwiperSlide key={index}>
                <Image
                  className={styles["slider-img"]}
                  src={imgUrl}
                  width={236}
                  height={224}
                  alt="img"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className={styles["buttons-container"]}>
        {data && data.acf.product_price && (
          <p className={styles["price"]}>
            {Number(data.acf.product_price).toLocaleString()} руб.
          </p>
        )}
        <button
          className={styles["cart-button"]}
          onClick={() => {
            handleAddToCart();
          }}
          style={{
            opacity: isAddedToCart ? "0.5" : "1",
          }}
        >
          в корзину{" "}
          <Image
            src={cartImage}
            width={46}
            height={44}
            alt="cartImage"
            className={styles["cart-image"]}
          />
        </button>
        <button
          className={styles["heart"]}
          onClick={() => {
            handleAddToFavourite();
          }}
        >
          <Image
            src={heart}
            width={123}
            height={123}
            alt="heart"
            className={styles["heart-image"]}
            style={{
              opacity: isAddedToFavourite ? "0.5" : "1",
            }}
          />
        </button>
      </div>
    </div>
  );
}
