// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

contract Platform is ReentrancyGuard {

    // Variables
    address payable public immutable platformAccount; // the account that receives fees
    uint public itemCount; 

    struct Item {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        address payable owner;
    }

    // itemId -> Item
    mapping(uint => Item) public items;

    event Generated(
        uint itemId,
        address indexed nft,
        uint tokenId,
        address indexed owner
    );

    constructor() {
        platformAccount = payable(address(this));
    }

    function generateAndTransferWarranty(IERC721 _nft, uint _tokenId, address _owner) external nonReentrant {
        // increment itemCount
        itemCount ++;
        // transfer nft
        _nft.transferFrom(address(this), _owner, _tokenId);
        // add new item to items mapping
        items[itemCount] = Item (
            itemCount,
            _nft,
            _tokenId,
            payable(_owner)
        );
        // emit Generated event
        emit Generated(
            itemCount,
            address(_nft),
            _tokenId,
            _owner
        );
    }
}