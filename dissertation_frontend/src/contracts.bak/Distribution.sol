// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract distributeVaccine {
    address owner_address;
    address distributor_address = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;
    address vaccination_site_address = 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c;
    address object_injection_address = 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db;
    
    uint initiation_date;
    uint dist_start_date;
    uint vaccince_site_start_date;
    uint object_injection_start_date;
    
    string vaccine_id;
    string vaccine_name;
    
    uint distributor_price;
    uint vaccine_site_price;
    
    string person_name;
    uint person_age;

    uint producer_sold_quantity;
    uint distributor_sold_quantity;
    uint vaccine_site_sold_quantity;
    uint object_sold_quantity;
    
    enum CurrentTrace { 
        Distributor, 
        VaccineSite, 
        ObjectInjection
    }
    CurrentTrace public trace;
    
    //event
    event DistributionInitiate(address ad, string masg);
    event DistributionStart(address ad, string masg);
    event VaccineSiteStart(address ad, string masg);
    event ObjectInjectionDate(address ad, string masg);
    
    //modifiers
    
    modifier onlyOwner(){
        require(msg.sender == owner_address);
        _;
    }
    
    modifier onlyDistributor(){
        require(msg.sender == distributor_address);
        _;
    }
    
    modifier onlyVaccineSite(){
        require(msg.sender == vaccination_site_address);
        _;
    }
    
    // constructor and methods
    constructor() public {
        owner_address = msg.sender;
    }
    
    // distributor information
    function startDistribution(uint dist_quant, uint dist_price) public onlyDistributor{
        
        dist_start_date = block.timestamp;
        distributor_price = dist_price;
        distributor_sold_quantity = dist_quant;
        
        trace = CurrentTrace.Distributor;
        emit DistributionStart(distributor_address, "Vaccine distribution started");
    }
    
    function startVaccineSite(uint _vaccine_site_price, uint whole_quant) public onlyVaccineSite{
        
        vaccince_site_start_date = block.timestamp;
        
        vaccine_site_sold_quantity = whole_quant;
        vaccine_site_price = _vaccine_site_price;
        trace = CurrentTrace.VaccineSite;
        emit VaccineSiteStart(vaccination_site_address, "Vaccine site arrive now"); 
    }
    
    function startObjectInject(string memory _person_name, uint _person_age) public {
        
        object_injection_start_date = block.timestamp;
        person_name = _person_name;
        person_name = _person_name;
        object_sold_quantity = _person_age;
        
        emit ObjectInjectionDate(object_injection_address, "Vaccine sold");
        trace = CurrentTrace.ObjectInjection;
    }
}