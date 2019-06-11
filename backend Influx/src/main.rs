extern crate reqwest;
extern crate quick_xml;
#[macro_use]
extern crate influx_db_client;

use influx_db_client::{Client};


mod auth;
mod fetch;
mod parse_xml;
mod database;


fn main() {


  // fetch::fetch_xml(auth::URL_S, auth::USER_DATEX, auth::PASS_DATEX, "station_data.xml");
  // fetch::fetch_xml(auth::URL_W, auth::USER_DATEX, auth::PASS_DATEX, "weather_data.xml");

  let stations = parse_xml::parse_station("station_data.xml");
  let weathers = parse_xml::parse_weather("weather_data.xml");

  // for i in weathers {
  //   println!("{:?}", i);
  // }
  let client = Client::new_with_option("http://127.0.0.1:8086", "db", None).set_authentication("root", "root");

  database::add_station(&client, stations, weathers);




}