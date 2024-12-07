import mapboxgl from 'mapbox-gl'
import * as MapboxClient from "mapbox";

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
const mapboxClient = new MapboxClient(MAPBOX_TOKEN);

export async function initMap() {
  mapboxgl.accessToken = MAPBOX_TOKEN;
  return await new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [-63.6167, -38.4161],
    zoom: 3
  });
}

export async function initSearchForm(mapInput, callback) {
  await mapboxClient.geocodeForward(
    mapInput,
    {
      country: "ar",
      autocomplete: true,
      language: "es",
    },
    function (err, data, res) {
      console.log(data);
      if (!err) callback(data.features);
    }
  );
}

/*(function () {
  window.map = initMap();
  initSearchForm(function (results) {
    const firstResult = results[0];
    const marker = new mapboxgl.Marker()
      .setLngLat(firstResult.geometry.coordinates)
      .addTo(map);
      const [lng, lat] = firstResult.geometry.coordinates

      fetch("/comercios-cerca-de?lat=" + lat + "&lng=" + lng).then((res) =>res.json()).then((results) => {
        console.log(results)
        for (const comercio of results) {
            const {lat, lng} = comercio._geoloc

            new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
        } 
      })

    map.setCenter(firstResult.geometry.coordinates);
    map.setZoom(14);
  });
})();*/