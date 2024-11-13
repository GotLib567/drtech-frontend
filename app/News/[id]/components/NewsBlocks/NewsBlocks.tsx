"use client";

import React from "react";
import styles from "./styles.module.css";
import { NewsBlock } from "./components/NewsBlock";

// interface IProps {
//   data: INewsBlock[];
// }

export function NewsBlocks({ data }: any) {
  return (
    <div>
      <h2 className={styles["h2"]}>Новости</h2>
      <div className={styles["NewsBlock-container"]}>
        {/* {data?.map((elem: INewsBlock) => {
          return <NewsBlock data={elem} key={elem.id} />;
        })} */}
      </div>
    </div>
  );
}
