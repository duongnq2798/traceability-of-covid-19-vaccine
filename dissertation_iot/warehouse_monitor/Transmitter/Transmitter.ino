#include <RH_NRF24.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <LowPower.h>
#include "Data.h"

#pragma region Sensor 1
#define sensorPin1 5
DHT sensor1(sensorPin1, DHT11);
Data dataSensor1(1);
#pragma endregion

const int cePin = 3;
const int csnPin = 4;
RH_NRF24 tranmistter(cePin ,csnPin);
void setup() {
	Serial.begin(115200);
	while (!Serial);
	//Init sensor
	sensor1.begin();
	dataSensor1.ChangeValues(sensor1.readTemperature() , sensor1.readHumidity());

}


void loop() {
	if (dataSensor1.temperature <= 5 )
	{
		LowPower.powerDown(SLEEP_2S, ADC_OFF, BOD_OFF);//power off
	}
	else
	{
		SendData();
	}
}
void GetTempAndHumi(DHT sensor , Data &data)
{
	data.ChangeValues(sensor.readTemperature() , sensor.readHumidity());
}

void SendData()
{   
	GetTempAndHumi(sensor1 , dataSensor1);
	tranmistter.init();
	tranmistter.setChannel(3);
	tranmistter.setRF(RH_NRF24::DataRate2Mbps, RH_NRF24::TransmitPower0dBm);
	uint8_t values[3];
	values[0] = dataSensor1.temperature;
	values[1] = dataSensor1.humidity;
	values[2] = dataSensor1.sensorID;
	tranmistter.send(values , sizeof(values));	
	tranmistter.waitPacketSent();
	tranmistter.sleep();
}

