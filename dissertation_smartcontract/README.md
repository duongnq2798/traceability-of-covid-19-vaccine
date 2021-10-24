- USER ROLE
1. SUPER_ADMIN
2. WAREHOUSE_MANAGER
3. DISTRIBUTOR
4. VACCINATION_STATION
5. OBJECT_INJECTION

Process Related
1. Basic Details
    - producer name
    - storage name
    - distributor name
    - Vaccination station name
    - total weight lbs;
2. Warehouser
    - vaccine Name
    - quantity
    - unit Price
    - optimum Temp
    - optimum Hum
    - storage Date
    - isVilotaiomn
3. Distributor
    - Destination Address;
    - Shipping Name;
    - Shipping No;
    - quantity;
    - Departure Date Time;
    - Estimate Date Time;
    - Distributor Id;
    - Optimum Temp
    - Optimum Hum
4. Vaccination station
    - Quantity;
    - Arrival Date Time;
    - Vaccination Station Id;
    - Shipping Name;
    - Shipping No;
5. ObjectInjection
    - personName
    - age
    - identity card
    - number of vaccinations
    - vaccinationDate
    - type of vaccine
    


ACTION
 - WAREHOUSER
 - DISTRIBUTOR
 - VACCINATION_STATION
 - OBJECT_INJECTION

string vaccineName;
string batchId;
uint256 quantity;
uint256 price;
uint256 storageDate;
uint256 optimumTemp;
uint256 optimumHum;
bool isViolation;
uint256 warehouserId;