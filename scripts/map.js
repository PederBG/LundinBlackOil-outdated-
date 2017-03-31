/**
 * Created by PederGB on 30.03.2017.
 */

// getting "dataOil" json object
var request = new XMLHttpRequest();
request.open("GET", "../data/dataOil.json", false);
request.send(null);
var data = JSON.parse(request.responseText);


// making the info boxes
for (var i = 0; i < data.length; i++){
    try{
        makeInfoBox(data[i].name, data[i].type, parseFloat(data[i].vertices.SumLat), parseFloat(data[i].vertices.SumLong))
    }
    catch (TypeError){
        console.log("TypeError, object: " + i);
    }
}


//function for creating info boxes
function makeInfoBox(content, type, lat, long) {
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

    var infowindow = new google.maps.InfoWindow({
        content: content + "<br>" + type + "<br>" + "Lat: " + lat + ", Long: " + long
    });

    marker.addListener('click', function () {
        infowindow.open(map, marker);
        openBoxes.unshift(infowindow);
    });
}

// closing all boxes when map is clicked
var openBoxes = [];
google.maps.event.addListener(map, 'click', function() {
    for (var i = 0; i < openBoxes.length; i++){
        openBoxes[i].close();
    }
});
