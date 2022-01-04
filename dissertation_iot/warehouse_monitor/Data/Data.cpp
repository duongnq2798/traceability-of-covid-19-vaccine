// 
// 
// 

#include "Data.h"

Data::Data()
{
	this->temperature = -1;
	this->sensorID = -1;
	this->humidity = -1;
}

Data::Data(int _temperature, int _humidity, int _sensorID)
{
	this->temperature = _temperature;
	this->sensorID = _sensorID;
	this->humidity = _humidity;
}

Data::Data(int _sensorID)
{
	this->temperature = -1;
	this->sensorID = _sensorID;
	this->humidity = -1;
}

Data::~Data()
{
}

void Data::ChangeValues(int _temperature, int _humidity)
{
	this->temperature = _temperature;
	this->humidity = _humidity;
}

String Data::ToJson()
{
	String values = "{";
	values += "\"temperature\":";
	values += (String)this->temperature;
	values += ",\"humidity\":";
	values += (String)this->humidity;
	values += ",\"sensorName\":\"";
	values += this->sensorID;
	values += "\"";
	values += "}";
	return values;
}

String Data::CharToString(char datas[])
{
	String values="";
	int size = sizeof(datas) / sizeof(char);
	for(int i = 0 ; i< size ; i++ )
	{
		values += datas[i];
	}
	return values;
}



