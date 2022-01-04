// Data.h

#ifndef _DATA_h
#define _DATA_h

#if defined(ARDUINO) && ARDUINO >= 100
	#include "arduino.h"
#else
	#include "WProgram.h"
#endif
class Data
{
public:
	float temperature;
	float humidity;
	int sensorID;
	Data();
	Data(int _temperature, int _humidity, int _sensorID);
	~Data();
	void ChangeValues(int _temperature , int _humidity);
	String ToJson();
	String CharToString(char datas[]);

private:

};


#endif

