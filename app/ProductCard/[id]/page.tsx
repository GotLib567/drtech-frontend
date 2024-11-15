"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ImageGalleryComponent } from "./components/ImageGalleryComponent/ImageGalleryComponent";
import { ProductDescription } from "./components/ProductDescription/ProductDescription";
import styles from "./style.module.css";
import { CommentBlock } from "./components/CommentBlock/CommentBlock";
import { Navigation } from "@/app/components/Navigation/Navigation";
import { consumer_key, consumer_secret } from "@/app/assets/data/wooCommerce";
import Image from "next/image";
import cross from "@/app/assets/icons/cross.png";

export interface IProduct {
  id: number;
  name: string;
  description: string;
  images: [];
  price: string;
  acf: {
    short_description: string;
    product_price: string;
    description: string;
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
    manufacturer_name?: string;
  };
}

export default function Page() {
  const { id } = useParams();
  const [showModalWindow, setShowModalWindow] = useState(false);
  const [productData, setProductData] = useState<IProduct>({
    id: 0,
    name: "",
    description: "",
    images: [],
    price: "",
    acf: {
      short_description: "",
      product_price: "",
      description: "",
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
  const [manufacturerName, setManufacturerName] = useState<any>("");
  const [decodedName, setDecodedName] = useState<any>(<span></span>);
  const [decodedDesc, setDecodedDesc] = useState<any>(<span></span>);
  async function getPostData() {
    try {
      const response = await fetch(
        `https://nozhtoporshop.na4u.ru/wp-json/wc/v3/products/${id}?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}`
      );
      const data = await response.json();
      setProductData(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  console.log(manufacturerName);
  async function getManfacturerData(manufacturerId: number) {
    try {
      const response = await fetch(
        `https://nozhtoporshop.na4u.ru/wp-json/wp/v2/manufacturers?acf_format=standard&_fields=id,name,acf&include=${manufacturerId}`
      );
      const data = await response.json();
      console.log(data);
      setManufacturerName(data[0].name);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!productData.acf.manufacturer_id) return;
    getManfacturerData(productData.acf.manufacturer_id);
  }, [productData]);

  useEffect(() => {
    getPostData();
  }, []);

  useEffect(() => {
    if (!productData.name) return;
    let element = document.createElement("span");
    element.innerHTML = productData.name;
    let decodedText = element.textContent;
    setDecodedName(decodedText);
    element.innerHTML = productData.description;
    let decodedDesc = element.textContent;
    setDecodedDesc(decodedDesc);
  }, [productData]);

  return (
    <>
      {showModalWindow && (
        <div className={styles["modal-window"]}>
          <button onClick={() => setShowModalWindow(false)}>
            <Image src={cross} width={21} height={21} alt="cross" />
          </button>
          <p>
            Большое спасибо за оставленный отзыв!
            <br /> На данный момент он находится на рассмотрении, после
            обработки мы обязательно его опубликуем!
          </p>
        </div>
      )}
      <div className={styles["body"]}>
        <Navigation />
        <div className={styles["wrapper"]}>
          {productData && manufacturerName && (
            <div className={styles["hero-container"]}>
              <ImageGalleryComponent data={productData} />
              <div className={styles["description-block"]}>
                <h1 className={styles["h1"]}>{decodedName}</h1>
                <p className={styles["p-under-h1"]}>
                  {productData?.acf?.short_description}
                </p>
                <ProductDescription
                  data={productData}
                  manufacturerName={manufacturerName}
                />
              </div>
            </div>
          )}
          <p className={styles["description"]}>{decodedDesc}</p>
          <h2 className={styles["h2"]}>Отзывы клиентов</h2>
          <CommentBlock setShowModalWindow={setShowModalWindow} />
        </div>
      </div>
    </>
  );
}
