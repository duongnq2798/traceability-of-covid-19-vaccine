#include <SoftwareSerial.h>
SoftwareSerial gprs(9, 10);
#include "DHT.h"
// define sensor pin
#define sensorPin_1 14 // chan data sensor 1
#define sensorPin_2 15 // chan data sensor 2

DHT sensor_1(sensorPin_1, DHT11);
DHT sensor_2(sensorPin_2, DHT11);
//
String severName = "http://backend-temp-uit.herokuapp.com/temperature";
//
struct  data
{
	float temp;
	float humi;
	String ToString()
	{
		return "{\"temperature\":\"" + String(temp) + "\",\"humidity\":\"" + String(humi) + "\"}";
	}
	void Init()
	{
		temp = 0;
		humi =0;
	}
};
data dtSensor_1;
data dtSensor_2;

void setup()
{
	gprs.begin(9600);  
	Serial.begin(9600);
	Serial.println("Start ...");
	//
	sensor_1.begin();// init sensor 1
	sensor_2.begin();// init sesor 2
	dtSensor_1.Init();
	dtSensor_2.Init();
	delay(100);
}

void loop()
{
	dtSensor_1.temp = sensor_1.readTemperature();
	dtSensor_1.humi = sensor_1.readHumidity();
	dtSensor_2.temp = sensor_2.readTemperature();
	dtSensor_2.humi = sensor_2.readHumidity();
	if (dtSensor_1.temp > 30) 
	{
		Serial.println("Sensor 1 => Temp : " + (String)dtSensor_1.temp + " Humidity : " + (String)dtSensor_1.humi);
		SendData(dtSensor_1);
	}
	if (dtSensor_2.temp > 30)
	{
		Serial.println("Sensor 2 => Temp : " + (String)dtSensor_2.temp + " Humidity : " + (String)dtSensor_2.humi);
		SendData(dtSensor_1);
	}
}

void SendData(data _data)
{
	gprs.println("AT+HTTPPARA=\"URL\",\"" + severName + "\"");
	delay(500);
	//ShowSerialData(); // Check respone

	gprs.println("AT+HTTPPARA=\"CONTENT\",\"application/json\""); // html header
	delay(500);
	//Serial.println("Html header ...");
	//ShowSerialData();

	gprs.println("AT+HTTPDATA=" + (String)_data.ToString().length() + ",100000");
	delay(500);
	//Serial.println("Html header ..." + (String)_data.ToString() );
	//ShowSerialData();

	gprs.println(_data.ToString());
	delay(500);
	//ShowSerialData();

	gprs.println("AT+HTTPACTION=1");
	delay(500);
	//ShowSerialData();

	gprs.println("AT+HTTPREAD");
	delay(500);
	//ShowSerialData();

	gprs.println("AT+HTTPTERM");
	delay(500);
	//ShowSerialData();
}

void ShowSerialData()
{
	while (gprs.available())
	{
		Serial.println(gprs.read());
	}
}
