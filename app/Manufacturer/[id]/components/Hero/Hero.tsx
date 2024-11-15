"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export function Hero() {
  const [heroData, setHeroData] = useState<any>([]);
  const params = useParams<{ id: string }>();
  async function getHeroData() {
    try {
      const response = await fetch(
        `https://nozhtoporshop.na4u.ru/wp-json/wp/v2/manufacturers?acf_format=standard&_fields=id,name,acf&include=${params.id}`
      );
      const data = await response.json();
      setHeroData(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getHeroData();
  }, [params]);

  return (
    <div className={styles["hero"]}>
      <Image
      unoptimized
        src={heroData[0]?.acf?.manufacturer_img}
        width={540}
        height={517}
        alt="hero image"
        className={styles["hero-img"]}
      />
      <div className={styles["hero-description"]}>
        <h1 className={styles["title"]}>{heroData[0]?.name}</h1>
        <p className={styles["description"]}>
          {heroData[0]?.acf?.manufacturer_description}
        </p>
      </div>
    </div>
  );
}
