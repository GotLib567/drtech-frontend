"use client";

import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

export function YandexMap() {
  return (
    <div id="map" style={{paddingBottom: "100px"}}>
      <YMaps>
        {" "}
        <Map
          width="100%"
          height="500px"
          defaultState={{ center: [56.830778, 60.556017], zoom: 15 }}
        >
          <Placemark geometry={[56.830778, 60.556017]} />
        </Map>{" "}
      </YMaps>
    </div>
  );
}
