var frictionData = [];


async function getAllFrictionData() {
    await $.getJSON("/api/getAllFrictionData", function(data) {
        frictionData = data;
    });    
}

async function getFrictionData(reporter) {
    await $.getJSON("/api/getFrictionData", {reporter}, function(data) {
        console.log(data);
    });
}