async function getFrictionDataRect(reporter, SWlat, NElat, SWlon, NElon ) {		
	await $.getJSON("/api/getFrictionDataRect", {reporter, SWlat, NElat, SWlon, NElon}, function(data) {
		datamultieplegraf(data);
		console.log(data)
    });	
}


async function getFrictionDataCirc(reporter, lat, lon, radius) {		
	await $.getJSON("/api/getWeatherData", {station_id, start_time, stop_time}, function(data) {
		console.log(data)
    });	
}