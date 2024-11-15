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
import { Navigation, Pagination, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
interface IProps {
  data: IProduct;
}

export function ImageGalleryComponent({ data }: IProps) {
  const lsDataFavourite = JSON.parse(
    String(localStorage.getItem("favourite")) || ""
  );
  const [lsDataCart, setLsDataCart] = useState(
    JSON.parse(String(localStorage.getItem("cart")))
  );
  const [isAddedToCart, setIsAddedToCart] = useState(
    lsDataCart ? lsDataCart.find((x: any) => x.id === data.id) : false
  );

  useEffect(() => {
    setIsAddedToCart(
      lsDataCart ? lsDataCart.find((x: any) => x.id === data.id) : false
    );
  }, [data]);
  console.log(data, lsDataCart, isAddedToCart);
  const [isAddedToFavourite, setIsAddedToFavourite] = useState(
    lsDataFavourite
      ? Boolean(lsDataFavourite.find((product: any) => product.id === data.id))
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
  const imageGalleryArray = data.images
    ? data.images.map((elem: { src: string }) => {
        return { original: elem.src, thumbnail: elem.src };
      })
    : [];

  return (
    <div className={styles["container"]}>
      <div className={styles["image-gallery-container"]}>
        <ImageGallery
          items={imageGalleryArray}
          thumbnailPosition="bottom"
          showPlayButton={false}
          showFullscreenButton={true}
          showNav={true}
          showThumbnails={true}
          lazyLoad={true}
        />
      </div>
      <div className={styles["buttons-container"]}>
        {data && data.price && (
          <p className={styles["price"]}>
            {Number(data.price).toLocaleString()} руб.
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
