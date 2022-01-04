// include lib sensor and wifi
#include <WiFi.h>
#include <HTTPClient.h>
#include "DHT.h"
// define sensor pin
#define sensorPin_1 14 // chan data sensor 1
#define sensorPin_2 15 // chan data sensor 2

// username and password wifi can connet
const char* userName = "BluN";
const char* passWord = "dtpa20101999";
// 
struct data
{
	float temp;
	float humidity;
	String ToString() // to json string
	{
		String value = "{\"temperature\":\"" + String(temp) + "\",\"humidity\":\"" + String(humidity) + "\"}";
		return value;
	}
	void Init() // init value
	{
		temp = 0;
		humidity = 0;
	}
};
//
const char* severName = "http://backend-temp-uit.herokuapp.com/temperature"; // sever name
DHT sensor_1(sensorPin_1 , DHT11);
DHT sensor_2(sensorPin_2 , DHT11);

data dtSensor_1;
data dtSensor_2;

void setup() 
{
	Serial.begin(115200); // init Esp
	WiFi.begin(userName , passWord); // connet esp32 with wifi
	Serial.print("Conneting ");
	while (WiFi.status() != WL_CONNECTED) // waitting connet to wifi 
	{
		delay(500);
		Serial.print(".");
	}
	Serial.println();Serial.println("cooneted");
	sensor_1.begin();// init sensor 1
	sensor_2.begin();// init sesor 2
	dtSensor_1.Init();
	dtSensor_2.Init();
}
void loop()
{
	dtSensor_1.temp = sensor_1.readTemperature();
  dtSensor_1.humidity = sensor_1.readHumidity();
  dtSensor_2.temp = sensor_2.readTemperature();
  dtSensor_2.humidity = sensor_2.readHumidity();
	if (dtSensor_1.temp > 30)
	{
		Serial.print("Sensor 1 : ");
		if (WiFi.status() != WL_CONNECTED)
		{
			Serial.println("Disconnet");
		}else SendData(dtSensor_1);

	}
	if (dtSensor_2.temp > 30)
	{
		Serial.print("Sensor 2 : ");
		if (WiFi.status() != WL_CONNECTED)
		{
			Serial.println("Disconnet");
		}
		else SendData(dtSensor_2);
	}

}
void SendData(data _data) // send data 
{
	WiFiClient client;
	HTTPClient https;
	https.begin(client, severName);
	https.addHeader("Content-Type", "application/json"); // header http request
	String request = _data.ToString();
	int httpResponseCode = https.POST(request); // http post
	Serial.println(httpResponseCode);
	if (httpResponseCode == 200 || httpResponseCode == 201)
	{
		Serial.println("temp : " + (String)_data.temp + "   ,  humi : " + _data.humidity);
	}
	https.end();
}
