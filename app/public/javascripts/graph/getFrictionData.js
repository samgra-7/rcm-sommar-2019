async function getFrictionDataRect(reporter, SWlat, NElat, SWlon, NElon ) {		
	await $.getJSON("/api/getFrictionDataRect", {reporter, SWlat, NElat, SWlon, NElon}, function(data) {
        console.log(data);
		
    });	
}


async function getFrictionDataCirc(reporter, lat, lon, radius) {		
	await $.getJSON("/api/getWeatherData", {station_id, start_time, stop_time}, function(weatherData) {
		for(let i = 0; i < weatherData.length; i++){
				datamultieplegraf(weatherData[i],station_name[i]);
				datamultieplegrafair(weatherData[i],station_name[i]);
				datamultieplegrafhumidity(weatherData[i],station_name[i]);
				datamultieplegrafwinspeed(weatherData[i],station_name[i]);
		}
		
    });	
}