// init values for map object and heat data points layers of rent and prices hours
let map;
let heatmap_purchase;
let heatmap_rent;

function initMap() {
  // It initiates the map at certain location in london and zoom level set at 15. Make it higher to zoom in more.
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.432167, lng: -0.0827484 },
    zoom: 15,
  });
}

function setUpHeatmapPurchase() {
  /**
   * 1: Fetch the latest heatmap data points for "purchase" from database
   * 2: Send them to the processing function to display
   */
  fetch("/datapoints/purchase")
    .then((response) => response.json())
    .then((data) => showHeatMapOfPurchase(data));
}
function showHeatMapOfPurchase(data) {
  /**
   * 1: It received "data" which is array of datapoints received from database
   * 2: It builds google maps latLang objects with this data
   * 3: It builds up a heatmap visualization layer
   * 4: It installs the heatmap layer on main map object
   */
  const heatMapData = [];
  data.forEach(({ lat, long }) => {
    heatMapData.push(new google.maps.LatLng(lat, long));
  });

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatMapData,
  });
  heatmap.setMap(map);
}

function setUpHeatMapRent() {
  /**
   * 1: Fetch the latest heatmap data points for "rent" from database
   * 2: Send them to the processing function to display
   */
  fetch("/datapoints/rent")
    .then((response) => response.json())
    .then((data) => showHeatMapOfRent(data));
}
function showHeatMapOfRent(data) {
  /**
   * 1: It received "data" which is array of datapoints received from database
   * 2: It builds google maps latLang objects with this data
   * 3: It builds up a heatmap visualization layer
   * 4: It installs the heatmap layer on main map object
   */
  const heatMapData = [];
  data.forEach(({ lat, long }) => {
    heatMapData.push(new google.maps.LatLng(lat, long));
  });

  heatmap_rent = new google.maps.visualization.HeatmapLayer({
    data: heatMapData,
  });
  const gradient = [
    "rgba(0, 255, 255, 0)",
    "rgba(0, 255, 255, 1)",
    "rgba(0, 191, 255, 1)",
    "rgba(0, 127, 255, 1)",
    "rgba(0, 63, 255, 1)",
    "rgba(0, 0, 255, 1)",
    "rgba(0, 0, 223, 1)",
    "rgba(0, 0, 191, 1)",
    "rgba(0, 0, 159, 1)",
    "rgba(0, 0, 127, 1)",
    "rgba(63, 0, 91, 1)",
    "rgba(127, 0, 63, 1)",
    "rgba(191, 0, 31, 1)",
    "rgba(255, 0, 0, 1)",
  ];
  heatmap_rent.set("gradient", heatmap_rent.get("gradient") ? null : gradient);
  heatmap_rent.setMap(map);
}

/**
 * Remove functions are used to remove heatmap data points from map.
 * These are 2 separate functions for purchase (prices) and rent points
 */
function removeHeatmapPurchase() {
  heatmap.setMap(null);
}
function removeHeatmapRent() {
  heatmap_rent.setMap(null);
}

/**
 * Attaching "onchange" event listeners to checkboxes for Avg Price and Avg Rent checkboxes
 */
document.getElementById("avg_rent").addEventListener("change", function (e) {
  if (e.target.checked) {
    setUpHeatMapRent();
  } else {
    removeHeatmapRent();
  }
});
document
  .getElementById("avg_house_price")
  .addEventListener("change", function (e) {
    if (e.target.checked) {
      setUpHeatmapPurchase();
    } else {
      removeHeatmapPurchase();
    }
  });
