use influx_db_client::{Client, Point, Points, Value, Precision};




use crate::parse_xml::{StationData, WeatherData};



pub fn add_station(client: &Client, stations: Vec<StationData>, weathers: Vec<WeatherData>){

    let mut count = 0;

    for s in stations {
        for w in &weathers {
            if(s.id == w.station_id) {
                let point = Point::new("station")                                                                      
                .add_tag("station_id", Value::String(s.id.clone()))
                .add_tag("latitude", Value::String(s.latitude.clone()))
                .add_tag("longitude", Value::String(s.longitude.clone()))
                .add_tag("name", Value::String(s.name.clone()))
                .add_tag("road_number", Value::String(s.road_number.clone()))
                .add_tag("county_number", Value::String(s.county_number.clone()))
                .add_field("timestamp", Value::String(w.timestamp.clone()))
                .add_field("road_temperature", Value::String(w.road_temperature.clone()))
                .add_field("air_temperature", Value::String(w.air_temperature.clone()))
                .add_field("air_humidity", Value::String(w.air_humidity.clone()))
                .add_field("wind_speed", Value::String(w.wind_speed.clone()))
                .add_field("wind_direction", Value::String(w.wind_direction.clone()))
                .to_owned();
        
                match client.write_point(point.clone(), Some(Precision::Seconds), None) {
                    Ok(_) => (),
                    Err(error) => println!("Error: {}", error),
                }
                // count += 1;
        }
        
        }

    }
    // println!("{:?}", count);
}
