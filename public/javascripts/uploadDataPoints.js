/**
 * This code is used to generate random sample points
 * It uses initial lat long values and then generates 40 points
 * with simple addition of 0.003 to values to generate 4 rows
 * Each point is then sent to server to be stored in DB
 */

/**
 * lat: 51.432167, lng: -0.0827484 - start 1
 * lat: 51.429167, lng: -0.0937484 - start 2
 */

let initLatMain = 51.432167;
let initLongMain = -0.0827484;
let initLat = 51.432167;
let initLong = -0.0827484;
count = 0;

for (let i = 0; i < 40; i++) {
  console.log(`new google.maps.LatLng(${initLat}, ${initLong}),`);
  const data = { lat: initLat, long: initLong, type: "purchase" };
  fetch("http://localhost:3000/datapoints", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  if (i == 29 || i == 19 || i == 9) {
    initLat += 0.003;
  }
  initLong += 0.003;
  count++;
  if (count == 10) {
    initLong = initLongMain;
    count = 0;
  }
}
