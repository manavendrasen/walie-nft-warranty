// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";

contract NFTWarranty is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;

    constructor(address platformAddress) ERC721("NFT Warranty", "NFTW"){
        contractAddress = platformAddress;
    }

    function mint(string memory _tokenMetaDataURI) external returns(uint) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
 
        _mint(contractAddress, newTokenId);
        _setTokenURI(newTokenId, _tokenMetaDataURI);
 
        return newTokenId;
    }

    function transferWarranty(address from, address to, uint256 tokenId) external {
        require(ownerOf(tokenId) == from, "From address must be token owner");
        _transfer(from, to, tokenId);
    }

}

