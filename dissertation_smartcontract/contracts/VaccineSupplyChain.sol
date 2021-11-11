// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./VaccineSystemStorage.sol";
import "./Ownable.sol";

contract VaccineSupplyChain is Ownable {
    event CompleteBasicDetail(address indexed user, address indexed batchNo);
    event CompleteWarehouser(address indexed user, address indexed batchNo);
    event CompleteDistributor(address indexed user, address indexed batchNo);
    event CompleteVaccinationStation(
        address indexed user,
        address indexed batchNo
    );
    event CompleteVaccinatePerson(
        address indexed user,
        address indexed batchNo
    );

    /* Declare Modifier */
    modifier isValidPerformer(address batchNo, string memory role) {
        require(
            keccak256(
                abi.encodePacked(vaccineSystemStorage.getUserRole(msg.sender))
            ) == keccak256(abi.encodePacked(role))
        );
        require(
            keccak256(
                abi.encodePacked(vaccineSystemStorage.getNextAction(batchNo))
            ) == keccak256(abi.encodePacked(role))
        );
        _;
    }

    modifier onlyProducer(string memory role) {
        require(
            keccak256(
                abi.encodePacked(vaccineSystemStorage.getUserRole(msg.sender))
            ) == keccak256(abi.encodePacked(role))
        );
        _;
    }

    modifier onlyObjectInjection(string memory role) {
        require(
            keccak256(
                abi.encodePacked(vaccineSystemStorage.getUserRole(msg.sender))
            ) == keccak256(abi.encodePacked(role))
        );
        _;
    }

    /* Storage Variables */
    VaccineSystemStorage vaccineSystemStorage;

    constructor(address _vaccineSystemAddress) public {
        vaccineSystemStorage = VaccineSystemStorage(_vaccineSystemAddress);
    }

    function getBalance() public view returns (uint256) {
        return (address(this).balance);
    }

    /* Get Next Action */

    function getNextAction(address _batchNo)
        public
        view
        returns (string memory action)
    {
        (action) = vaccineSystemStorage.getNextAction(_batchNo);
        return (action);
    }

    /* Get Basic Details */
    function getBasicDetailsData(address _batchNo)
        public
        view
        returns (
            string memory producerName,
            uint256 quantity,
            string memory optimumRangeTemp,
            string memory optimumRangeHum
        )
    {
        /* Call Storage Contract */
        (
            producerName,
            quantity,
            optimumRangeTemp,
            optimumRangeHum
        ) = vaccineSystemStorage.getBasicDetails(_batchNo);
        return (
            producerName,
            quantity,
            optimumRangeTemp,
            optimumRangeHum
        );
    }

    /* Add Basic Details */
    function addBasicDetails(
        string memory _producerName,
        uint256 _quantity,
        string memory _optimumRangeTemp,
        string memory _optimumRangeHum
    ) public onlyProducer("PRODUCER") returns (address) {
        address batchNo = vaccineSystemStorage.setBasicDetails(
            _producerName,
            _quantity,
            _optimumRangeTemp,
            _optimumRangeHum
        );

        /* Call Emit Event */
        emit CompleteBasicDetail(msg.sender, batchNo);

        return batchNo;
    }

    /* Get Warehouser */
    function getWarehouserData(address _batchNo)
        public
        view
        returns (
            string memory vaccineName,
            uint256 quantity,
            uint256 storageDate,
            string memory optimumRangeTemp,
            string memory optimumRangeHum,
            bool isViolation
        )
    {
        /* Call Storage Contract */
        (
            vaccineName,
            quantity,
            storageDate,
            optimumRangeTemp,
            optimumRangeHum,
            isViolation
        ) = vaccineSystemStorage.getWarehouserData(_batchNo);
        return (
            vaccineName,
            quantity,
            storageDate,
            optimumRangeTemp,
            optimumRangeHum,
            isViolation
        );
    }

    /* Update Warehouser */
    function updateWarehouser(
        address _batchNo,
        string memory _vaccineName,
        uint256 _quantity,
        uint256 _storageDate,
        string memory _optimumRangeTemp,
        string memory _optimumRangeHum,
        bool _isViolation
    ) public isValidPerformer(_batchNo, "WAREHOUSER") returns (bool) {
        bool status = vaccineSystemStorage.setWarehouser(
            _batchNo,
            _vaccineName,
            _quantity,
            _storageDate,
            _optimumRangeTemp,
            _optimumRangeHum,
            _isViolation
        );

        emit CompleteWarehouser(msg.sender, _batchNo);
        return (status);
    }

    /* Get Distributor */
    function getDistributorData(address _batchNo)
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
        /* Call Storage Contract */
        (
            destinationAddress,
            shippingName,
            quantity,
            departureDateTime,
            estimateDateTime,
            optimumRangeTemp,
            optimumRangeHum
        ) = vaccineSystemStorage.getDistributorData(_batchNo);
        return (
            destinationAddress,
            shippingName,
            quantity,
            departureDateTime,
            estimateDateTime,
            optimumRangeTemp,
            optimumRangeHum
        );
    }

    /* Update Distributor */
    function updateDistributorData(
        address _batchNo,
        string memory _destinationAddress,
        string memory _shippingName,
        uint256 _quantity,
        uint256 _departureDateTime,
        uint256 _estimateDateTime,
        string memory _optimumRangeTemp,
        string memory _optimumRangeHum
    ) public isValidPerformer(_batchNo, "DISTRIBUTOR") returns (bool) {
        bool status = vaccineSystemStorage.setDistributor(
            _batchNo,
            _destinationAddress,
            _shippingName,
            _quantity,
            _departureDateTime,
            _estimateDateTime,
            _optimumRangeTemp,
            _optimumRangeHum
        );
        emit CompleteDistributor(msg.sender, _batchNo);

        return (status);
    }

    /* Get Vaccination Station */
    function getVaccinationStation(address _batchNo)
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
        /* Call Storage Contract */
        (
            quantity,
            arrivalDateTime,
            vaccinationStationId,
            shippingName,
            shippingNo,
            locationAddress
        ) = vaccineSystemStorage.getVaccinationStationData(_batchNo);

        return (
            quantity,
            arrivalDateTime,
            vaccinationStationId,
            shippingName,
            shippingNo,
            locationAddress
        );
    }

    /* Update Vaccination Station */
    function updateVaccinationStation(
        address _batchNo,
        uint256 _quantity,
        uint256 _arrivalDateTime,
        uint256 _vaccinationStationId,
        string memory _shippingName,
        string memory _shippingNo,
        string memory _locationAddress
    ) public isValidPerformer(_batchNo, "VACCINATION_STATION") returns (bool) {
        bool status = vaccineSystemStorage.setVaccinationStation(
            _batchNo,
            _quantity,
            _arrivalDateTime,
            _vaccinationStationId,
            _shippingName,
            _shippingNo,
            _locationAddress
        );

        /* Emit Event */
        emit CompleteVaccinationStation(msg.sender, _batchNo);
        return (status);
    }

    /* Get Vaccinate Person Data */
    function getVaccinateData(address _batchNo)
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
        /* Call Storage Contract */
        (
            personName,
            age,
            identityCard,
            numberOfVaccinations,
            vaccinationDate,
            typeOfVaccine,
            phoneNumber
        ) = vaccineSystemStorage.getVaccinationPersonData(_batchNo);

        return (
            personName,
            age,
            identityCard,
            numberOfVaccinations,
            vaccinationDate,
            typeOfVaccine,
            phoneNumber
        );
    }

    /* Update Vaccinate Person */
    function updateVaccinatePerson(
        address _batchNo,
        string memory _personName,
        uint256 _age,
        uint256 _identityCard,
        uint256 _numberOfVaccinations,
        uint256 _vaccinationDate,
        string memory _typeOfVaccine,
        string memory _phoneNumber
    ) public onlyObjectInjection("OBJECT_INJECTION") returns (bool) {
        bool status = vaccineSystemStorage.setObjectInjection(
            _batchNo,
            _personName,
            _age,
            _identityCard,
            _numberOfVaccinations,
            _vaccinationDate,
            _typeOfVaccine,
            _phoneNumber
        );

        /* Emit Event */
        emit CompleteVaccinatePerson(msg.sender, _batchNo);
        return (status);
    }
}
