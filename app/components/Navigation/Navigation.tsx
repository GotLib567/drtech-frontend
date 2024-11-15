"use client";
import Link from "next/link";
import styles from "./Navigation.module.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export function Navigation() {
  const [activePage, setActivePage] = useState("");
  const params = useParams();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window?.location.href.includes("/News/141")
    ) {
      setActivePage("aboutUs");
    } else if (
      typeof window !== "undefined" &&
      window?.location.href.includes("/Search")
    ) {
      setActivePage("search");
    } else if (Object.entries(params).length === 0) {
      setActivePage("main");
    }
  }, [params]);
  return (
    <>
    <nav className={styles["navigation"]}>
      <ul className={styles["ul"]}>
        <li className={styles["li"]}>
          <Link
            style={{ opacity: activePage === "main" ? "0.5" : "1" }}
            href="/"
          >
            Главная
          </Link>
        </li>
        <li className={styles["li"]}>
          <Link
            style={{ opacity: activePage === "search" ? "0.5" : "1" }}
            href="/Search/allProducts"
          >
            Товары
          </Link>
        </li>
        <li className={styles["li"]}>
          <Link
            style={{ opacity: activePage === "aboutUs" ? "0.5" : "1" }}
            href="/News/141"
          >
            О нас
          </Link>
        </li>
      </ul>
    </nav>
    <div className={styles['mobile-space']}></div>
    </>
  );
}
