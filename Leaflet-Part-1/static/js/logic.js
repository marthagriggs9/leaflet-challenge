// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><hr><p>Magnitude: ${feature.properties.mag}</p>`);
  }

  //Create a GeoJSON layer containing the features array on the earthquakeData object
  function CreatCircleMarker(feature, latlng) {
    let options = {
        radius: feature.properties.mag*4, 
        fillColor: chooseColor(feature.geometry.coordinates[2]),
        color: chooseColor(feature.geometry.coordinates[2]),
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.35
    }
    return L.circleMarker(latlng, options);
  }

  // Create a variable for earthquakes to house latlng, each feature fo popup and circle 
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: CreatCircleMarker
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}


//circle color palette based on mag (feature) data marker. 
//Data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color
//Earthquakes with higher magnitudes should appear larger 
//Earthquakes with greater depth should appear darker in color
function chooseColor(depth) {
    switch(true) {
        case depth > 90:
            return "#bd0026"; // deep red
        case depth > 70:
            return "#f03b20";
        case depth > 50:
            return "#fd8d3c";
        case depth > 30:
            return "#feb24c";
        case depth > 10:
            return "fed976";
        default:
            return "#ffffb2";
    }
}

// Create map legend to provide context for map data
let legend = L.control({position: 'bottomright'});

legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'info legend');
    var grades = [1.0, 2.5, 4.0, 5.5, 8.0];
    var labels = [];
    var legendInfo = "<h4>Magnitude</h4>";

    div.innerHTML = legendInfo

    // go through each magnitude item to label and color the legend squares
    // push to labels array as list item
    for (var i = 0; i < grades.length; i++) {
          labels.push('<ul style="background-color:' + chooseColor(grades[i] + 1) + '"> <span>' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '' : '+') + '</span></ul>');
        }

      // add each label list item to the div under the <ul> tag
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    
    return div;
  };

//create map  
function createMap(earthquakes) {

  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "World Street Map": WorldStreetMap
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  legend.addTo(myMap);

}