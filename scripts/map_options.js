/**
 * Created by PederGB on 31.03.2017.
 */
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
            console.log(latitude + ', ' + longitude);
            if(isShowGrid) {
                gridDisplay.innerHTML = latitude.toFixed(3) + ', ' + longitude.toFixed(3);
            }
        });
    }
}


// ------------------------------------- ............. ------------------------------------- \\
