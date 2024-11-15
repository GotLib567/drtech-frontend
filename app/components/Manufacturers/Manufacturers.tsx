"use client";

import { useEffect, useState } from "react";
import styles from "./Manufacturers.module.css";
import Image from "next/image";
import Link from "next/link";

export interface IManufacturers {
  id: number;
  name: string;
  acf: {
    manufacturer_description: string;
    manufacturer_img: string;
  };
}

export function Manufacturers() {
  const [manufacturers, setManufacturers] = useState<IManufacturers[]>([]);

  async function getManufacturersData() {
    try {
      const response = await fetch(
        "https://nozhtoporshop.na4u.ru/wp-json/wp/v2/manufacturers?acf_format=standard&_fields=id,name,acf",
        {}
      );
      const data = await response.json();
      setManufacturers(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getManufacturersData();
  }, []);

  return (
    <section className={styles["manufacturers"]}>
      <p className={styles["title"]}>Производители</p>
      <div className={styles["manufacturers-container"]}>
        {" "}
        {manufacturers?.map((manufacturerData, index) => {
          return (
            <div className={styles["manufacturer-containier"]} key={index}>
              <Link
                className={styles["button"]}
                href={`/Manufacturer/${manufacturerData.id}`}
              >
                <Image
                unoptimized
                  className={styles["img"]}
                  width={218}
                  height={216}
                  src={manufacturerData.acf.manufacturer_img}
                  alt="img"
                />
              </Link>

              <p className={styles["manufacturer-title"]}>
                {manufacturerData.name}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
