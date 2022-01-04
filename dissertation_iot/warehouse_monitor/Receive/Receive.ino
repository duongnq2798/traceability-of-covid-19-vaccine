#include <HTTPClient.h>
#include <EEPROM.h>
#include <WiFi.h>
#include <SPI.h>
#include <RH_NRF24.h>
#include "Data.h"

const char* userName = "BluN";
const char* passWord = "dtpa20101999";
const char* severName = "http://backend-temp-uit.herokuapp.com/temperature"; // sever name
const int cePin = 2;
const int csnPin = 4;

WiFiClient client;
HTTPClient https;
RH_NRF24 receive(cePin , csnPin);
void setup() {
	Serial.begin(115200); // init Esp
	WiFi.begin(userName , passWord); // connet esp32 with wifi
	Serial.print("Conneting ");
	while (WiFi.status() != WL_CONNECTED) // waitting connet to wifi 
	{
		delay(500);
		Serial.print(".");
	}
	Serial.println(); Serial.println("conneted");
	receive.init();
	receive.setChannel(3);
	receive.setRF(RH_NRF24::DataRate2Mbps, RH_NRF24::TransmitPower0dBm);
}
void loop() {
	if (receive.available())
	{
		String values = "";
		uint8_t buf[RH_NRF24_MAX_MESSAGE_LEN];
		uint8_t len = sizeof(buf);
		if (receive.recv(buf, &len))
		{
			int humidity = buf[0];
			int temperature = buf[1];
			int deviceID = buf[2];
			Data datas(temperature , humidity , deviceID);
			values = datas.ToJson();
		}
		SendData(values);
	}
}

void SendData(String data)
{
	https.begin(client, severName);
	https.addHeader("Content-Type", "application/json"); // header http request
	int httpResponseCode = https.POST(data); // http post
	Serial.println(httpResponseCode);
	if (httpResponseCode == 200 || httpResponseCode == 201)
	{
		Serial.println("Sent");
	}
	https.end();
}

