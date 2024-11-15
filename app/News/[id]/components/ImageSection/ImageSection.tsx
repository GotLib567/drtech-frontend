"use client";

import Image from "next/image";
import React from "react";
import styles from "./styles.module.css";

interface IProps {
  image: string;
}

export function ImageSection({ image = "" }: IProps) {
  return (
    <div className={styles["image"]} style={{height: "500px", width: "100%", backgroundImage: `url("${image}")`}}></div>
    // <Image
    //   src={image}
    //   alt="image"
    //   width={1169}
    //   height={457}
    //   className={styles["image"]}
    // />
  );
}
