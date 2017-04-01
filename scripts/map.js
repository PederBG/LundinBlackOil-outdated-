/**
 * Created by PederGB on 30.03.2017.
 */

// ---------------------------------------- OIL INFO BOX CODE --------------------------------------- \\
// getting "dataOil" json object
var request = new XMLHttpRequest();
request.open("GET", "../data/dataOil.json", false);
request.send(null);
var data = JSON.parse(request.responseText);

//function for creating info boxes
function makeOilBox(content, type, lat, long) {
    var color;
    if (type == "GAS")color = "red";
    else if (type == "OIL")color = "black";
    else color = "gray";
    var marker = new google.maps.Marker({
        position: {lat: lat, lng: long},
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 2.5,
            strokeColor: color
        },
        map: map
    });
    infoMarkers.push(marker);


    var infowindow = new google.maps.InfoWindow({
        content: content + "<br>" + type + "<br>" + "Lat: " + lat + ", Long: " + long,
        dist: 40001,
        type: type
});
    infoWindows.push(infowindow);

    marker.addListener('click', function () {
        infowindow.open(map, marker);
        openBoxes.unshift(infowindow);
        if (!isMultipleTextboxes){
            for (var i = 1; i < openBoxes.length; i++){
                openBoxes[i].close();
            }
        }
    });
}
// ---------------------------------------- ............ --------------------------------------- \\
// closing all boxes when map is clicked
var openBoxes = [];
google.maps.event.addListener(map, 'click', function() {
    for (var i = 0; i < openBoxes.length; i++){
        openBoxes[i].close();
    }
});
// --------------------------- Showing and hiding markers/info windows -------------------------- \\
function sortAwayOil(){
    for (var i = 0; i < infoWindows.length; i++){
        if (infoWindows[i].type == "OIL") {
            infoMarkers[i].setMap(null);
        }
    }
}
function sortInOil() {
    for (var i = 0; i < infoWindows.length; i++){
        if (infoWindows[i].type == "OIL") {
            infoMarkers[i].setMap(map);
        }
    }
}

function sortAwayGas(){
    for (var i = 0; i < infoWindows.length; i++){
        if (infoWindows[i].type == "GAS") {
            infoMarkers[i].setMap(null);
        }
    }
}
function sortInGas() {
    for (var i = 0; i < infoWindows.length; i++){
        if (infoWindows[i].type == "GAS") {
            infoMarkers[i].setMap(map);
        }
    }
}

function sortAwayOther(){
    for (var i = 0; i < infoWindows.length; i++){
        if ((infoWindows[i].type != "GAS") && (infoWindows[i].type != "OIL")){
            infoMarkers[i].setMap(null);
        }
    }
}
function sortInOther() {
    for (var i = 0; i < infoWindows.length; i++){
        if ((infoWindows[i].type != "GAS") && (infoWindows[i].type != "OIL")) {
            infoMarkers[i].setMap(map);
        }
    }
}
// ---------------------------------------- ............ --------------------------------------- \\

// ---------------------------------------- WEATHER BOX CODE --------------------------------------- \\

// getting weather XML from yr.no
function getWeather(platform) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    xmlhttp.open("GET", "https://www.yr.no/sted/Norge/Hav/" + platform + "/varsel.xml", true);
    xmlhttp.send();
}
function myFunction(xml) {
    data = xml.responseXML;
    var txt = data.getElementsByTagName("location")[2].getElementsByTagName("body")[0].firstChild.data;
    var lat = parseFloat(data.getElementsByTagName("location")[1].getAttributeNode("latitude").value);
    var long = parseFloat(data.getElementsByTagName("location")[1].getAttributeNode("longitude").value);

    //console.log(oilBoxCordinates[0]);
    //console.log(infoWindows[0].content);

    // adds weather forecast to markers if it's closer than 50 km to a yr.no forecast.
    for (var i = 0; i < oilBoxCordinates.length; i++){
        var tempDist = findDist(oilBoxCordinates[i][0], oilBoxCordinates[i][1], lat, long);
        if ((tempDist < 40000) && tempDist < infoWindows[i].dist){
            //deletes old weather message if a new one is closer
            var tempContent = infoWindows[i].content.split(oilBoxCordinates[i][1])[0];
            infoWindows[i].setContent(tempContent + oilBoxCordinates[i][1]  + "<br>" + txt);
            infoWindows[i].dist = tempDist;
        }
    }
    //adds "weather data not available" on short info windows
    for (var j = 0; j < oilBoxCordinates.length; j++){
        if (infoWindows[j].content.length < 80) {
            var tempContent2 = infoWindows[j].content.split(oilBoxCordinates[j][1])[0];
            infoWindows[j].setContent(tempContent2 + oilBoxCordinates[j][1] + "<br>" +
                "Platformen har ingen tilgjengelig værdata");
        }
    }
}
// ---------------------------------------- ............. --------------------------------------- \\

google.maps.event.addListener(map, 'click', findDist);
    
function findDist(aLat, aLong, bLat, bLong) {
    var a = new google.maps.LatLng(aLat,aLong);
    var b = new google.maps.LatLng(bLat,bLong);
    return google.maps.geometry.spherical.computeDistanceBetween(a,b);
}
// ---------------------------------------- MAIN (RUNNING SCRIPT) --------------------------------------- \\
var oilBoxCordinates = [];
var infoWindows = [];
var infoMarkers = [];

//oil platform url parts from yr.no/sted/Oljeplattformene/
var platforms = [/*Nordsjøen:*/ "Alvheim", "Balder", "Brage", "Ekofisk A", "Ekofisk H", "Eldfisk A", "Gjøa", "Grane",
    "Gudrun", "Gullfaks A", "Gyda", "Heimdal", "Oseberg A", "Oseberg Øst", "Petrojarl Varg", "Ringhorne", "Sleipner A",
    "Snorre A", "Statfjord A", "Tor", "Troll A", "Ula", "Valemon", "Valhall", "Veslefrikk B", "Visund",
    /*Norskehavet:*/ "Draugen", "Goliat", "Heidrun", "Kristin", "Njord A", "Norne", "Åsgard A"];

for (var z = 0; z < platforms.length; z++) {
    getWeather(platforms[z]);
}

// making the info boxes
    for (var i = 0; i < data.length; i++) {
        try {
            makeOilBox(data[i].name, data[i].type, parseFloat(data[i].vertices.SumLat),
                parseFloat(data[i].vertices.SumLong));
            var tempCor = [parseFloat(data[i].vertices.SumLat), parseFloat(data[i].vertices.SumLong), 60001];
            oilBoxCordinates.push(tempCor)
        }
        catch (TypeError) {
            console.log("TypeError, object: " + i);
        }
    }
