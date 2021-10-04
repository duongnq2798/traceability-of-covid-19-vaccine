// SPPDX-Licence-Identifier: NFT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    // _tokenIds -> 0
    // _tokenIds.increment();
    // _tokenIds -> +1
    address contractAddress;

    // ERC721 ( // Token name, // Token symbol)
    constructor(address _contractAddress)
        ERC721("SUPPLY CHAIN COVID-19 VACCINES NFT ", "SCC19")
    {
        contractAddress = _contractAddress;
    }

    function createToken(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        /**
         * @dev Mints `tokenId` and transfers it to `to`.
         *
         * WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible
         * @Params : (address to, uint256 tokenId)
         * Requirements:
         *
         * - `tokenId` must not exist.
         * - `to` cannot be the zero address.
         *
         * Emits a {Transfer} event.
         */
        _mint(msg.sender, newItemId);

        /**
         * @dev Sets `_tokenURI` as the tokenURI of `tokenId`.
         *
         * @Params (uint256 tokenId, string memory _tokenURI)
         * Requirements:
         *
         * - `tokenId` must exist.
         */
        _setTokenURI(newItemId, tokenURI);

        /**
         * @dev See {IERC721-setApprovalForAll}.
         * @Params (address operator, bool approved)
         */
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }
}
