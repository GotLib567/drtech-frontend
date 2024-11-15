"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import userIcon from "@/app/assets/icons/user-avatar.svg";
import Image from "next/image";
import sanitizeHtml from "sanitize-html";
import commentTail from "@/app/assets/icons/comment-tail.svg";
import commentTailSmall from "@/app/assets/icons/comment-tail-small.svg";
import { IProduct } from "../../page";
import { consumer_key, consumer_secret } from "@/app/assets/data/wooCommerce";
import cross from "@/app/assets/icons/cross.png";
import cx from "classnames";

interface IComment {
  id: number;
  post: number;
  parent: number;
  review: string;
  author: number;
  author_name: string;
  author_url: string;
  date: string;
  date_gmt: string;
  reviewer: string;
  date_created_gmt: string;
  content: {
    rendered: string;
  };
  link: string;
  status: string;
  type: string;
  author_avatar_urls: {
    [key: string]: string;
  };

  _links: {
    self: [
      {
        [key: string]: string;
      }
    ];
    collection: [
      {
        [key: string]: string;
      }
    ];
    up: [
      {
        embeddable: boolean;
        post_typ: string;
        href: string;
      }
    ];
  };
}

export function CommentBlock({ setShowModalWindow }: any) {
  const { id } = useParams();
  const [commentData, setCommentData] = useState<IComment[]>([]);

  const [formData, setFormData] = useState({
    product_id: id,
    reviewer_email: "",
    reviewer: "",
    review: "",
  });
  const [errorState, setErrorState] = useState(false);

  async function getCommentData() {
    try {
      const response = await fetch(
        `https://nozhtoporshop.na4u.ru/wp-json/wc/v3/products/reviews?product_id=${id}&consumer_key=ck_13009f71f161c12f3757c121fe49020ce886db4e&consumer_secret=cs_e44d7f210c62424bd7989b6efda5b65bb4ce9f27`
      );
      const data = await response.json();
      setCommentData(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCommentData();
  }, []);

  const handleSubmit = async (event: any) => {
    setErrorState(false);
    event.preventDefault();
    if (!formData.reviewer_email && !formData.reviewer && !formData.review) {
      setErrorState(true);
      return;
    }
    try {
      const response = await fetch(
        `https://nozhtoporshop.na4u.ru/wp-json/wc/v3/products/reviews?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = response.json();
      setShowModalWindow(true);

      return data;
      // const result = await response.json();
    } catch (error) {
      setShowModalWindow(false);

      console.error("Ошибка при отправке комментария: ", error);
    }
  };
  function formatData(rawData: string) {
    const inputDateString = rawData;
    const date = new Date(inputDateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    const outputDateString = `${day}/${month}/${year}`;

    return outputDateString;
  }
  return (
    <div className={styles["comment-container"]}>
      {commentData &&
        commentData.map((comment, index) => {
          return (
            <div
              key={index}
              className={styles["comment-container-box"]}
              style={{
                flexDirection: index % 2 === 0 ? "row" : "row-reverse",
              }}
            >
              <div className={styles["user-icon-container"]}>
                <Image
                  src={userIcon}
                  width={126}
                  height={126}
                  alt="user icon"
                  className={styles["user-icon"]}
                />
                <p>{comment.reviewer}</p>
              </div>
              <div className={styles["comment-block"]}>
                <Image
                  src={commentTail}
                  height={59}
                  width={116}
                  alt="comment-tail"
                  className={cx(
                    styles["comment-tail"],
                    index % 2 === 0
                      ? styles["comment-tail-left"]
                      : styles["comment-tail-right"]
                  )}
                />

                <h3 style={{ textAlign: "center" }}>
                  {formatData(comment.date_created_gmt)}
                </h3>

                <p
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(comment.review),
                  }}
                />
              </div>
            </div>
          );
        })}

      <form className={styles["subscribe-container"]} onSubmit={handleSubmit}>
        <input
          id="text"
          placeholder="Email"
          className={styles["input"]}
          type="text"
          onChange={(event: any) => {
            setFormData((prev: any) => {
              return { ...prev, reviewer_email: event.target.value };
            });
          }}
        />
        <input
          id="text"
          placeholder="Имя"
          className={styles["input"]}
          type="text"
          onChange={(event: any) => {
            setFormData((prev: any) => {
              return { ...prev, reviewer: event.target.value };
            });
          }}
        />
        <input
          id="text"
          placeholder="Текст отзыва"
          className={styles["input"]}
          type="text"
          onChange={(event: any) => {
            setFormData((prev: any) => {
              return { ...prev, review: event.target.value };
            });
          }}
        />
        {errorState && (
          <>
            {!formData.reviewer_email && (
              <p className={styles["error-message"]}>
                Поле email не должно быть пустым
              </p>
            )}
            {!formData.reviewer && (
              <p className={styles["error-message"]}>
                Поле имя не должно быть пустым"
              </p>
            )}
            {!formData.review && (
              <p className={styles["error-message"]}>
                Поле текст отзыва не должно быть пустым
              </p>
            )}
          </>
        )}
        <button className={styles["button"]}>Оставить отзыв</button>
      </form>
    </div>
  );
}
