let myMap;
let lati = [];
let longi = [];
let ker = [];
let con = [];
let notthere = [];
let similar = [];
let canvas;
let i = 0;
const mappa = new Mappa('Leaflet');
const options = {
    lat: 9.1058489,
    lng: 76.5513027,
    zoom: 8,
   // style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
   style:"https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
   //style:"http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
}
function preload() {
    data = loadTable('data/kerala_com.csv', "header")
    conta = loadTable('data/yeh.csv',"header")
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    myMap = mappa.tileMap(options);
    myMap.overlay(canvas);
    for (let i = 0; i < data.getRowCount(); i++) {
            let state = data.getString(i,'place');
            ker.push(state);

    } 
        for(let i = 0;i < conta.getRowCount();i++){
            let containr = conta.getString(i,'containment');
            con.push(containr);
        }
        getCommon(ker,con);
        for(let i = 0; i < similar.length;i++){
            let a = data.getColumn("place");
            let index = a.indexOf(similar[i]);
            let row = data.getRow(index);
            let lat = row.getString(4);
            let lng = row.getString(5);
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
    for (let i = 0; i < similar.length; i++) {
        let place = myMap.latLngToPixel(lati[i], longi[i]);
       let size = 30 //+ myMap.zoom();
        ellipse(place.x, place.y, size, size);
    }
}
function getCommon(arr1,arr2){
            arr1.sort();
            arr2.sort();
            let i=0;
            let j=0;
            while(i < arr1.length && j < arr2.length){
                if(arr1[i] == arr2[j]){
                    similar.push(arr1[i]);
                    i++;
                    j++;
                }
                else if(arr1[i] < arr2[j]){
                    i++;
                }else{
                    notthere.push(arr1[i]);
                    j++;
                }
            }
            return similar;
        }


