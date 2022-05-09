var mymap = L.map('map').setView([46.059646, 14.505751], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

var popup = L.popup();

function onMapClick(e) {
    getAddress(e)
}

var lokacijaMesto = "";
var lokacijaHisnaStevilka = "";
var lokacijaNaslov = "";
var lokacijaZip = "";
var koordinate = [];

function getAddress(e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;

    koordinate = [];

    koordinate.push(lng);
    koordinate.push(lat);

    fetch(`https://eu1.locationiq.com/v1/reverse.php?key=pk.c8f81be5c2ac6477800cef2f98d2d5af&lat=${lat}&lon=${lng}&format=json`)
        .then(response => response.json())
        .then(data => {
            data.address.hasOwnProperty('road') ? lokacijaNaslov = data.address.road : lokacijaNaslov = data.address.village;
            if (data.address.hasOwnProperty('house_number')) lokacijaHisnaStevilka = data.address.house_number;
            if (data.address.hasOwnProperty('postcode')) lokacijaZip = data.address.postcode;
            data.address.hasOwnProperty('city') ? lokacijaMesto = data.address.city : lokacijaMesto = data.address.town;

            popup
                .setLatLng(e.latlng)
                .setContent(lokacijaNaslov + " " + lokacijaHisnaStevilka + ", " + lokacijaZip + " " + lokacijaMesto)
                .openOn(mymap);
        });
}

mymap.on('click', onMapClick);

$(document).ready(function () {

    $('#exampleModal').on('shown.bs.modal', function () {
        mymap.setView([46.059646, 14.505751], 13);
        setTimeout(function () {
            mymap.invalidateSize(true);
        }, 10);
    });

    document.getElementById("saveLocation").addEventListener("click", () => {
        document.getElementById("city").value = lokacijaZip + " " + lokacijaMesto;
        document.getElementById("address").value = lokacijaNaslov + " " + lokacijaHisnaStevilka;
        $('#exampleModal').modal('hide');
    });
});