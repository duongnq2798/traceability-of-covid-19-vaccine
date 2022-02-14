//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract VaccineManager is Ownable {
/*  Smart contract                       
    Vaccine Supply chain Contract V1	     ===> VSCC_V1
    Vaccine Supply chain Contract V2	     ===> VSCC_V2
    Vaccine User Extend V1                   ===> VUE_V1
    Vaccine User Extend V2                   ===> VUE_V2
    IOT Manager V1                           ===> IOTM_V1
    IOT Manager V2                           ===> IOTM_V2
    Vaccine System Storage V1                ===> VSS_V1
    Vaccine System Storage V2                ===> VSS_V2
*/

    address public deployerAddress;

    mapping(string => address) public vaccineSupplyChainList;
    mapping(string => address) public userExtendList;
    mapping(string => address) public IOTManagerList;
    mapping(string => address) public vaccineSystemStorageList;

    mapping(address => string[]) public vaccineSupplyChainVersionList;
    mapping(address => string[]) public userEntendVersionList;
    mapping(address => string[]) public IOTManagerVersionList;
    mapping(address => string[]) public systemStorageVersionList;

    string public currentSupplyChainVersion;
    string public currentUserExtendVersion;
    string public currentIOTManagerVersion;
    string public currentSystemStorageVersion;

    function addVaccineSupplyChain(address _contractAddress, string memory _version) external onlyOwner {
        vaccineSupplyChainList[_version] = _contractAddress;
        vaccineSupplyChainVersionList[owner()].push(_version);
    }

    function getSupplyChain(string memory _version) external view returns (address) {
        return vaccineSupplyChainList[_version];
    }

    function getSupplyChainVersion(address _ownerAddress) public view returns (string[] memory) {
        return vaccineSupplyChainVersionList[_ownerAddress];
    }

    function setcurrentSupplyChainVersion (string memory _version) external onlyOwner {
        currentSupplyChainVersion = _version;
    }

    function getcurrentSupplyChainVersion () public view returns (string memory) {
        return currentSupplyChainVersion;
    }

    function addUserExtendContract(address _contractAddress, string memory _version) external onlyOwner {
        userExtendList[_version] = _contractAddress;
        userEntendVersionList[owner()].push(_version);
    }

    function getUserExtend(string memory _version) external view returns (address) {
        return userExtendList[_version];
    }

    function getUserExtendVersion(address _ownerAddress) public view returns (string[] memory) {
        return userEntendVersionList[_ownerAddress];
    }

    function setcurrentUserExtendVersion (string memory _version) external onlyOwner {
        currentUserExtendVersion = _version;
    }

    function getcurrentUserExtendVersion() public view returns (string memory) {
        return currentUserExtendVersion;
    }

    function addIOTManager(address _contractAddress, string memory _version) external onlyOwner {
        IOTManagerList[_version] = _contractAddress;
        IOTManagerVersionList[owner()].push(_version);
    }

    function getIOTManager(string memory _version) external view returns (address) {
        return IOTManagerList[_version];
    }

    function getIOTManageVersion(address _ownerAddress) public view returns (string[] memory) {
        return IOTManagerVersionList[_ownerAddress];
    }

    function setcurrentIOTManagerVersion (string memory _version) external onlyOwner {
        currentIOTManagerVersion = _version;
    }

    function getcurrentIOTManagerVersion () public view returns (string memory) {
        return currentIOTManagerVersion;
    }

    function addSystemStorageContract(address _contractAddress, string memory _version) external onlyOwner {
        vaccineSystemStorageList[_version] = _contractAddress;
        systemStorageVersionList[owner()].push(_version);
    }

    function getSystemStorageContract(string memory _version) external view returns (address) {
        return vaccineSystemStorageList[_version];
    }

    function getSystemStorageVersion(address _ownerAddress) public view returns (string[] memory) {
        return systemStorageVersionList[_ownerAddress];
    }

    function setcurrentSystemStorageVersion (string memory _version) external onlyOwner {
        currentSystemStorageVersion = _version;
    }

    function getcurrentSystemStorageVersion () public view returns (string memory) {
        return currentSystemStorageVersion;
    }

    function setDeployerAddress(address _deployerAddress) public onlyOwner {
        deployerAddress = _deployerAddress;
    }

    function getDeployerAddress() public view returns(address) {
        return deployerAddress;
    }
}