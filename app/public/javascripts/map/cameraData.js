var cameraArrayData = [];

async function getCameraData() {
    await $.getJSON("/api/getCameraData", function(data) {
        cameraArrayData = data;
    });    
}
