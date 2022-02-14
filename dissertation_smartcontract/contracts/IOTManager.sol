//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CloneFactory.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract IoTManager is Ownable {
    address public marketplaceContract;
    address public factoryContract;
    address public buyToken;

    string public nodeName;
    string public locationAddress;
    string public nodeHash;
    uint256 public quantitySensor;
    string public typeNode;

    address public deployerAddress;

    mapping(address => bool) public whiteList;

    // MODIFIERS
    modifier onlyDeployer() {
        require(
            _msgSender() == deployerAddress,
            "Ownable: caller is not in the author"
        );
        _;
    }

    function addNode(
        string memory _nodeName,
        string memory _locationAddress,
        uint256 _quantitySensor,
        string memory _typeNode,
        address _deployerAddress
    ) public  {
        deployerAddress = _deployerAddress;
        nodeName = _nodeName;
        locationAddress = _locationAddress;
        quantitySensor = _quantitySensor;
        typeNode = _typeNode;
    }

    function getNode()
        public
        view
        returns (
            string memory _nodeName,
            string memory _locationAddress,
            uint256 _quantitySensor,
            string memory _typeNode
        )
    {
        return (nodeName, locationAddress, quantitySensor, typeNode);
    }

    function addWhiteList(address _userAddress) external onlyDeployer {
        whiteList[_userAddress] = true;
    }

    function removeAuthor(address _userAddress) external onlyDeployer {
        whiteList[_userAddress] = false;
    }

    function isAuthor(address _userAddress) external view returns (bool) {
        return whiteList[_userAddress];
    }
}
