#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "My note 9";
const char* password =  "123456789";

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
}

void loop() {

 if(WiFi.status()== WL_CONNECTED){   //Check WiFi connection status

   HTTPClient http;

   http.begin("http://192.168.43.86:3000/save");  //Specify destination for HTTP request


   DynamicJsonDocument doc(1024);

   doc["temp"] = 23.5;
   doc["hum"] = 0.12;
   doc["lux"] = 123;

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

  delay(10000);  //Send a request every 10 seconds

}