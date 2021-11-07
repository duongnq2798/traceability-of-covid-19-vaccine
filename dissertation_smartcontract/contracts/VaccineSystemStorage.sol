// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Ownable.sol";

contract VaccineSystemStorage is Ownable {
    address public lastAccess;

    constructor() {
        authorizedCaller[msg.sender] = 1;
    }

    /* Declare Events */
    event AuthorizedCaller(address caller);
    event DeAuthorizedCaller(address caller);

    /* Declare Modifiers */
    modifier onlyAuthCaller() {
        lastAccess = msg.sender;
        require(authorizedCaller[msg.sender] == 1);
        _;
    }

    /* Caller Mapping */
    mapping(address => uint8) authorizedCaller;

    /* User Interface */
    struct user {
        string name;
        string contactNo;
        bool isActive;
        string profileHash;
    }

    mapping(address => user) userDetails;
    mapping(address => string) userRole;

    /* Authorized Caller */
    function authorizeCaller(address _caller) public onlyOwner returns (bool) {
        authorizedCaller[_caller] = 1;
        emit AuthorizedCaller(_caller);
        return true;
    }

    /* De-Authorized Caller */
    function deAuthorizeCaller(address _caller)
        public
        onlyOwner
        returns (bool)
    {
        authorizedCaller[_caller] = 0;
        emit DeAuthorizedCaller(_caller);
        return true;
    }

    struct basicDetails {
        string producerName;
        string storageName;
        string distributorName;
        string vaccinationStationName;
        uint256 quantity;
        string optimumRangeTemp;
        string optimumRangeHum;
    }

    struct warehouser {
        string vaccineName;
        uint256 quantity;
        uint256 price;
        uint256 storageDate;
        string optimumRangeTemp;
        string optimumRangeHum;
        bool isViolation;
        string locationAddress;
    }

    struct distributor {
        string destinationAddress;
        string shippingName;
        uint256 quantity;
        uint256 departureDateTime;
        uint256 estimateDateTime;
        string optimumRangeTemp;
        string optimumRangeHum;
        bool isViolation;
    }

    struct vaccinationStation {
        uint256 quantity;
        uint256 arrivalDateTime;
        uint256 vaccinationStationId;
        string shippingName;
        string shippingNo;
        string locationAddress;
    }

    struct vaccinatedPerson {
        string personName;
        uint256 age;
        uint256 identityCard;
        uint256 numberOfVaccinations;
        uint256 vaccinationDate;
        string typeOfVaccine;
        string phoneNumber;
    }

    mapping(address => basicDetails) batchBasicDetails;
    mapping(address => warehouser) batchWarehouser;
    mapping(address => distributor) batchDistributor;
    mapping(address => vaccinationStation) batchVaccinationStation;
    mapping(address => vaccinatedPerson) batchVaccinatedPerson;
    mapping(address => string) nextAction;

    /* Init Struct Pointer */
    user userDetail;
    basicDetails basicDetailsData;
    warehouser warehouserData;
    distributor distributorData;
    vaccinationStation vaccinationStationData;
    vaccinatedPerson vaccinatedPersonData;

    /* Get User Role */
    function getUserRole(address _userAddress)
        public
        view
        returns (string memory)
    {
        return userRole[_userAddress];
    }

    /* Get Next Action */
    function getNextAction(address _batchNo)
        public
        view
        returns (string memory)
    {
        return nextAction[_batchNo];
    }

    /* Set User Detail */
    function setUser(
        address _userAddress,
        string memory _name,
        string memory _contactNo,
        string memory _role,
        bool _isActive,
        string memory _profileHash
    ) public onlyAuthCaller returns (bool) {
        /* Store Data User Into Struct - User */
        userDetail.name = _name;
        userDetail.contactNo = _contactNo;
        userDetail.isActive = _isActive;
        userDetail.profileHash = _profileHash;

        /* Store Data User Into Mapping - User */
        userDetails[_userAddress] = userDetail;
        userRole[_userAddress] = _role;

        return true;
    }

    /* Get User details */
    function getUser(address _userAddress)
        public
        view
        returns (
            string memory name,
            string memory contactNo,
            string memory role,
            bool isActive,
            string memory profileHash
        )
    {
        /* Get User Value From Struct */
        user memory tmpData = userDetails[_userAddress];

        return (
            tmpData.name,
            tmpData.contactNo,
            userRole[_userAddress],
            tmpData.isActive,
            tmpData.profileHash
        );
    }

    /* Get Batch Basic Details */
    function getBasicDetails(address _batchNo)
        public
        view
        returns (
            string memory producerName,
            string memory storageName,
            string memory distributorName,
            string memory vaccinationStationName,
            uint256 quantity,
            string memory optimumRangeTemp,
            string memory optimumRangeHum
        )
    {
        basicDetails memory tmpData = batchBasicDetails[_batchNo];

        return (
            tmpData.producerName,
            tmpData.storageName,
            tmpData.distributorName,
            tmpData.vaccinationStationName,
            tmpData.quantity,
            tmpData.optimumRangeTemp,
            tmpData.optimumRangeHum
        );
    }

    /* Set Batch Basic Detail */
    function setBasicDetails(
        string memory _producerName,
        string memory _storageName,
        string memory _distributorName,
        string memory _vaccinationStationName,
        uint256 _quantity,
        string memory _optimumRangeTemp,
        string memory _optimumRangeHum
    ) public onlyAuthCaller returns (address) {
        address batchNo = address(
            uint160(
                uint256(
                    keccak256(abi.encodePacked(msg.sender, block.timestamp))
                )
            )
        );

        basicDetailsData.producerName = _producerName;
        basicDetailsData.storageName = _storageName;
        basicDetailsData.distributorName = _distributorName;
        basicDetailsData.vaccinationStationName = _vaccinationStationName;
        basicDetailsData.quantity = _quantity;
        basicDetailsData.optimumRangeTemp = _optimumRangeTemp;
        basicDetailsData.optimumRangeHum = _optimumRangeHum;

        batchBasicDetails[batchNo] = basicDetailsData;

        nextAction[batchNo] = "WAREHOUSER";
        return batchNo;
    }

    /* Set Warehouser */
    function setWarehouser(
        address batchNo,
        string memory _vaccineName,
        uint256 _quantity,
        uint256 _price,
        uint256 _storageDate,
        string memory _optimumRangeTemp,
        string memory _optimumRangeHum,
        bool _isViolation
    ) public onlyAuthCaller returns (bool) {
        warehouserData.vaccineName = _vaccineName;
        warehouserData.quantity = _quantity;
        warehouserData.price = _price;
        warehouserData.storageDate = _storageDate;
        warehouserData.optimumRangeTemp = _optimumRangeTemp;
        warehouserData.optimumRangeHum = _optimumRangeHum;
        warehouserData.isViolation = _isViolation;

        batchWarehouser[batchNo] = warehouserData;

        nextAction[batchNo] = "DISTRIBUTOR";

        return true;
    }

    /* Get Warehouser */
    function getWarehouserData(address batchNo)
        public
        view
        returns (
            string memory vaccineName,
            uint256 quantity,
            uint256 price,
            uint256 storageDate,
            string memory optimumRangeTemp,
            string memory optimumRangeHum,
            bool isViolation
        )
    {
        warehouser memory tmpData = batchWarehouser[batchNo];

        return (
            tmpData.vaccineName,
            tmpData.quantity,
            tmpData.price,
            tmpData.storageDate,
            tmpData.optimumRangeTemp,
            tmpData.optimumRangeHum,
            tmpData.isViolation
        );
    }

    /* Set Distributor */
    function setDistributor(
        address batchNo,
        string memory _destinationAddress,
        string memory _shippingName,
        uint256 _quantity,
        uint256 _departureDateTime,
        uint256 _estimateDateTime,
        string memory _optimumRangeTemp,
        string memory _optimumRangeHum
    ) public onlyAuthCaller returns (bool) {
        distributorData.destinationAddress = _destinationAddress;
        distributorData.shippingName = _shippingName;
        distributorData.quantity = _quantity;
        distributorData.departureDateTime = _departureDateTime;
        distributorData.estimateDateTime = _estimateDateTime;
        distributorData.optimumRangeTemp = _optimumRangeTemp;
        distributorData.optimumRangeHum = _optimumRangeHum;
        batchDistributor[batchNo] = distributorData;

        nextAction[batchNo] = "VACCINATION_STATION";

        return true;
    }

    /* Get Distributor Data */
    function getDistributorData(address batchNo)
        public
        view
        returns (
            string memory destinationAddress,
            string memory shippingName,
            uint256 quantity,
            uint256 departureDateTime,
            uint256 estimateDateTime,
            string memory optimumRangeTemp,
            string memory optimumRangeHum
        )
    {
        distributor memory tmpData = batchDistributor[batchNo];

        return (
            tmpData.destinationAddress,
            tmpData.shippingName,
            tmpData.quantity,
            tmpData.departureDateTime,
            tmpData.estimateDateTime,
            tmpData.optimumRangeTemp,
            tmpData.optimumRangeHum
        );
    }

    /* Set Vaccination Station */
    function setVaccinationStation(
        address batchNo,
        uint256 _quantity,
        uint256 _arrivalDateTime,
        uint256 _vaccinationStationId,
        string memory _shippingName,
        string memory _shippingNo,
        string memory _locationAddress
    ) public onlyAuthCaller returns (bool) {
        vaccinationStationData.quantity = _quantity;
        vaccinationStationData.arrivalDateTime = _arrivalDateTime;
        vaccinationStationData.vaccinationStationId = _vaccinationStationId;
        vaccinationStationData.shippingName = _shippingName;
        vaccinationStationData.shippingNo = _shippingNo;
        vaccinationStationData.locationAddress = _locationAddress;

        batchVaccinationStation[batchNo] = vaccinationStationData;

        nextAction[batchNo] = "OBJECT_INJECTION";

        return true;
    }

    /* Get Vaccination Station Data */
    function getVaccinationStationData(address batchNo)
        public
        view
        returns (
            uint256 quantity,
            uint256 arrivalDateTime,
            uint256 vaccinationStationId,
            string memory shippingName,
            string memory shippingNo,
            string memory locationAddress
        )
    {
        vaccinationStation memory tmpData = batchVaccinationStation[batchNo];

        return (
            tmpData.quantity,
            tmpData.arrivalDateTime,
            tmpData.vaccinationStationId,
            tmpData.shippingName,
            tmpData.shippingNo,
            tmpData.locationAddress
        );
    }

    /* Set Vaccinated Person*/
    function setObjectInjection(
        address batchNo,
        string memory _personName,
        uint256 _age,
        uint256 _identityCard,
        uint256 _numberOfVaccinations,
        uint256 _vaccinationDate,
        string memory _typeOfVaccine,
        string memory _phoneNumber
    ) public onlyAuthCaller returns (bool) {
        vaccinatedPersonData.personName = _personName;
        vaccinatedPersonData.age = _age;
        vaccinatedPersonData.identityCard = _identityCard;
        vaccinatedPersonData.numberOfVaccinations = _numberOfVaccinations;
        vaccinatedPersonData.vaccinationDate = _vaccinationDate;
        vaccinatedPersonData.typeOfVaccine = _typeOfVaccine;
        vaccinatedPersonData.phoneNumber = _phoneNumber;

        batchVaccinatedPerson[batchNo] = vaccinatedPersonData;

        nextAction[batchNo] = "DONE";

        return true;
    }

    /* Get Vaccinated Person Data */
    function getVaccinationPersonData(address batchNo)
        public
        view
        returns (
            string memory personName,
            uint256 age,
            uint256 identityCard,
            uint256 numberOfVaccinations,
            uint256 vaccinationDate,
            string memory typeOfVaccine,
            string memory phoneNumber
        )
    {
        vaccinatedPerson memory tmpData = batchVaccinatedPerson[batchNo];

        return (
            tmpData.personName,
            tmpData.age,
            tmpData.identityCard,
            tmpData.numberOfVaccinations,
            tmpData.vaccinationDate,
            tmpData.typeOfVaccine,
            tmpData.phoneNumber
        );
    }
}
