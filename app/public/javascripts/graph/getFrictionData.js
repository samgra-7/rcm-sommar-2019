async function getFrictionDataRect(reporter, SWlat, NElat, SWlon, NElon ) {		
	await $.getJSON("/api/getFrictionDataRect", {reporter, SWlat, NElat, SWlon, NElon}, function(data) {
		datamultieplegraffriction(data);
    });	
}


async function getFrictionDataCirc(reporter, lat, lon, radius) {		
	await $.getJSON("/api/getWeatherData", {station_id, start_time, stop_time}, function(data) {
		console.log(data)
    });	
}


async function getLatestFrictionData(friction_id) {
    await $.getJSON("/api/getLatestFrictionData", {friction_id}, function(data) {
		
	for(let i = 0; i < data.length; i++){
		databarchartfrictiondata(data[i])
		}
    });	
}