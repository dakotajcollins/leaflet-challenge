// Use this link to get the GeoJSON data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


d3.json(link).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data.features);
});

  function createFeatures(earthquakeData) {
  
    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, marker) {
        marker.bindPopup(`<h3>Magnitude: ${feature.properties.mag}</h3><hr><p>Depthe Reached: ${feature.geometry.coordinates[2]}</p>`);
    }

    function pointToLayer(feature,latlng){
        var color = feature.geometry.coordinates[2]
        if (color < 10){
          fill="yellowgreen"
        } else if (color< 15){
          fill="yellow"
        } else if (color< 25){
          fill="gold"
        }else if (color< 35){
          fill="orange"
        }else if (color< 60){
          fill="darkorange"
        }else if (color< 80){
          fill="orangered"
        }else if (color< 100){
          fill="red"
        }else if (color<135){
          fill="firebrick"
        }else {
            fill="maroon"
        }
        
        var geojsonMarkerOptions = {
          radius: feature.properties.mag*10,
          fillColor: fill,
          weight: .2,
          fillOpacity: 0.65
        };
        return L.circleMarker(latlng, geojsonMarkerOptions)
    }

  
    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    var earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer:pointToLayer,
        onEachFeature: onEachFeature
    });
  
    // Send our earthquakes layer to the createMap function/
    createMap(earthquakes);

    L.geoJSON(someGeojsonFeature, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).addTo(myMap);
  }

  function createMap(earthquakes) {

    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // Create a baseMaps object.
    var baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
  
    // Earthquakes overlay.
    var overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    var myMap = L.map("map", {
      center: [39.8283, -98.5795],
      zoom: 4,
      layers: [street, earthquakes]
    });
  
    // Create a layer control.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  
    L.geoJSON({
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).addTo(myMap);

    L.control({position: 'bottomright'}).addTo(myMap)
//     onAdd: function () {

//     var div = L.DomUtil.create('div', 'info legend');
    
//     var categories = ['<10','10-15','15-25','25-35','35-60','60-80','80-100','100-135','135+'];
//     var colors=['yellowgreen','yellow','gold','orange','darkorange','orangered',
//     'red','firebrick','maroon']
//     for (var i = 0; i < categories.length; i++) {
//         div.innerHTML +=
//           "<i style='background: " + colors[i] + "'></i> " +
//           categories[i] + (categories[i + 1] ? "&ndash;" + categories[i + 1] + "<br>" : "+");
//       }
//       return div;
//     }
  
// }).addTo(myMap);
}