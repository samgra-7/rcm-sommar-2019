
function getRoadCameras() {
    var obj = {
    }; 

    // var x = new XMLHttpRequest();
    // x.open("GET", "https://datex.trafikverket.se/D2ClientPull/MetaDataBA/2_3/RoadConditionCamera", true);
    x.setRequestHeader("Authorization", "Basic " + btoa("LTU:DatexLTU2018#"));
  

    x.onreadystatechange = function () {
        if (x.readyState == 4 && x.status == 200) {
            var xml = x.responseXML;
            
            var stationid = xml.getElementsByTagName("cameraBaseStationIdentification")[0].textContent;
            var urllink = xml.getElementsByTagName("orientationImageUrl")[0].getElementsByTagName("urlLinkAddress")[0].textContent;
            obj.stationid = urllink;

            console.log(obj);
            }
        }
  
    x.send(null);

}

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
  
      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open(method, url, true);

    } else if (typeof XDomainRequest != "undefined") {
  
      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open(method, url);

    } else {
  
      // Otherwise, CORS is not supported by the browser.
      xhr = null;
  
    }
    return xhr;
  }
  
  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    throw new Error('CORS not supported');
  }