"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { ImageSection } from "./components/ImageSection/ImageSection";
import { DescriptionSection } from "./components/DescriptionSection/DescriptionSection";
import { TitleSection } from "./components/TitleSection/TitleSection";
import { useParams } from "next/navigation";
import { News } from "@/app/components/News/News";
import { Navigation } from "@/app/components/Navigation/Navigation";
import { YandexMap } from "./components/YandexMap/YandexMap";

interface ITitle {
  rendered: string;
}

export interface IPostData {
  id: number;
  title: ITitle;
  acf: {
    show_on_main_page: string;
    post_location: string;
    post_subtitle: string;
    post_img: string;
    post_text: string;
  };
}

export interface Error {
  code: string;
  message: string;
  data: {
    status: number;
    params: { include: string };
    details: { include: [Object] };
  };
}

export default function Page() {
  const [postData, setPostData] = useState<IPostData[] | null | any>(null);
  const params = useParams();

  async function getPostData() {
    try {
      const response = await fetch(
        `https://nozhtoporshop.na4u.ru/wp-json/wp/v2/posts?acf_format=standard&_fields=id,title,acf&include=${params.id}`
      );
      const data = await response.json();
      setPostData(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(fullUrl.split("/")[4], "fullUrlfullUrlfullUrl");

  useEffect(() => {
    getPostData();
    // setPostData(data);
  }, []);

  return (
    <div className={styles["page-body"]}>
      <div className={styles["wrapper"]}>
        <Navigation />
        <div className={styles["status-section"]}>
          {!postData && postData?.length !== 0 && (
            <p style={{ fontSize: "30px", color: "white" }}>Загрузка...</p>
          )}
          {!postData && postData?.length == 0 && (
            <p style={{ fontSize: "30px", color: "white" }}>
              Такого поста не существует
            </p>
          )}
          {postData !== null && postData[0] && (
            <>
              <TitleSection
                title={postData[0]?.title.rendered}
                postTitle={postData[0]?.acf.post_subtitle}
              />

              <ImageSection image={postData[0]?.acf.post_img} />
              <DescriptionSection description={postData[0]?.acf.post_text} />
              {params.id !== "141" && <News />}
            </>
          )}
        </div>
        {params.id === "141" && <YandexMap />}
      </div>
    </div>
  );
}
