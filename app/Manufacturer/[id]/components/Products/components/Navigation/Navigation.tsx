"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import navArrow from "@/app/assets/icons/nav-arrow.svg";

export function Navigation() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 100;
  const itemsPerPage = 4;

  return (
    <div className={styles["nav-container"]}>
      <Image
        src={navArrow}
        width={0}
        height={0}
        alt="navArrow"
        // onClick={handlePrev}
      />
      <div className={styles["numbers-container"]}>
        {/* {renderPageNumbers()} */}
      </div>
      <Image
        src={navArrow}
        width={0}
        height={0}
        alt="navArrow"
        className={styles["navArrow-right"]}
        // onClick={handleNext}
      />
    </div>
  );
}
