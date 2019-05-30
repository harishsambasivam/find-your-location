const mymap = L.map("mapid");
//Mapbox api key
const api_key =
    "pk.eyJ1IjoiaGFyaXNoc2FtYmFzaXZhbSIsImEiOiJjanZkZTU5cnkxajZhNGRtbXdzOXlneG8zIn0.cYxPnbSBkb-GlLwCETmOvw";
//Marker icon
var myIcon = L.icon({
    iconUrl: "images/image.png",
    iconSize: [60, 85]
});

//Adding mapbox tiles

const tiles = L.tileLayer(
    `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${api_key}`, {
        maxZoom: 15,

        id: "mapbox.streets"
    }
).addTo(mymap);
//to avoid auto adjusting view of map
let firstTime = true;
//adding marker initially
const marker = L.marker([0, 0], {
    icon: myIcon
}).addTo(mymap);
//getting API data from wheretheiss.at and mapping it using leaflet
async function getData() {
    const data = await fetch(
        "https://api.wheretheiss.at/v1/satellites/25544"
    );
    const JSONdata = await data.json();
    const {
        latitude,
        longitude
    } = JSONdata;
    if (firstTime) {
        mymap.setView([latitude, longitude], 3);
        firstTime = false;
    }

    marker.setLatLng([latitude, longitude], {
        icon: myIcon
    }).addTo(mymap);
}

getData();

//to fetch data every second to update map
setInterval(getData, 1000);