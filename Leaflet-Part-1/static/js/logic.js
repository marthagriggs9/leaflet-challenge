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
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>Magnitude: ${feature.properties.mag}</p><hr><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
  }

  //Create a GeoJSON layer containing the features array on the earthquakeData object
  function CreatCircleMarker(feature, latlng) {
    let options = {
        radius: markerSize(feature.properties.mag), 
        fillColor: chooseColor(feature.geometry.coordinates[2]),
        color: chooseColor(feature.geometry.coordinates[2]),
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.35
    }
    return L.circleMarker(latlng, options);

    function markerSize(mag) {
        if (mag === 0) {
            return 1;
        }

        return mag * 4.75;
    }
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
            return "#cb181d"; 
        case depth > 70:
            return "#e31a1c";
        case depth > 50:
            return "#fc4e2a";
        case depth > 30:
            return "#fd8d3c";
        case depth > 10:
            return "#feb24c";
        default:
            return "#fed976";
    }
}

// Create map legend to provide context for map data
let legend = L.control({position: 'bottomright'});

legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'info legend');
    var grades = [-10, 10, 30, 50, 70, 90];
    var labels = [];
    var legendInfo = "<h4>Earthquake Depth</h4>";

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

  var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});


  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Gray Street Map": Stadia_AlidadeSmooth
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
    zoom: 4.75,
    layers: [Stadia_AlidadeSmooth, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  legend.addTo(myMap);

}