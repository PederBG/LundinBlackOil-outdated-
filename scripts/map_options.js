/**
 * Created by PederGB on 31.03.2017.
 */
// ------------------------------------- Maps navBar ------------------------------------- \\
var subMenu = document.getElementById("subMenu");
subMenu.style.display = "none";

function showSubMenu(){
    if (subMenu.style.display == "none"){
        subMenu.style.display = "block";
    }
    else{
        subMenu.style.display = "none";
    }
}

var counter = 0;

function baseMap() {
    map.data.forEach(function(feature) {
        // If you want, check here for some constraints.
        map.data.remove(feature);
        document.getElementById("subMenu4").style.backgroundColor = "darkslategray";
        document.getElementById("subMenu1").style.backgroundColor = "darkcyan";
        document.getElementById("subMenu4").innerHTML = "Focus Water";
        counter = 0;
    });
}

function focusWaterMap(){
    counter +=1;
    map.data.loadGeoJson(
        'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_ocean.geojson');
    document.getElementById("subMenu1").style.backgroundColor = "darkslategray";
    document.getElementById("subMenu4").style.backgroundColor = "darkcyan";
    document.getElementById("subMenu4").innerHTML = "Focus Water: x" + counter;
}

// ------------------------------------ .......... ------------------------------------- \\

var menu = document.getElementById("optionMenu");
menu.style.display = "none";

function showOptions() {
    if (menu.style.display == "none"){
        menu.style.display = "block";
    }
    else{
        menu.style.display = "none";
        //also collapse all sub menus..
        generalMenu.style.display = "none";
    }
}

// ------------------------------------- General Button ------------------------------------- \\
var generalMenu = document.getElementById("generalMenu");
generalMenu.style.display = "none";

function generalOptions() {
    if (generalMenu.style.display == "none"){
        generalMenu.style.display = "block";
    }
    else{
        generalMenu.style.display = "none";
    }}

var isMultipleTextboxes = false;
function multipleTextboxes() {
    if(isMultipleTextboxes){
        isMultipleTextboxes = false;
        document.getElementById("general_1").style.backgroundColor = "#333333";
    }
    else{
        isMultipleTextboxes = true;
        document.getElementById("general_1").style.backgroundColor = "green";
    }
}

var gridDisplay = document.getElementById("general_2");
var isShowGrid = false;
function showGrid() {
    if (isShowGrid){
        isShowGrid = false;
        gridDisplay.innerHTML =  "Show grid";
        gridDisplay.style.backgroundColor = "#333333";
    }
    else{
        isShowGrid = true;
        gridDisplay.style.backgroundColor = "green";
        google.maps.event.addListener(map, 'mousemove', function (event) {
            var latitude = event.latLng.lat();
            var longitude = event.latLng.lng();
            //console.log(latitude + ', ' + longitude);
            if(isShowGrid) {
                gridDisplay.innerHTML = latitude.toFixed(3) + ', ' + longitude.toFixed(3);
            }
        });
    }
}
// ------------------------------------- ............. ------------------------------------- \\

// ------------------------------------- Filter Button ------------------------------------- \\
var filterMenu = document.getElementById("filterMenu");
filterMenu.style.display = "none";

function filterOptions() {
    if (filterMenu.style.display == "none"){
        filterMenu.style.display = "block";
    }
    else{
        filterMenu.style.display = "none";
    }}

var oilButton = document.getElementById("filter_1");
var gasButton = document.getElementById("filter_2");
var otherButton = document.getElementById("filter_3");

oilButton.style.backgroundColor = "green";
gasButton.style.backgroundColor = "green";
otherButton.style.backgroundColor = "green";

function sortOil(){
    if (oilButton.style.backgroundColor == "green") {
        oilButton.style.backgroundColor = "#333333";
        sortAwayOil();
    }
    else{
        oilButton.style.backgroundColor = "green";
        sortInOil();
    }
}

function sortGas(){
    if (gasButton.style.backgroundColor == "green") {
        gasButton.style.backgroundColor = "#333333";
        sortAwayGas();
    }
    else{
        gasButton.style.backgroundColor = "green";
        sortInGas();
    }
}

function sortOther(){
    if (otherButton.style.backgroundColor == "green") {
        otherButton.style.backgroundColor = "#333333";
        sortAwayOther();
    }
    else{
        otherButton.style.backgroundColor = "green";
        sortInOther();
    }
}

// ------------------------------------- ............. ------------------------------------- \\
// ------------------------------------- Filter Button ------------------------------------- \\
var searchBox = document.getElementById("searchBox");
var searchInput = document.getElementById("searchInput");
var searchButton = document.getElementById("searchButton");
var searchResults = document.getElementById("searchResults");


var openSearchBox = false;

function searchOptions(){
    if (openSearchBox == true) {
        searchBox.style.display = "none";
        searchResults.style.display = "none";
        openSearchBox = false;
    }
    else{
        searchBox.style.display = "block";
        searchResults.style.display = "block";
        openSearchBox = true;
    }
}

function searchFunction() {
    searchResults.innerHTML = "";
    if (searchInput.value.length > 0){
        var result = searchPlatforms(searchInput.value);
        for (var i = 0; i < result.length; i++){
            searchResults.innerHTML += "<li class='results' >" + result[i].name + "</li>";
        }
    }
}

searchButton.addEventListener("click", searchFunction);


// ------------------------------------- ............. ------------------------------------- \\


