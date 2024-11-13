"use client";

import Image from "next/image";
import styles from "./Header.module.css";
import location from "../../assets/icons/location.svg";
import search from "../../assets/icons/search.svg";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const [headerData, setHeaderData] = useState<any>({});
  const [input, setInput] = useState("");
  async function getheaderData() {
    try {
      const response = await fetch(
        `https://nozhtopor.na4u.ru/wp-json/wp/v2/site-options`
      );
      const data = await response.json();
      setHeaderData(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getheaderData();
  }, []);
  const onChange = (e: any) => {
    setInput(e.target.value);
  };

  return (
    <header className={styles["header"]}>
      <Link className={styles["logo"]} href="/">
        <Image
          className={styles["site-logo"]}
          width={280}
          height={81}
          src={headerData.site_logo}
          alt="logo"
        />
      </Link>
      <div className={styles["location-container"]}>
        <Image
          className={styles["location-img"]}
          src={location}
          alt="location"
        />
        <div className={styles["location-text-conatiner"]}>
          <p className={styles["location-text"]}>{headerData.adress_1}</p>
        </div>
      </div>
      <div className={styles["phone-container"]}>
        <p>{headerData.phone}</p>
      </div>
      <form className={styles["input-container"]}>
        <input
          id="text"
          onChange={onChange}
          className={styles["input"]}
          type="text"
          placeholder="поиск"
        />
        <Link href={input.length ? `/Search/${input}` : `/Search/allProducts`}>
          <Image
            className={styles["search-img"]}
            width={22}
            height={22}
            src={search}
            alt="search"
          />
        </Link>
      </form>
      <div className={styles["panel-container"]}>
        <Link href="/Favourite">
          <svg
            className={styles["favourite-img"]}
            width="35"
            height="35"
            viewBox="0 0 42 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 5.36167C13.0016 -3.19139 1.25397 4.32493 1.50392 15.4698C1.65264 22.1009 6.84504 28.4568 17.0811 34.5374C17.7075 34.9094 18.7086 35.4787 19.5422 35.9488C20.4475 36.4594 21.5525 36.4594 22.4578 35.9488C23.2914 35.4787 24.2925 34.9094 24.9189 34.5374C35.155 28.4568 40.3474 22.1009 40.4961 15.4698C40.746 4.32493 28.9984 -3.19139 21 5.36167Z"
              stroke="#F7F9FC"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <Link href="/CartPage">
          <svg
            className={styles["cart-img"]}
            width="35"
            height="35"
            viewBox="0 0 47 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M45.1583 31.7857H13.3183C11.8517 31.7857 10.6676 30.6016 10.6676 29.1351C10.6676 27.6685 11.8517 26.4844 13.3183 26.4844C13.3183 26.4844 13.3183 26.4844 13.3291 26.4844H42.0297C42.6814 26.4844 43.2246 26.0173 43.3332 25.3764L46.4618 6.83294C46.527 6.45273 46.4184 6.06166 46.1685 5.75749C45.9187 5.46418 45.5493 5.29037 45.1583 5.29037H11.754L11.1456 1.12977C11.0479 0.47798 10.4938 0 9.83118 0H1.32531C0.597475 0 0 0.597475 0 1.32531C0 2.05314 0.597475 2.65062 1.32531 2.65062H8.67968L11.83 24.0728C9.63564 24.7246 8.01703 26.7343 8.01703 29.1351C8.01703 32.0573 10.3961 34.4363 13.3183 34.4363H17.3702C15.8928 35.2293 14.8717 36.7827 14.8717 38.5752C14.8717 41.1715 16.99 43.2898 19.5863 43.2898C22.1935 43.2898 24.3009 41.1715 24.3009 38.5752C24.3009 36.7827 23.2798 35.2402 21.8024 34.4363H34.86C33.3826 35.2293 32.3614 36.7827 32.3614 38.5752C32.3614 41.1715 34.4797 43.2898 37.076 43.2898C39.6832 43.2898 41.7907 41.1715 41.7907 38.5752C41.7907 36.7827 40.7695 35.2402 39.2921 34.4363H45.1583C45.8861 34.4363 46.4836 33.8388 46.4836 33.111C46.4836 32.3831 45.8969 31.7857 45.1583 31.7857ZM43.5939 7.94082L40.9107 23.8337H14.4806L12.145 7.94082H43.5939ZM19.5865 40.6282C18.4459 40.6282 17.5225 39.7049 17.5225 38.5642C17.5225 37.4236 18.4459 36.5002 19.5865 36.5002C20.7272 36.5002 21.6506 37.4236 21.6506 38.5642C21.6506 39.7049 20.7272 40.6282 19.5865 40.6282ZM37.0759 40.6282C35.9353 40.6282 35.0119 39.7049 35.0119 38.5642C35.0119 37.4236 35.9353 36.5002 37.0759 36.5002C38.2165 36.5002 39.1399 37.4236 39.1399 38.5642C39.1399 39.7049 38.2165 40.6282 37.0759 40.6282Z"
              fill="white"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
}
