import React from "react";
import { IProduct } from "../../page";
import styles from "./style.module.css";

export function ProductDescription({
  data,
  manufacturerName,
}: {
  data: IProduct;
  manufacturerName: string;
}) {
  return (
    <div className={styles["body"]}>
      {data.acf.product_steel && (
        <div className={styles["description-row"]}>
          <p>Марка стали </p>
          <p>{data.acf.product_steel}</p>
        </div>
      )}
      {data.acf.blade_length && (
        <div className={styles["description-row"]}>
          <p>Длина клинка</p> <p>{data.acf.blade_length}</p>
        </div>
      )}
      {data.acf.butt_thickness && (
        <div className={styles["description-row"]}>
          <p>Тощина обуха</p> <p>{data.acf.butt_thickness}</p>
        </div>
      )}
      {data.acf.blade_width && (
        <div className={styles["description-row"]}>
          <p>Ширина клинка</p> <p>{data.acf.blade_width}</p>
        </div>
      )}
      {data.acf.blade_hardness && (
        <div className={styles["description-row"]}>
          <p>Твёрдость клинка</p> <p>{data.acf.blade_hardness}</p>
        </div>
      )}
      {data.acf.handle_length && (
        <div className={styles["description-row"]}>
          <p>Длина рукояти</p> <p>{data.acf.handle_length}</p>
        </div>
      )}
      {data.acf.handle_material && (
        <div className={styles["description-row"]}>
          <p>Материал рукояти</p> <p>{data.acf.handle_material}</p>
        </div>
      )}
      {data.acf.cutting_edge && (
        <div className={styles["description-row"]}>
          <p>Режущая кромка</p> <p>{data.acf.cutting_edge}</p>
        </div>
      )}
      {data.acf.ax_height && (
        <div className={styles["description-row"]}>
          <p>Высота топора</p> <p>{data.acf.ax_height}</p>
        </div>
      )}
      {data.acf.steel_hardness && (
        <div className={styles["description-row"]}>
          <p>Твёрдость стали</p> <p>{data.acf.steel_hardness}</p>
        </div>
      )}
      {data.acf.ax_weight && (
        <div className={styles["description-row"]}>
          <p>Вес топора</p> <p>{data.acf.ax_weight}</p>
        </div>
      )}
      {manufacturerName && (
        <div className={styles["description-row"]}>
          <p>Производитель</p> <p>{manufacturerName}</p>
        </div>
      )}
    </div>
  );
}
