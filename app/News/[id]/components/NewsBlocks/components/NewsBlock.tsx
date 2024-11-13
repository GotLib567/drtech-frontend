"use client";

import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import arrowRight from "@/app/assets/icons/arrow_right.svg";
// import { INewsBlock } from "../NewsBlocks";

// export function NewsBlock({ data }: { data: INewsBlock }) {
export function NewsBlock({ data }: any) {
  return (
    <div className={styles["NewsBlock-container"]}>
      <Image
        className={styles["image"]}
        src={data.acf.post_img}
        alt="News Block Image"
        width={0}
        height={0}
      />

      <div className={styles["description-container"]}>
        <div className={styles["description"]}>
          <h3 dangerouslySetInnerHTML={{ __html: data.title.rendered }} />
          <p dangerouslySetInnerHTML={{ __html: data.acf.post_text }} />
        </div>
        <Image
          className={styles["image-arrow-right"]}
          src={arrowRight}
          alt="News Block Image"
          width={0}
          height={0}
        />
      </div>
    </div>
  );
}
