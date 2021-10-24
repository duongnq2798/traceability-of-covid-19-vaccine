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

    /* Storage Variables */
    VaccineSystemStorage vaccineSystemStorage;

    constructor(address _vaccineSystemAddress) public {
        vaccineSystemStorage = VaccineSystemStorage(_vaccineSystemAddress);
    }

    function getBalance() public returns (uint256) {
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
            string memory storageName,
            string memory distributorName,
            string memory vaccinationStationName,
            uint256 totalWeight
        )
    {
        /* Call Storage Contract */
        (
            producerName,
            storageName,
            distributorName,
            vaccinationStationName,
            totalWeight
        ) = vaccineSystemStorage.getBasicDetails(_batchNo);
        return (
            producerName,
            storageName,
            distributorName,
            vaccinationStationName,
            totalWeight
        );
    }

    /* Add Basic Details */
    function addBasicDetails(
        string memory _producerName,
        string memory _storageName,
        string memory _distributorName,
        string memory _vaccinationStationName,
        uint256 _totalWeight
    ) public onlyOwner returns (address) {
        address batchNo = vaccineSystemStorage.setBasicDetails(
            _producerName,
            _storageName,
            _distributorName,
            _vaccinationStationName,
            _totalWeight
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
            uint256 price,
            uint256 optimumTemp,
            uint256 optimumHum,
            uint256 storageDate,
            bool isViolation
        )
    {
        /* Call Storage Contract */
        (
            vaccineName,
            quantity,
            price,
            optimumTemp,
            optimumHum,
            storageDate,
            isViolation
        ) = vaccineSystemStorage.getWarehouserData(_batchNo);
        return (
            vaccineName,
            quantity,
            price,
            optimumTemp,
            optimumHum,
            storageDate,
            isViolation
        );
    }

    /* Update Warehouser */
    function updateWarehouser(
        address _batchNo,
        string memory _vaccineName,
        uint256 _quantity,
        uint256 _price,
        uint256 _optimumTemp,
        uint256 _optimumHum,
        uint256 _storageDate,
        bool _isViolation
    ) public isValidPerformer(_batchNo, "WAREHOUSER") returns (bool) {
        bool status = vaccineSystemStorage.setWarehouser(
            _batchNo,
            _vaccineName,
            _quantity,
            _price,
            _storageDate,
            _optimumTemp,
            _optimumHum,
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
            string memory shippingName,
            string memory shippingNo,
            uint256 quantity,
            uint256 departureDateTime,
            uint256 estimateDateTime,
            uint256 distributorId,
            uint256 optimumTemp,
            uint256 optimumHum
        )
    {
        /* Call Storage Contract */
        (
            shippingName,
            shippingNo,
            quantity,
            departureDateTime,
            estimateDateTime,
            distributorId,
            optimumTemp,
            optimumHum
        ) = vaccineSystemStorage.getDistributorData(_batchNo);
        return (
            shippingName,
            shippingNo,
            quantity,
            departureDateTime,
            estimateDateTime,
            distributorId,
            optimumTemp,
            optimumHum
        );
    }

    /* Update Distributor */
    function updateDistributorData(
        address _batchNo,
        string memory _shippingName,
        string memory _shippingNo,
        uint256 _quantity,
        uint256 _departureDateTime,
        uint256 _estimateDateTime,
        uint256 _distributorId,
        uint256 _optimumTemp,
        uint256 _optimumHum
    ) public isValidPerformer(_batchNo, "DISTRIBUTOR") returns (bool) {
        bool status = vaccineSystemStorage.setDistributor(
            _batchNo,
            _shippingName,
            _shippingNo,
            _quantity,
            _departureDateTime,
            _estimateDateTime,
            _distributorId,
            _optimumTemp,
            _optimumHum
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
            string memory shippingNo
        )
    {
        /* Call Storage Contract */
        (
            quantity,
            arrivalDateTime,
            vaccinationStationId,
            shippingName,
            shippingNo
        ) = vaccineSystemStorage.getVaccinationStationData(_batchNo);

        return (
            quantity,
            arrivalDateTime,
            vaccinationStationId,
            shippingName,
            shippingNo
        );
    }

    /* Update Vaccination Station */
    function updateVaccinationStation(
        address _batchNo,
        uint256 _quantity,
        uint256 _arrivalDateTime,
        uint256 _vaccinationStationId,
        string memory _shippingName,
        string memory _shippingNo
    ) public isValidPerformer(_batchNo, "VACCINATION_STATION") returns (bool) {
        bool status = vaccineSystemStorage.setVaccinationStation(
            _batchNo,
            _quantity,
            _arrivalDateTime,
            _vaccinationStationId,
            _shippingName,
            _shippingNo
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
            uint256 typeOfVaccine
        )
    {
        /* Call Storage Contract */
        (
            personName,
            age,
            identityCard,
            numberOfVaccinations,
            vaccinationDate,
            typeOfVaccine
        ) = vaccineSystemStorage.getVaccinationPersonData(_batchNo);

        return (
            personName,
            age,
            identityCard,
            numberOfVaccinations,
            vaccinationDate,
            typeOfVaccine
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
        uint256 _typeOfVaccine
    ) public isValidPerformer(_batchNo, "DONE") returns (bool) {
        bool status = vaccineSystemStorage.setObjectInjection(
            _batchNo,
            _personName,
            _age,
            _identityCard,
            _numberOfVaccinations,
            _vaccinationDate,
            _typeOfVaccine
        );

        /* Emit Event */
        emit CompleteVaccinatePerson(msg.sender, _batchNo);
        return (status);
    }
}
