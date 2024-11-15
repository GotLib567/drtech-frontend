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
  stock_status: string;
  id: number;
  name: string;
  images: { src: string }[];
  acf: {
    extra_product1: number | boolean;
    extra_product2: number | boolean;
    extra_product3: number | boolean;
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
  price: string;
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
  const [showFavoriteTooltip, setShowFavoriteTooltip] = useState(false);
  const [showCartTooltip, setShowCartTooltip] = useState(false);

  const element = document.createElement("p");
  element.innerHTML = product.name;
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
        unoptimized
          src={product.images[0].src}
          alt="emptyImg"
          width={164}
          height={155}
          className={styles["product-image"]}
        />
        <p className={styles["p-under-image"]}>{decodedText}</p>
      </Link>
      <p className={styles["stock-status"]}>
        {product.stock_status === "instock"
          ? "В наличии"
          : product.stock_status === "outofstock"
          ? "Нет в наличии"
          : "Предзаказ"}
      </p>
      <div className={styles["price-and-icons-container"]}>
        <p className={styles["p-price"]}>{product.price} руб.</p>
        <div className={styles["buttons-container"]}>
          {showFavoriteTooltip && (
            <div style={{right: showFavoriteTooltip ? "0" : "-50px"}} className={styles["tooltip-heart"]}>
              {isAddedToFavourite ? (
                <p>Добавлено</p>
              ) : (
                <p>Добавить в избранное</p>
              )}
            </div>
          )}

          {showCartTooltip && (
            <div className={styles["tooltip-cart"]}>
              {" "}
              {isAddedToCart ? (
                <p>Добавлено</p>
              ) : (
                <p>Добавить в корзину</p>
              )}
            </div>
          )}
          <button
            onMouseEnter={() => {
              setShowFavoriteTooltip(true);
            }}
            onMouseLeave={() => {
              setShowFavoriteTooltip(false);
            }}
            className={styles["heart"]}
            onClick={handleAddToFavourite}
          >
            <Image
              id="heart"
              style={{ opacity: isAddedToFavourite ? "0.5" : "1" }}
              src={heart}
              alt="heart"
              width={17}
              height={17}
              className={styles["mini-icon"]}
            />
          </button>

          <button
            onMouseEnter={() => {
              setShowCartTooltip(true);
            }}
            onMouseLeave={() => {
              setShowCartTooltip(false);
            }}
            className={styles["cart"]}
            onClick={handleAddToCart}
          >
            <Image
              id="cart"
              style={{ opacity: isAddedToCart ? "0.5" : "1" }}
              src={cart}
              alt="cart"
              width={17}
              height={17}
              className={styles["mini-icon"]}
              unoptimized
            />
          </button>
        </div>
      </div>
    </div>
  );
}
