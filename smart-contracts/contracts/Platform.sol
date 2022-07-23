// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";
import "./NFTWarranty.sol";

contract Platform is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _warrantyItemId;

    struct Warranty {
        uint256 _warrantyItemId;
        uint tokenId;
        address nftContract;
        address payable owner;
    }

    mapping(uint => Warranty) public itemIdToWarranty;

    event Generated(
        uint256 _warrantyItemId,
        uint tokenId,
        address indexed nftContract,
        address indexed owner // removeable index
    );

    constructor() {}

    function createWarranty(address _nftContractAddress, string memory _tokenMetaDataURI, address _owner) external nonReentrant {
        
        // counters
        _warrantyItemId.increment();
        uint256 newWarrantyItemId = _warrantyItemId.current();

        NFTWarranty newWarranty = NFTWarranty(_nftContractAddress);
        uint256 tokenId = newWarranty.mint(_tokenMetaDataURI);

        newWarranty.transferWarranty(address(this), _owner, tokenId);

        itemIdToWarranty[newWarrantyItemId] = Warranty (
            newWarrantyItemId,
            tokenId,
            _nftContractAddress,
            payable(_owner)
        );

        emit Generated(
            newWarrantyItemId,
            tokenId,
            _nftContractAddress,
            _owner
        );
    }

    // fetch
    function fetchMyNFTs() public view returns (Warranty[] memory) {
        uint256 totalItemCount = _warrantyItemId.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (itemIdToWarranty[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        Warranty[] memory items = new Warranty[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (itemIdToWarranty[i + 1].owner == msg.sender) {
                uint256 currentId = itemIdToWarranty[i + 1]._warrantyItemId;
                Warranty storage currentItem = itemIdToWarranty[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }
}

