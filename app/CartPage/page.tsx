"use client";

import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { CartElement } from "./components/CartElement/CartElement";
import { IFavouriteProduct } from "../Manufacturer/[id]/components/Products/components/ProductBox";
import axios from "axios";
import { Navigation } from "../components/Navigation/Navigation";

export default function Page() {
  const cartData =
    typeof window !== "undefined"
      ? JSON.parse(String(localStorage.getItem("cart")) || "")
      : [];
  const [productsToBuy, setProductsToBuy] = useState<
    { id: number; quantity: number }[]
  >(getDefaultValueForProductsToBuyArray());
  const [formData, setFormData] = useState({
    fio: "",
    phone: "",
    address: "",
    email: "",
    comment: "",
    products: productsToBuy,
  });
  function getDefaultValueForProductsToBuyArray() {
    if (cartData) {
      return cartData.map((elem: any) => {
        return { id: elem.id, quantity: 1 };
      });
    } else return [];
  }

  const handleUpdateQuantity = (id: number, count: number) => {
    setProductsToBuy((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: count } : item
      )
    );
  };
  useEffect(() => {
    setFormData((prev: any) => {
      return { ...prev, products: productsToBuy };
    });
  }, [productsToBuy]);
  const getTotalPrice = () => {
    let totalPrice = 0;

    productsToBuy.forEach((product) => {
      const cartItem = cartData.find((item: any) => item.id === product.id);

      if (cartItem) {
        const price = parseInt(cartItem.acf.product_price);
        const quantity = product.quantity;
        totalPrice += price * quantity;
      }
    });

    return totalPrice;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://nozhtopor.na4u.ru/wp-json/custom/v2/order/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      return response.json();
      // const result = await response.json();
    } catch (error) {
      console.error("Ошибка при отправке заказа: ", error);
    }
  };

  return (
    <div className={styles["container"]}>
     <div className={styles['wrapper']}>
        <Navigation />
        <h1 className={styles["h1"]}>Оформление заказа</h1>
        <div className={styles["th-cart"]}>
          <p>Изображение</p>
          <p>Наименование </p>
          <p>Кол-во</p>
          <p>Всего</p>
        </div>
        <div className={styles["cart-element-container"]}>
          {cartData &&
            cartData.map((elem: IFavouriteProduct) => {
              return (
                <CartElement
                  data={elem}
                  key={elem.id}
                  productsToBuy={productsToBuy}
                  handleUpdateQuantity={handleUpdateQuantity}
                />
              );
            })}
        </div>
        <div className={styles["hz-line"]} />
        <h2 className={styles["final-price"]}>Итого: {getTotalPrice()} руб.</h2>
  
        <h3 className={styles["h1"]}>Оформление заказа</h3>
        <form
          className={styles["form"]}
          onSubmit={(e: any) => {
            e.preventDefault();
            if (formData.fio && formData.phone && formData.address) {
              handleSubmit(e);
              return;
            }
  
            return;
          }}
        >
          <input
            type="text"
            placeholder="ФИО *"
            className={styles["form-input"]}
            onChange={(event: any) => {
              setFormData((prev: any) => {
                return { ...prev, fio: event.target.value };
              });
            }}
          />
          <input
            type="text"
            placeholder="Номер телефона *"
            className={styles["form-input"]}
            onChange={(event: any) => {
              setFormData((prev: any) => {
                return { ...prev, phone: event.target.value };
              });
            }}
          />
          <input
            type="text"
            placeholder="Адрес доставки *"
            className={styles["form-input"]}
            onChange={(event: any) => {
              setFormData((prev: any) => {
                return { ...prev, address: event.target.value };
              });
            }}
          />
          <input
            type="text"
            placeholder="E-mail"
            className={styles["form-input"]}
            onChange={(event: any) => {
              setFormData((prev: any) => {
                return { ...prev, email: event.target.value };
              });
            }}
          />
          <input
            type="text"
            placeholder="Комментарий к заказу"
            className={styles["form-input"]}
            onChange={(event: any) => {
              setFormData((prev: any) => {
                return { ...prev, comment: event.target.value };
              });
            }}
          />
          <button type="submit" className={styles["form-button"]}>
            оформить заказ
          </button>
        </form>
     </div>
    </div>
  );
}
