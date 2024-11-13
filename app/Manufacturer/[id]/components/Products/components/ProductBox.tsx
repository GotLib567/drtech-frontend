"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import emptyImg from "@/app/assets/images/manufacturer-hero-image.png";
import styles from "../styles.module.css";
import cart from "@/app/assets/icons/cart.svg";
import heart from "@/app/assets/icons/heart.svg";
import sanitizeHtml from "sanitize-html";
import Link from "next/link";

export interface IFavouriteProduct {
  id: number;
  title: { rendered: string };
  acf: {
    ax_height: string;
    ax_weight: string;
    blade_hardness: string;
    blade_length: string;
    blade_width: string;
    butt_thickness: string;
    cutting_edge: string;
    handle_length: string;
    handle_material: string;
    manufacturer_id: number;
    product_category: boolean;
    product_description: string;
    product_photos: string[];
    product_price: string;
    product_steel: number;
    product_thumbnail: string;
    steel_hardness: string;
  };
}

export default function ProductBox({
  product,
}: {
  product: IFavouriteProduct;
}) {
  const lsDataFavourite = JSON.parse(
    String(localStorage.getItem("favourite")) || ""
  );
  const lsDataCart = JSON.parse(String(localStorage.getItem("cart")) || "");
  const [isAddedToCart, setIsAddedToCart] = useState(
    lsDataCart ? lsDataCart.find((x: any) => x.id === product.id) : false
  );
  const [isAddedToFavourite, setIsAddedToFavourite] = useState(
    lsDataFavourite
      ? lsDataFavourite.find((x: any) => x.id === product.id)
      : false
  );

  const element = document.createElement("p");
  element.innerHTML = product.title.rendered;
  const decodedText = element.textContent;

  const handleAddToFavourite = () => {
    const favouriteStorage = JSON.parse(
      String(localStorage.getItem("favourite")) || ""
    );
    if (isAddedToFavourite) {
      const filteredStorage = favouriteStorage.filter(
        (elem: any) => elem.id !== product.id
      );
      localStorage.setItem("favourite", JSON.stringify([...filteredStorage]));
    } else {
      if (favouriteStorage === null) {
        localStorage.setItem("favourite", JSON.stringify([product]));
      } else {
        localStorage.setItem(
          "favourite",
          JSON.stringify([...favouriteStorage, product])
        );
      }
    }

    setIsAddedToFavourite((prev: boolean) => !prev);
  };

  const handleAddToCart = () => {
    const cartStorage = JSON.parse(String(localStorage.getItem("cart")) || "");
    if (isAddedToCart) {
      const filteredStorage = cartStorage.filter(
        (elem: any) => elem.id !== product.id
      );
      localStorage.setItem("cart", JSON.stringify([...filteredStorage]));
    } else {
      if (cartStorage === null) {
        localStorage.setItem("cart", JSON.stringify([product]));
      } else {
        localStorage.setItem("cart", JSON.stringify([...cartStorage, product]));
      }
    }
    setIsAddedToCart((prev: boolean) => !prev);
  };

  return (
    <div className={styles["product-box"]}>
      <Link href={`/ProductCard/${product.id}`}>
        <Image
          src={product.acf.product_thumbnail}
          alt="emptyImg"
          width={164}
          height={155}
          className={styles["product-image"]}
        />
        <p className={styles["p-under-image"]}>{decodedText}</p>
      </Link>
      <div className={styles["price-and-icons-container"]}>
        <p className={styles["p-price"]}>{product.acf.product_price} руб.</p>
        <div className={styles['buttons-container']}>
        <button onClick={handleAddToFavourite}>
          <Image
            style={{ opacity: isAddedToFavourite ? "0.5" : "1" }}
            src={heart}
            alt="heart"
            width={17}
            height={17}
            className={styles["mini-icon"]}
          />
        </button>
        <button onClick={handleAddToCart}>
          <Image
            style={{ opacity: isAddedToCart ? "0.5" : "1" }}
            src={cart}
            alt="cart"
            width={17}
            height={17}
            className={styles["mini-icon"]}
          />
        </button>
        </div>
      </div>
    </div>
  );
}
