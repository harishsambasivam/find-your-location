const mymap = L.map("mapid");
//Mapbox api key
const api_key =
  "pk.eyJ1IjoiaGFyaXNoc2FtYmFzaXZhbSIsImEiOiJjanZkZTU5cnkxajZhNGRtbXdzOXlneG8zIn0.cYxPnbSBkb-GlLwCETmOvw";

//Marker icon
var myIcon = L.icon({
  iconUrl: "images/image.png",
  iconSize: [25, 25]
});

//Adding mapbox tiles

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl);
tiles.addTo(mymap);

//to avoid auto adjusting view of map
let firstTime = true;

//adding marker initially
const marker = L.marker([0, 0], {
  icon: myIcon
}).addTo(mymap);

//getting using Mozila geo location api
function getData() {
  let latitude;
  let longitude;

  navigator.geolocation.getCurrentPosition(position => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    if (firstTime) {
      mymap.setView([latitude, longitude], 10);
      firstTime = false;
    }

    marker
      .setLatLng([latitude, longitude], {
        icon: myIcon
      })
      .addTo(mymap);
  });
}

getData();

//to fetch data every second to update map
setInterval(getData, 1000);
