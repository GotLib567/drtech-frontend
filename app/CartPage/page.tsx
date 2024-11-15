"use client";

import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { CartElement } from "./components/CartElement/CartElement";
import { IFavouriteProduct } from "../Manufacturer/[id]/components/Products/components/ProductBox";
import { Navigation } from "../components/Navigation/Navigation";
import Image from "next/image";
import cross from "@/app/assets/icons/cross.png";
import { SimilarProducts } from "./components/similarProducts/SimilarProducts";

export default function Page() {
  const [cartData, setCartData] = useState(
    typeof window !== "undefined"
      ? JSON.parse(String(localStorage.getItem("cart")) || "")
      : []
  );

  const [productsToBuy, setProductsToBuy] = useState<
    { product_id: number; quantity: number }[]
  >(getDefaultValueForProductsToBuyArray());
  const [formData, setFormData] = useState({
    fio: "",
    phone: "",
    address: "",
    email: "",
    comment: "",
    products: productsToBuy,
  });
  const [formDataErrorState, setFormDataErrorState] = useState(false);
  const [showModalWindow, setShowModalWindow] = useState(false);
  function getDefaultValueForProductsToBuyArray() {
    if (cartData) {
      return cartData.map((elem: any) => {
        return { product_id: elem.id, quantity: 1 };
      });
    } else return [];
  }

  const handleUpdateQuantity = (id: number, count: number) => {
    setProductsToBuy((prevItems) =>
      prevItems.map((item) =>
        item.product_id === id ? { ...item, quantity: count } : item
      )
    );
  };
  useEffect(() => {
    setFormData((prev: any) => {
      return { ...prev, products: productsToBuy };
    });
  }, [productsToBuy]);
  const getTotalPrice = () => {
    const totalCost = productsToBuy.reduce((acc, product) => {
      const productData = cartData.find(
        (item: any) => item.id === product.product_id
      );

      if (productData) {
        const price = parseFloat(productData.price);
        return acc + price * product.quantity;
      }
      return acc;
    }, 0);
    return totalCost;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://nozhtoporshop.na4u.ru/wp-json/wc/v3/orders?consumer_key=ck_13009f71f161c12f3757c121fe49020ce886db4e&consumer_secret=cs_e44d7f210c62424bd7989b6efda5b65bb4ce9f27",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            set_paid: true,
            customer_note: formData.comment,
            billing: {
              first_name: formData.fio,
              email: formData.email,
              phone: formData.phone,
            },
            shipping: {
              address_1: formData.address,
            },
            line_items: [...productsToBuy],
          }),
        }
      );
      setShowModalWindow(true);

      return response.json();
      // const result = await response.json();
    } catch (error) {
      setShowModalWindow(false);
      console.error("Ошибка при отправке заказа: ", error);
    }
  };

  return (
    <>
      {showModalWindow && (
        <div className={styles["modal-window"]}>
          <button onClick={() => setShowModalWindow(false)}>
            <Image src={cross} width={21} height={21} alt="cross" />
          </button>
          <p>
            Ваш заказ успешно оформлен!
            <br /> В скором времени наш менеджер свяжется с Вами!
          </p>
        </div>
      )}
      <div className={styles["container"]}>
        <div className={styles["wrapper"]}>
          <Navigation />
          {cartData && cartData.length > 0 ? (
            <>
              <h3 className={styles["h1"]}>Оформление заказа</h3>
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
                        setCartData={setCartData}
                        cartData={cartData}
                        handleUpdateQuantity={handleUpdateQuantity}
                      />
                    );
                  })}
              </div>
              <div className={styles["hz-line"]} />
              <h2 className={styles["final-price"]}>
                Итого: {getTotalPrice()} руб.
              </h2>
              <SimilarProducts />
              <form
                className={styles["form"]}
                onSubmit={(e: any) => {
                  setFormDataErrorState(false);
                  e.preventDefault();
                  if (
                    formData.fio !== "" &&
                    formData.phone !== "" &&
                    formData.address !== ""
                  ) {
                    handleSubmit(e);
                    return;
                  } else {
                    setShowModalWindow(false);
                    setFormDataErrorState(true);
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
                <div>
                  {formDataErrorState && formData.fio === "" && (
                    <p style={{ color: "red" }}>Поле ФИО обязательное</p>
                  )}
                  {formDataErrorState && formData.phone === "" && (
                    <p style={{ color: "red" }}>
                      Поле с номером телефона обязательное
                    </p>
                  )}
                  {formDataErrorState && formData.address === "" && (
                    <p style={{ color: "red" }}>Поле с адресом обязательное</p>
                  )}
                </div>
                <button type="submit" className={styles["form-button"]}>
                  оформить заказ
                </button>
              </form>
            </>
          ) : (
            <h3 className={styles["h1"]}>Корзина пустая...</h3>
          )}
        </div>
      </div>
    </>
  );
}
