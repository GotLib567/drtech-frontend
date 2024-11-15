"use client";
import React, { useState } from "react";
import styles from "./style.module.css";
import Image from "next/image";
import ProductBox from "../Manufacturer/[id]/components/Products/components/ProductBox";
import { Navigation } from "../components/Navigation/Navigation";

export default function Page() {
  const [favouriteData, setFavouriteData] = useState(
    typeof window !== "undefined"
      ? JSON.parse(String(localStorage.getItem("favourite")) || "")
      : []
  );

  return (
    <div className={styles["body"]}>
      <div className={styles["wrapper"]}>
        <Navigation />
        <h1 className={styles["h1"]}>Избранные товары</h1>
        {(!favouriteData || favouriteData.length === 0) && (
          <p className={styles["p"]}>
            Здесь будут товары, которые вы добавите в избранное
          </p>
        )}
        <div className={styles["favourite-container"]}>
          {favouriteData?.map((data: any) => {
            return <ProductBox product={data} key={data.id} />;
          })}
        </div>
      </div>
    </div>
  );
}
