//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./CloneFactory.sol";
import "./IOTManager.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

library ConvertType {
    function char(bytes1 b) private pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }

    function toAsciiString(address x) public pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint256 i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint256(uint160(x)) / (2**(8 * (19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2 * i] = char(hi);
            s[2 * i + 1] = char(lo);
        }
        return string(abi.encodePacked("0x", s));
    }
}

contract IoTFactory is Ownable, CloneFactory {
    IoTManager[] public iotManager;
    address public masterIoTManagerContract;
    address public deployerAddress;

    /* Storage Variables */
    IoTManager iotContract;

    constructor(address _masterIoTManagerContract) {
        masterIoTManagerContract = _masterIoTManagerContract;
    }

    mapping(address => string[]) public IOTManagerAddress;

    mapping(uint256 => address) public addresses;

    function initIOTManagerData(
        string memory _nodeName,
        string memory _locationAddress,
        uint256 _quantitySensor,
        string memory _typeNode
    ) external {
        IoTManager iot = IoTManager(createClone(masterIoTManagerContract));
        iot.addNode(_nodeName, _locationAddress, _quantitySensor, _typeNode, deployerAddress);

        iotManager.push(iot);
    }

    function getNode(address _IOTContractAddress)
        public
        view
        returns (
            string memory _nodeName,
            string memory _locationAddress,
            uint256 _quantitySensor,
            string memory _typeNode
        )
    {
        IoTManager iotSC = IoTManager(_IOTContractAddress);
        return iotSC.getNode();
    }

    function getAllNodes() external view returns (IoTManager[] memory) {
        return iotManager;
    }

    function setDeployerAddress(address _userAddress) external onlyOwner {
        deployerAddress = _userAddress;
    }
}
