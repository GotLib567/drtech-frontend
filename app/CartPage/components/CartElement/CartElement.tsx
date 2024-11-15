"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import styles from "./style.module.css";
import { IFavouriteProduct } from "@/app/Manufacturer/[id]/components/Products/components/ProductBox";
import Image from "next/image";
import emptyImg from "@/app/assets/images/manufacturer-hero-image.png";
import { IProduct } from "@/app/ProductCard/[id]/page";

export function CartElement({
  data,
  setCartData,
  cartData,
  handleUpdateQuantity,
}: {
  data: IFavouriteProduct;
  cartData: any;
  setCartData: any;
  handleUpdateQuantity: any;
}) {
  const [count, setCount] = useState(1);

  function handleAddToCart() {
    handleUpdateQuantity(data.id, count);
  }

  useEffect(() => {
    handleAddToCart();
  }, [count]);

  const removeProductFromCart = () => {
    const newCartData = cartData.filter((productInCart: IProduct) => {
      return productInCart.id !== data.id;
    });
    setCartData(newCartData);
    localStorage.setItem("cart", JSON.stringify(newCartData));
  };

  const element = document.createElement("span");
  element.innerHTML = data?.name;
  const decodedText = element.textContent;
  return (
    <div className={styles["container"]}>
      <Image
      unoptimized
        src={data.images[0].src ? data.images[0].src : emptyImg}
        width={263}
        height={212}
        alt="image"
        className={styles["image"]}
      />
      <div className={styles["description-container"]}>
        <h3>{decodedText}</h3>
        <p>{data?.acf?.product_description}</p>
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
      <p className={styles["price"]}>{data.price} руб.</p>
      <button
        onClick={removeProductFromCart}
        className={styles["delete-button"]}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 7 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="1.14142"
            y1="0.858579"
            x2="6.14142"
            y2="5.85858"
            stroke="white"
            strokeWidth="0.4"
          />
          <line
            x1="0.858579"
            y1="5.85858"
            x2="5.85858"
            y2="0.858579"
            stroke="white"
            strokeWidth="0.4"
          />
        </svg>
      </button>
    </div>
  );
}
