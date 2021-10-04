// contracts/Market.sol
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFTWarehouse is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsExport;

    address payable warehouseOwner;
    uint256 vaccinePrice = 0.025 ether;

    constructor() {
        warehouseOwner = payable(msg.sender);
    }

    struct VaccineItem {
        uint256 itemId;
        uint256 temperature;
        uint256 humidity;
        address nftContract;
        uint256 tokenId;
        address payable producer;
        address payable warehouseOwner;
        uint256 price;
        bool isViolate;
        bool isExport;
    }

    mapping(uint256 => VaccineItem) private idToVaccineItem;

    // 3 indexed arguments for event.
    event MarketItemCreated(
        uint256 indexed itemId,
        uint256 temperature,
        uint256 humidity,
        address indexed nftContract,
        uint256 indexed tokenId,
        address payable producer,
        address payable warehouseOwner,
        uint256 price,
        bool isViolate,
        bool isExport
    );

    /* Returns the listing price of the contract */
    function getVaccinePrice() public view returns (uint256) {
        return vaccinePrice;
    }

    /*  Create Vaccient Item*/
    function createVaccineItem(
        address nftContract,
        uint256 tokenId,
        uint256 price,
        uint256 temperature,
        uint256 humidity,
        bool isViolate,
        bool isExport
    ) public payable nonReentrant {
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value == vaccinePrice,
            "Price must be equal to vaccine price"
        );

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idToVaccineItem[itemId] = VaccineItem(
            itemId,
            temperature,
            humidity,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            isViolate,
            isExport
        );

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            itemId,
            temperature,
            humidity,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            isViolate,
            isExport
        );
    }

    function createDistribute(address nftContract, uint256 itemId)
        public
        payable
        nonReentrant
    {
        uint256 price = idToVaccineItem[itemId].price;
        uint256 tokenId = idToVaccineItem[itemId].tokenId;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the export"
        );

        idToVaccineItem[itemId].producer.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        idToVaccineItem[itemId].warehouseOwner = payable(msg.sender);
        idToVaccineItem[itemId].isExport = true;
        _itemsExport.increment();
        payable(warehouseOwner).transfer(vaccinePrice);
    }
}
