"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import styles from "./style.module.css";
import { IFavouriteProduct } from "@/app/Manufacturer/[id]/components/Products/components/ProductBox";
import Image from "next/image";
import emptyImg from "@/app/assets/images/manufacturer-hero-image.png";

export function CartElement({
  data,
  productsToBuy,

  handleUpdateQuantity,
}: {
  data: IFavouriteProduct;
  productsToBuy: { id: number; quantity: number }[];

  handleUpdateQuantity: any;
}) {
  const [count, setCount] = useState(1);

  function handleAddToCart() {
    handleUpdateQuantity(data.id, count);
  }

  useEffect(() => {
    handleAddToCart();
  }, [count]);
  const element = document.createElement("span");
  element.innerHTML = data?.title?.rendered;
  const decodedText = element.textContent;
  return (
    <div className={styles["container"]}>
      <Image
        src={data.acf.product_photos[0] ? data.acf.product_photos[0] : emptyImg}
        width={263}
        height={212}
        alt="image"
        className={styles["image"]}
      />
      <div className={styles["description-container"]}>
        <h3>{decodedText}</h3>
        <p>{data.acf.product_description}</p>
      </div>
      <div className={styles["count-container"]}>
        <button
          className={styles["count-container-symbol"]}
          onClick={() => {
            if (count > 1) {
              setCount((prev: number) => prev - 1);
            }
          }}
        >
          -
        </button>
        <div className={styles["count-block"]}>
          <p>{count}</p>
        </div>
        <button
          className={styles["count-container-symbol"]}
          onClick={() => {
            setCount((prev: number) => prev + 1);
          }}
        >
          +
        </button>
      </div>
      <p className={styles["price"]}>{data.acf.product_price} руб.</p>
    </div>
  );
}
