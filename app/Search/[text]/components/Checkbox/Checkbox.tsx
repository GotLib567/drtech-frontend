import { useEffect, useState } from "react";
import styles from "../../styles.module.css";

export function Checkbox({
  data,
  setCheckboxesList,
  checkboxesList,
  checkboxType,
}:any) {
  const [checked, setChecked] = useState(false);
  const handleCkeckboxClick = () => {
    if (checked) {
      if (checkboxType === "metal") {
        setCheckboxesList({
          metals: checkboxesList.metals.filter((metal:any) => metal !== data.id),
          manufacturers: [...checkboxesList.manufacturers],
        });
      } else if (checkboxType === "manufacturer") {
        setCheckboxesList({
          metals: [...checkboxesList.metals],
          manufacturers: checkboxesList.manufacturers.filter(
            (manufacturer:any) => manufacturer !== data.id
          ),
        });
      }
    } else {
      if (checkboxType === "metal") {
        setCheckboxesList({
          metals: [...checkboxesList.metals, data.id],
          manufacturers: [...checkboxesList.manufacturers],
        });
      } else if (checkboxType === "manufacturer") {
        setCheckboxesList({
          metals: [...checkboxesList.metals],
          manufacturers: [...checkboxesList.manufacturers, data.id],
        });
      }
    }
    setChecked((prev) => !prev);
  };

  return (
    <div >
      <label className={styles["cr-wrapper"]}>
        <input
        onClick={()=>{handleCkeckboxClick()}}
          className={styles["checkbox"]}
          type="checkbox"
          id="checkbox"
          name="checkbox"
        />
        <div className={styles["cr-input"]}></div>
        <span> {data.name}</span>
      </label>
    </div>
  );
}
