/**
 * Creates and returns the popup content for a station marker.
 * @param {*} station a station data JSON object.
 * @param {*} marker a Leaflet marker representing a specific station.
 */
function addPopup(station, marker,cameraArrayData) {
  let cameraurl = "";
  let cameraurlbig ="";
  let timestampcamera = "";
 for(var i=0;i<cameraArrayData.length;i++){
  if(cameraArrayData[i].station_id == station.id){
    cameraurl = cameraArrayData[i].url_thumb;
    timestampcamera =  cameraArrayData[i].time;
    cameraurlbig = cameraArrayData[i].url;
  }
 }
  let popupContent = document.createElement("table-data");

  let index = getLatestWeatherIndex(station);
  
  if(index == -1){
    console.log("ERROR");
  }else{

    
var obj = {
  Station: [station.name,""],
  Län: [countyNames[station.county_number],""],
  Lufttemperatur: [latestWeatherData[index]['air_temperature'],"\xB0C"],
  Vägtemperatur: [latestWeatherData[index]['road_temperature'],"\xB0C"],
  Luftfuktighet: [latestWeatherData[index]['air_humidity'],"%"],
  Nederbördstyp: [latestWeatherData[index]['precipitation_type'],""],
  Nederbördsmängd: [latestWeatherData[index]['precipitation_millimetres'] ," mm"],
  Vindhastighet: [latestWeatherData[index]['wind_speed']," m/s"],
  Vindriktning: [windDirection(latestWeatherData[index]['wind_direction']),""],
  Tidväderdata: [latestWeatherData[index]['timestamp'],""],
  Tidkamera: [timestampcamera,""]
};
 
  var strings = "";
  Object.keys(obj).forEach(function(key){
    if(obj[key][0] != null){
      if(obj[key][0] == "rain") {
        marker.setIcon(rainIcon);
      }
      if(obj[key[0] == "snow"]) {
        marker.setIcon(snowIcon);
      }
      strings+='<tr> <td>'+ key +'</td> <td>'+ obj[key][0] + obj[key][1] +'</td> </tr>'
    }
  });

    var htmlvar = '<table id = "marker-data" >' +strings + '</table>'
    strings = "" 

    popupContent.innerHTML  = htmlvar;

  }

  if(cameraurl!="" && cameraurl != null && cameraurl != undefined){

    let image =  document.createElement("IMG");
    image.src = cameraurl;
    image.className ="imageclasspopup";
    image.onclick = function() {
      window.open(cameraurlbig, '_blank');
    };
    popupContent.appendChild(image);
    cameraurl="";

  }

  // Leaflet require DOM therefor Jquery is not used
  let button = document.createElement("button");
  button.id = station.id;
  if(chosenStations.includes(station)){
    button.className = "remove-button";
    button.innerText = "Ta bort";
  }else{
    button.className = "add-button";
    button.innerText = "Lägg till";
  }
  
  button.addEventListener("click" , function() {
        handleChosenStations(station, marker, this);
    
  });
  popupContent.appendChild(button);



  return popupContent;
}
/**
 * 
 * @param {*} friction return popup content for frictiondata circlemarkers
 */
function popupfriction(friction, circle){
  let popupContent = document.createElement("table-data");

  var obj = {
    id: [friction.id, ""],
    Mätvärde: [friction.MeasurementValue,""],
    Tid: [friction.MeasureTimeUTC,""],
  };
  var strings = "";
  Object.keys(obj).forEach(function(key){
    if(obj[key][0] != null){
      strings+='<tr> <td>'+ key +'</td> <td>'+ obj[key][0] + obj[key][1] +'</td> </tr>'
    }
  });

  var htmlvar = '<table id = "marker-data" >' +strings + '</table>'
  strings = ""

  popupContent.innerHTML  = htmlvar;

  let button = document.createElement("button");
  button.id = friction.id;
  if(chosenFriction.includes(friction)){
    button.className = "remove-button";
    button.innerText = "Ta bort";
  }else{
    button.className = "add-button";
    button.innerText = "Lägg till";
  }
  button.addEventListener("click" , function() {
        handleChosenFriction(friction, circle, this);
  });
  popupContent.appendChild(button);

  return popupContent;
}



function windDirection(data) {
    if(data == 'north') {
      return '&nbsp; <i class="fas fa-long-arrow-alt-down fa-2x"></i> <br>';
    }
    else if(data == 'south') {
      return '&nbsp; <i class="fas fa-long-arrow-alt-up fa-2x"></i> <br>';
    }
    else if(data == 'east') {
      return '&nbsp; <i class="fas fa-long-arrow-alt-left fa-2x"></i> <br>';
    }
    else if(data == 'west') {
      return '&nbsp; <i class="fas fa-long-arrow-alt-right fa-2x"></i> <br>';
    }
    else if(data == 'northEast') { //southWest
      return '&nbsp; <i class="fas fa-long-arrow-alt-down fa-2x" style="transform: rotate(45deg)"></i> <br>';
    }
    else if(data == 'northWest') { //southEast
      return '&nbsp; <i class="fas fa-long-arrow-alt-right fa-2x" style="transform: rotate(45deg)"></i> <br>';
    }
    else if(data == 'southEast') { //northWest
      return '&nbsp; <i class="fas fa-long-arrow-alt-up fa-2x" style="transform: rotate(45deg)"></i> <br>';
    }
    else if(data == 'southWest') { //northEast
      return '&nbsp; <i class="fas fa-long-arrow-alt-left fa-2x" style="transform: rotate(45deg)"></i> <br>';
    }
}

/**
 * Use this method to get a specific index from the latestWeatherdata array based on a specific station.
 * @param {*} station a station data JSON object.
 */
function getLatestWeatherIndex(station){
  for(let j = 0; j < latestWeatherData.length; j++){
      if(station.id === latestWeatherData[j].station_id){
          return j;
      }
  } 
  return -1;
}