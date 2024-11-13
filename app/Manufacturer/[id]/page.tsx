import React from "react";
import { Hero } from "./components/Hero/Hero";
import { Products } from "./components/Products/Products";
import styles from "./styles.module.css";
import { Navigation } from "@/app/components/Navigation/Navigation";

export default function Page() {
  return (
    <main className={styles["main"]}>
      <div className={styles['wrapper']}>
        <Navigation />
        <Hero />
        <Products />
      </div>
    </main>
  );
}
