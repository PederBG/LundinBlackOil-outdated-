/**
 * Created by PederGB on 31.03.2017.
 */
// ---------------------------------------- WEATHER BOX CODE --------------------------------------- \\

// getting weather XML from yr.no
function getWeather() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    xmlhttp.open("GET", "https://www.yr.no/sted/Norge/Hav/Ekofisk_A/varsel.xml", true);
    xmlhttp.send();
}
function myFunction(xml) {
    data = xml.responseXML;
    var txt = data.getElementsByTagName("location")[2].getElementsByTagName("body")[0].firstChild.data;
    var lat = parseFloat(data.getElementsByTagName("location")[1].getAttributeNode("latitude").value);
    var long = parseFloat(data.getElementsByTagName("location")[1].getAttributeNode("longitude").value);

    makeWeatherBox(txt, lat, long);
}

function makeWeatherBox(content, lat, long) {
    var color = "yellow";
    var marker = new google.maps.Marker({
        position: {lat: lat, lng: long},
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 3.5,
            strokeColor: color
        },
        map: map
    });

    var infowindow = new google.maps.InfoWindow({
        content:  "Lat: " + lat + ", Long: " + long + "<br>" + content
    });

    marker.addListener('click', function () {
        infowindow.open(map, marker);
        openBoxes.unshift(infowindow);
    });
}
// ---------------------------------------- ............... --------------------------------------- \\

getWeather();

google.maps.event.addListener(map, 'click', find_closest_marker);

function rad(x) {return x*Math.PI/180;}
function find_closest_marker( event ) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    var R = 6371; // radius of earth in km
    var distances = [];
    var closest = -1;
    for( i=0;i<map.markers.length; i++ ) {
        var mlat = map.markers[i].position.lat();
        var mlng = map.markers[i].position.lng();
        var dLat  = rad(mlat - lat);
        var dLong = rad(mlng - lng);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        distances[i] = d;
        if ( closest == -1 || d < distances[closest] ) {
            closest = i;
        }
    }

    alert(map.markers[closest].title);
}