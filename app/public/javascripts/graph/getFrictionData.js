async function getFrictionDataRect(reporter, SWlat, NElat, SWlon, NElon ) {		
	await $.getJSON("/api/getFrictionDataRect", {reporter, SWlat, NElat, SWlon, NElon}, function(data) {
		datamultieplegraffriction(data);
    });	
}


async function getFrictionDataCirc(reporter, lat, lon, radius) {		
	await $.getJSON("/api/getFrictionDataCirc", {reporter, lat, lon, radius}, function(data) {
		datamultieplegraffriction(data);
    });	
}


async function getLatestFrictionData(friction_id) {
    await $.getJSON("/api/getLatestFrictionData", {friction_id}, function(data) {
	for(let i = 0; i < data.length; i++){
		databarchartfrictiondata(data[i])
		}
    });	
}