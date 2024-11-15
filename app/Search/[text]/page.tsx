"use client";
import utf8 from "utf8";
import { useParams } from "next/navigation";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import ProductBox from "@/app/Manufacturer/[id]/components/Products/components/ProductBox";
import { Checkbox } from "./components/Checkbox/Checkbox";
import { Navigation } from "@/app/components/Navigation/Navigation";
import { consumer_key, consumer_secret } from "@/app/assets/data/wooCommerce";

function createArraybyLength(length: number) {
  let arr = [];
  for (let i = 1; i <= length; i++) {
    arr.push(i);
  }
  if (arr.length === 1) {
    return null;
  }
  return arr;
}

export default function Page() {
  const params: { text: string } = useParams();
  const [productsData, setProductsData] = useState([]);
  const [metals, setMetals] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [checkboxesList, setCheckboxesList] = useState({
    metals: [],
    manufacturers: [],
  });

  async function getProductsData() {
    const per_page = 22;
    try {
      const response = await fetch(
        `https://nozhtoporshop.na4u.ru/wp-json/wc/v3/products?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}&per_page=${per_page}&page=${page}`
      );

      setTotalCount(
        Math.ceil(Number(response.headers.get("X-Wp-total")) / per_page)
      );
      const data = await response.json();
      setProductsData(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getFilteredProductsData() {
    const per_page = 22;
    try {
      const response = await fetch(
        `https://nozhtoporshop.na4u.ru/wp-json/custom/v1/products?per_page=${per_page}&page=${page}
        ${
          params?.text.length && params?.text !== "allProducts"
            ? `&search=${params?.text}`
            : ""
        }${
          checkboxesList.metals.join(",").length
            ? `&product_steel=${checkboxesList.metals.join(",")}`
            : ""
        }${
          checkboxesList.manufacturers.join(",").length
            ? `&manufacturer_id=${checkboxesList.manufacturers.join(",")}`
            : ""
        }`
      );
      const data = await response.json();
      setTotalCount(data.total / per_page);

      setProductsData(data.products);
    } catch (error) {
      console.log(error);
    }
  }
  async function getMetalsData() {
    try {
      const response = await fetch(
        `https://nozhtoporshop.na4u.ru/wp-json/wp/v2/steels?acf_format=standard&_fields=id,name`
      );
      const data = await response.json();
      setMetals(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getManufacturersData() {
    try {
      const response = await fetch(
        `https://nozhtoporshop.na4u.ru/wp-json/wp/v2/manufacturers?acf_format=standard&_fields=id,name,acf`
      );
      const data = await response.json();
      setManufacturers(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (params?.text.length && params?.text !== "allProducts") {
      getFilteredProductsData();
    } else {
      getProductsData();
    }
    getMetalsData();
    getManufacturersData();
  }, []);

  return (
    <main className={styles["main"]}>
      <Navigation />
      <div className={styles["wrapper"]}>
        {metals.length && manufacturers.length ? (
          <>
            <div className={styles["content-container"]}>
              <div className={styles["filters-container"]}>
                <p className={styles["search-title"]}>
                  Поиск{" "}
                  {`- ${
                    params?.text === "allProducts"
                      ? "все товары"
                      : decodeURIComponent(params?.text)
                  }`}
                </p>
                <p className={styles["filters-container-title"]}>
                  Для удобства предлагаем воспользоваться фильтром{" "}
                </p>
                <div className={styles["filters"]}>
                  <div className={styles["filter-block"]}>
                    <div className={styles["filters-title-container"]}>
                      <p className={styles["filters-title"]}>Производители</p>
                    </div>
                    <div className={styles["filters-options"]}>
                      {manufacturers.map((manufacturer, index) => {
                        return (
                          <Checkbox
                            setCheckboxesList={setCheckboxesList}
                            key={index}
                            data={manufacturer}
                            checkboxesList={checkboxesList}
                            checkboxType="manufacturer"
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className={styles["filter-block"]}>
                    <div className={styles["filters-title-container"]}>
                      <p className={styles["filters-title"]}>Стали</p>
                    </div>

                    <div className={styles["filters-options"]}>
                      {metals.map((metal, index) => {
                        return (
                          <Checkbox
                            checkboxesList={checkboxesList}
                            setCheckboxesList={setCheckboxesList}
                            key={index}
                            data={metal}
                            checkboxType="metal"
                          />
                        );
                      })}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (
                        !checkboxesList.metals.length &&
                        !checkboxesList.manufacturers.length
                      ) {
                        getProductsData();
                      } else {
                        getFilteredProductsData();
                      }
                    }}
                    className={styles["filter-button"]}
                  >
                    <p className={styles["button-text"]}>Найти</p>
                  </button>
                </div>
              </div>

              {productsData.length ? (
                productsData?.map((product, index) => {
                  return <ProductBox product={product} key={index} />;
                })
              ) : (
                <p style={{ color: "#fff" }}>Ничего не нашлось...</p>
              )}
            </div>
            <div
              style={{
                display: createArraybyLength(totalCount) ? "flex" : "none",
              }}
              className={styles["pagination"]}
            >
              {createArraybyLength(totalCount)?.map((number, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setPage(number);
                    getFilteredProductsData();
                  }}
                  className={styles["pagination-number"]}
                  style={{ opacity: number === page ? "0.5" : "1" }}
                >
                  {number}
                </button>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}
