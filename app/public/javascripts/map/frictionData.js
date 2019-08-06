var frictionData = [];
var filteredfrictionData = [];


async function getAllFrictionData() {
    await $.getJSON("/api/getAllFrictionData", function(data) {
        frictionData = data;
    });    
}

async function getFrictionData(reporter, date1, date2) {
    await $.getJSON("/api/getFrictionData", {reporter, date1, date2}, function(data) {
        filteredfrictionData = data;
    });
    console.log(filteredfrictionData);
    await drawFriction(filteredfrictionData)
}

async function getDistinctReporterorgFriction() {
    await $.getJSON("/api/getDistinctReporterorgFriction", function(data) {
        addtoMAPtoggle(data);
    });    
}
