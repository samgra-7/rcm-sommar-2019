/**
 * This function wil clear the arrays in graph.js.
 * It will then call the functions in GetWeatherData.js to get the data from API.
 * The data will be generated and after this is done we call the functions that will draw the graphs.
 * Which graphs will be generated depends on what is chosen in map-module
 * @param {*} starttime Start time to know which intervall to get data from
 * @param {*} stoptime Stop time to know which intervall to get data from
 */
async function rungraphs(starttime, stoptime){
    var a = new Date(starttime.substring(0,10)+"T"+starttime.substring(11,)+"Z");
    var b = new Date(stoptime.substring(0,10)+"T"+stoptime.substring(11,)+"Z");
    if(+a < +b){
    //arrayclear
    await cleararrays();
	
    //canvasclear
    for(var i=0;i<canvaschartidarray.length;i++){
      clearcanvasfunc(canvaschartidarray[i]);
    }
  
    //functioncalls to get data
    
    if(stationsarrayid.length>0){
      await getWeatherData(stationsarrayid,starttime,stoptime,stationname);
      await getlatest(stationsarrayid,stationname);
    }
    if(chosenintcounties.length>0){
      await getAverageTempProvince(chosenintcounties,starttime,stoptime);
      await getLatestAvgCountyWeatherData(chosenCounties);
    }

    if(stationsarrayid.length>0){
      //functions to draw graphs
      await roadtemp();

      await airtemp();

      await humiditygraph();

      await windspeed();

      await currenttempgraph();

      await currentroadtempgraph();

      await currenthumgraph();

      await currentwindspeedgraph();

      await daggpunktfunc();
      await currentdaggpunktfunc();
      show1("hidebut");
    }

    if(chosenintcounties.length>0){
      await roadtempprov()

      await currentairtempgraphprov();

      await currentroadtempgraphprov();
      show1("province");
    }
  }
}

/**
 * 
 * @param {*} canvaschart This is the canvas id from graphs.ejs. Used to clear the canvas.
 */
function clearcanvasfunc(canvaschart){
  const canvasclearvar1 = document.getElementById(canvaschart).getContext('2d');
  canvasclearvar1.clearRect(0,0, document.getElementById(canvaschart).width, document.getElementById(canvaschart).height);
}