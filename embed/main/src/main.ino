#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

#define DHTPIN 32     // Digital pin connected to the DHT sensor
// Feather HUZZAH ESP8356 note: use pins 3, 4, 5, 12, 13 or 14 --
// Pin 15 can work but DHT must be disconnected during program upload.

// Uncomment the type of sensor in use:
//#define DHTTYPE    DHT11     // DHT 11
#define DHTTYPE    DHT22     // DHT 22 (AM2302)
//#define DHTTYPE    DHT21     // DHT 21 (AM2301)

// See guide for details on sensor wiring and usage:
//   https://learn.adafruit.com/dht/overview

DHT_Unified dht(DHTPIN, DHTTYPE);

const char* ssid = "TP-LINK_POCKET_3020_B6850A";
const char* password =  "29731107";

void setup() {
  Serial.begin(115200);
  Serial.println("Begin");
  delay(4000);

  Serial.println("Connect");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) { //Check for the connection
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  Serial.println("Connected to the WiFi network");

  pinMode(35, INPUT);

  dht.begin();
}

void loop() {

 if(WiFi.status()== WL_CONNECTED) {   //Check WiFi connection status
   HTTPClient http;
   http.begin("http://192.168.1.6:5000/save");  //Specify destination for HTTP request

   DynamicJsonDocument doc(1024);

   sensors_event_t event;
  dht.temperature().getEvent(&event);
  if (isnan(event.temperature)) {
    Serial.println(F("Error reading temperature!"));
  }
  else {
   doc["temp"] = event.temperature;
  }
  // Get humidity event and print its value.
  dht.humidity().getEvent(&event);
  if (isnan(event.relative_humidity)) {
    Serial.println(F("Error reading humidity!"));
  }
  else {
    Serial.print(F("Humidity: "));
    Serial.print(event.relative_humidity);
    doc["hum"] = event.relative_humidity;
    Serial.println(F("%"));
  }

  Serial.println(analogRead(35));

   doc["lux"] = analogRead(35);

   String json;

   serializeJson(doc, json);

   http.addHeader("Content-Type", "application/json" , "Content-Length", json.length());    //Specify content-type header

   int httpResponseCode = http.POST(json);   //Send the actual POST request

   if(httpResponseCode>0){

    String response = http.getString();                       //Get the response to the request

    Serial.println(httpResponseCode);   //Print return code
    Serial.println(response);           //Print request answer

   }else{

    Serial.print("Error on sending POST: ");
    Serial.println(httpResponseCode);

   }

   http.end();  //Free resources

 }else{

    Serial.println("Error in WiFi connection");

 }

  delay(1000);  //Send a request every 10 seconds
}
