"use client";

import styles from "./styles.module.css";

interface IProps {
  title: string;
  postTitle: string;
}

export function TitleSection({ title, postTitle }: IProps) {
  return (
    <>
      {title && (
        <h1
          dangerouslySetInnerHTML={{ __html: title }}
          className={styles["title"]}
        />
      )}
      {postTitle && (
        <p
          dangerouslySetInnerHTML={{ __html: postTitle }}
          className={styles["under-title"]}
        />
      )}
    </>
  );
}
