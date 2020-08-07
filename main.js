let myMap;
let lati = [];
let longi = [];
let canvas;
let i = 0;
const mappa = new Mappa('Leaflet');
const options = {
    lat: 9.1058489,
    lng: 76.5513027,
    zoom: 8,
    style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
}

function preload() {
    data = loadTable('data/kerala_com.csv', "header")
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    // background(100); let's uncomment this, we don't need it for now

    // Create a tile map with the options declared
    myMap = mappa.tileMap(options);
    myMap.overlay(canvas);
    for (let i = 0; i < data.getRowCount(); i++) {
        const lat = Number(data.getString(i, 'lat'));
        const lng = Number(data.getString(i, 'lng'));
        lati.push(lat);
        longi.push(lng);
    }
}

function draw() {
    clear();
    const kollam = myMap.latLngToPixel(9.1058489, 76.5513027);
    noStroke();
    fill(0, 255, 0, 70.255);
    ellipse(kollam.x, kollam.y, 30, 30);
    fill(255, 0, 0, 70.255);
    let x = myMap.latLngToPixel(10.9468, 76.0201);
    for (let i = 0; i < data.getRowCount(); i++) {
        const place = myMap.latLngToPixel(lati[i], longi[i]);
        ellipse(place.x, place.y, 10, 10);
    }
}

function calcCord(x, y) {
    let ycor = (y * innerWidth) / 360;
    let xcor = (x * innerHeight) / 180;
    console.log(xcor + "  " + ycor);
}
