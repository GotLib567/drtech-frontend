"use client";

import styles from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import vk from "../../assets/icons/vk.svg";
import youtube from "../../assets/icons/youtube.svg";
import phone from "../../assets/icons/phone.svg";
import letter from "../../assets/icons/letter.svg";
import { useEffect, useState } from "react";

export default function Footer() {
  const [footerData, setFooterData] = useState<any>([]);
  async function footerDataFetch() {
    try {
      const response = await fetch(
        `https://nozhtopor.na4u.ru/wp-json/wp/v2/site-options`
      );
      const data = await response.json();
      setFooterData(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    footerDataFetch();
  }, []);

  return (
    <footer className={styles["footer"]}>
      <div className={styles["wrapper"]}>
        <div className={styles["left-part"]}>
          <div className={styles["info"]}>
            <Image
              className={styles["logo"]}
              width={280} height={81}
              src={footerData.site_logo}
              alt="logo"
            />
            <div className={styles["description"]}>
              <p>Lorem, ipsum.</p>
              <p>Lorem, ipsum.</p>
            </div>
          </div>
          <div className={styles["nav"]}>
            <Link className="link" href="/">
              раздел
            </Link>
            <Link className="link" href="/">
              раздел
            </Link>
            <Link className="link" href="/">
              раздел
            </Link>
            <Link className="link" href="/">
              раздел
            </Link>
          </div>
          <div className={styles["contact-social-media-container"]}>
            <div className={styles["social-media-row"]}>
              <Link
                className={styles["social-media-row"]}
                href={footerData?.vk_url || "/"}
              >
                {" "}
                <Image className={styles["vk-img"]} src={vk} alt="vk" />{" "}
                <p>Мы в ВКонтакте</p>
              </Link>
            </div>
            <div className={styles["social-media-row"]}>
              <Link
                className={styles["social-media-row"]}
                href={footerData?.vk_url || "/"}
              >
                <Image
                  className={styles["youtube-img"]}
                  src={youtube}
                  alt="youtube"
                />
                <p>Мы в YouTube</p>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles["contact-info-conatiner"]}>
          <p>Бесплатно по всей России</p>
          <div className={styles["contact-info-row"]}>
            <Image className={styles["phone-img"]} src={phone} alt="phone" />
            <p>{footerData?.phone}</p>
          </div>
          <div className={styles["contact-info-row"]}>
            <Image className={styles["letter-img"]} src={letter} alt="letter" />
            <p>{footerData?.почта}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
