import styles from "./Subscribe.module.css";

export function Subscribe() {
  return (
    <section className={styles["subscribe"]}>
      <div className={styles["subscribe-container"]}>
       <div className={styles["text-container"]}>
            <p className={styles["title"]}>Подписаться</p>{" "}
            <p className={styles["description"]}>Оставьте свой email, и мы будем <br /> сообщать вам об акциях и новинках</p>
       </div>
       <input id="text" placeholder="Email" className={styles["input"]} type="text" />
       <button className={styles["button"]}>Подписаться</button>
      </div>

    </section>
  );
}
