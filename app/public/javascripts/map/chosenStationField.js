    /**
 * When a station is added, the station will appear in the chosen station/county list.
 * @param {JSON} station a JSON object with station data
 * @param {*} marker a station L.Marker 
 * @param {*} button a html button
 */
function addStationBox(station, marker, button){
    const stationBox = `<div id='${station.id}' class="obj-box">
                            <h3> Station: ${station.name}</h3> 
                      </div>`;
    const buttonList = $('<button/>', {
        id: station.id,
        class: "remove-button",
        text: "Ta bort",
        click: function () { removeStation(station, marker, button) }
    });
    const buttonGoToStation = $('<button/>', {
        class: "button",
        text: "Gå till station",
        click: function () { zoomToObj(station) }
    });
    const $stationList = $("#obj-list");
    $stationList.append($(stationBox).append(buttonGoToStation, buttonList));
}

/**
 * When a county is added, the county will appear in the chosen station/county list.
 * @param {*} countyCode the county code number.
 * @param {*} button a html button.
 * @param {*} coords the coordinates where the user clicked.
 */
function addCountyBox(countyCode, button, coords) {
    const countyBox = `<div id='${countyCode}' class="obj-box">
                            <h3> Län: ${countyNames[countyCode]}</h3> 
                      </div>`;
    const buttonList = $('<button/>', {
        id: countyCode,
        class: "remove-button",
        text: "Ta bort",
        click: function () { removeCounty(countyCode, button) }
    });
    const buttonGoToCounty = $('<button/>', {
        class: "button",
        text: "Gå till Län",
        click: function () { zoomToCounty(coords) }
    });
    const $objList = $("#obj-list");
    $objList.append($(countyBox).append(buttonGoToCounty, buttonList));
}

/**
 * This function will show or hide the station/county list
 */
function updateStationField(){
    const div = $("#obj-list")

    if (div.is(":hidden")) {
        $("#obj-button").text("Göm valda stationer")
        div.show();
    } else {
        $("#obj-button").text("Visa valda stationer")
        div.hide();
    }
}

/**
 * This function enables the button container to show.
 */
function showStationFieldButton(){
    $(".button-container").show();
}

/**
 * This function enables the button container to hide.
 */
function hideStationButton(){
    $(".button-container").hide();
    $("#obj-list:visible").hide();
}

/** 
 * Zoom and pan the map to a specific station.
 * @param {JSON} obj a specific station in stationData array.
 */ 
function zoomToObj(obj){
    var latlng = L.latLng(obj.lat, obj.lon);
    map.flyTo(latlng, 15,{
        animate: true,
        duration: 5
    });
    
}
/**
 * Zoom and pan the map to a specific county based on user mouse click.
 * /**
 * This function will zoom to a specific station marker based on the index argument.
 * @param {number} index of the chosen station in the chosenStation array.
 *
 {*} coords the coordinates to the position where the user clicked.
 *//**
 * This function will zoom to a specific station marker based on the index argument.
 * @param {number} index of the chosen station in the chosenStation array.
 */

function zoomToCounty(coords){
    map.flyTo(coords, 7,{
        animate: true,
        duration: 2
    });
}