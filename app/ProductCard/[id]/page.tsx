"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { ProductDescription } from "./components/ProductDescription/ProductDescription";
import styles from "./style.module.css";
import { CommentBlock } from "./components/CommentBlock/CommentBlock";
import { Navigation } from "@/app/components/Navigation/Navigation";

export interface IProduct {
  id: number;
  title: { rendered: string };
  acf: {
    product_price: string;
    product_description: string;
    product_photos: string[];
    product_thumbnail: string;
    manufacturer_id: number;
    product_category: string;
    product_steel: number;
    blade_length: string;
    butt_thickness: string;
    blade_width: string;
    blade_hardness: string;
    handle_length: string;
    handle_material: string;
    cutting_edge: string;
    ax_height: string;
    steel_hardness: string;
    ax_weight: string;
  };
}

export default function Page() {
  const { id } = useParams();
  const [productData, setProductData] = useState<IProduct>({
    id: 0,
    title: { rendered: "" },
    acf: {
      product_price: "",
      product_description: "",
      product_photos: [""],
      product_thumbnail: "",
      manufacturer_id: 0,
      product_category: "",
      product_steel: 0,
      blade_length: "",
      butt_thickness: "",
      blade_width: "",
      blade_hardness: "",
      handle_length: "",
      handle_material: "",
      cutting_edge: "",
      ax_height: "",
      steel_hardness: "",
      ax_weight: "",
    },
  });

  async function getPostData() {
    try {
      const response = await fetch(
        `https://nozhtopor.na4u.ru/wp-json/wp/v2/products?acf_format=standard&_fields=id,title,acf&include=${id}`
      );
      const data = await response.json();
      setProductData(data[0]);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getPostData();
  }, []);
  const element = document.createElement("span");
  element.innerHTML = productData.title.rendered;
  const decodedText = element.textContent;
  return (
    <div className={styles["body"]}>
      <Navigation />
      <div className={styles['wrapper']}>
        {productData && (
          <div className={styles["hero-container"]}>
            <ImageGallery data={productData} />
            <div className={styles["description-block"]}>
              <h1 className={styles["h1"]}>{decodedText}</h1>
              <p className={styles["p-under-h1"]}>
                {productData.acf.product_description}
              </p>
              <ProductDescription data={productData} />
            </div>
          </div>
        )}
        <h2 className={styles["h2"]}>Отзывы клиентов</h2>
        <CommentBlock />
      </div>
    </div>
  );
}
