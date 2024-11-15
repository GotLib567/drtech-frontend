import { Hero } from "./components/Hero/Hero";
import { Manufacturers } from "./components/Manufacturers/Manufacturers";
import { Navigation } from "./components/Navigation/Navigation";
import { News } from "./components/News/News";
import { NewsSlider } from "./components/NewsSlider/NewsSlider";
import { Subscribe } from "./components/Subscribe/Subscribe";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles["main"]}>
      <Navigation />
      <Hero />
      <NewsSlider />
      <Manufacturers />
      <News />
      {/* <Subscribe /> */}
    </main>
  );
}
