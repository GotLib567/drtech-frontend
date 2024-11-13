"use client";
import utf8 from "utf8";
import { useParams } from "next/navigation";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import ProductBox from "@/app/Manufacturer/[id]/components/Products/components/ProductBox";
import { Checkbox } from "./components/Checkbox/Checkbox";
import { Navigation } from "@/app/components/Navigation/Navigation";

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
        `https://nozhtopor.na4u.ru/wp-json/wp/v2/products?acf_format=standard&_fields=id,title,acf&per_page=${per_page}&page=${page}
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

  // useEffect(() => {
  //   fetch(
  //     `https://nozhtopor.na4u.ru/wp-json/wp/v2/products?acf_format=standard&_fields=id,title,acf&per_page=${13}&page=${page}&search=${
  //       params?.text
  //     }${
  //       checkboxesList.metals.join(",").length
  //         ? `&product_steel=${checkboxesList.metals.join(",")}`
  //         : ""
  //     }${
  //       checkboxesList.manufacturers.join(",").length
  //         ? `&manufacturer_id=${checkboxesList.manufacturers.join(",")}`
  //         : ""
  //     }`
  //   )
  //     .then((response) => {
  //       setTotalCount(Math.ceil(Number(response.headers.get("X-Wp-total")) / 13));
  //       return response.json();
  //     })
  //     .then((data) => setProductsData(data));
  // }, [checkboxesList, page]);

  async function getMetalsData() {
    try {
      const response = await fetch(
        `https://nozhtopor.na4u.ru/wp-json/wp/v2/steels?acf_format=standard&_fields=id,name`
      );
      const data = await response.json();
      setMetals(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   fetch(
  //     `https://nozhtopor.na4u.ru/wp-json/wp/v2/steels?acf_format=standard&_fields=id,name`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setMetals(data));
  // }, []);

  async function getManufacturersData() {
    try {
      const response = await fetch(
        `https://nozhtopor.na4u.ru/wp-json/wp/v2/manufacturers?acf_format=standard&_fields=id,name,acf`
      );
      const data = await response.json();
      setManufacturers(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   fetch(
  //     `https://nozhtopor.na4u.ru/wp-json/wp/v2/manufacturers?acf_format=standard&_fields=id,name,acf`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setManufacturers(data));
  // }, []);

  useEffect(() => {
    getProductsData();
  }, [checkboxesList, page]);

  useEffect(() => {
    getProductsData();
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
                </div>
              </div>

              {productsData?.map((product, index) => {
                return <ProductBox product={product} key={index} />;
              })}
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
