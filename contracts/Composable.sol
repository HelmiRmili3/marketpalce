// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Composable is ERC1155, Ownable {
    using SafeMath for uint256;
    uint256 compositionCount;
    uint256 collectionCount;
    uint256 public _RequestsCounter;

    struct ComposedToken {
        uint256 id;
        string collection;
        address owner;
        address buyer;
        uint256 date;
        bool deleted;
        uint256 price;
        uint256[] nfts;
    }

    struct Request {
        string collection;
        uint256 id;
        uint256[] ids;
        uint256 date;
        uint256 period;
        uint256 price;
        address buyer;
        address seller;
        bool isSeenBySeller;
        bool isAcceptedBySeller;
        bool isSeenByBuyer;
        bool isPayedByBuyer;
    }
    struct LabRequest {
        string name;
        address buyer;
        address owner;
        uint256 price;
        uint256 period;
        uint256[] nfts;
    }

    //mapping for requests
    mapping(uint256 => Request) public requests;
    mapping(address => uint256[]) private requestPerUser;

    mapping(address => ComposedToken[]) private _tokenComposition;
    //mapping to track users request count
    mapping(address => bool) public labs;

    constructor() ERC1155("") {}

    function toggleTrue(address _lab) public onlyOwner {
        labs[_lab] = true;
    }

    function toggleFalse(address _lab) public onlyOwner {
        labs[_lab] = false;
    }

    //get all the composed nfts if the composed nft is disponible
    function getComposition() public view returns (ComposedToken[] memory) {
        ComposedToken[] memory list = _tokenComposition[msg.sender];
        uint256 l = getlength();
        ComposedToken[] memory newList = new ComposedToken[](l);
        for (uint256 i = 0; i < l; i++) {
            if (!list[i].deleted) {
                newList[i] = list[i];
            }
        }
        return newList;
    }

    //get the length of disponsible composed nfts
    function getlength() public view returns (uint256) {
        uint256 count = 0;
        ComposedToken[] memory list = _tokenComposition[msg.sender];
        for (uint256 i = 0; i < list.length; i++) {
            if (list[i].deleted || block.timestamp > list[i].date) {
                list[i].deleted = false;
            } else {
                count++;
            }
        }
        return count;
    }

    //add request to buy list of nfts per user
    function addBuyRequest(LabRequest[] memory orders) public {
        require(labs[msg.sender] != true, "You are blocked form buying nfts");
        for (uint256 i = 0; i < orders.length; i++) {
            Request memory dataStruct = Request({
                collection: orders[i].name,
                id: _RequestsCounter,
                ids: orders[i].nfts,
                date: block.timestamp,
                buyer: orders[i].buyer,
                period: orders[i].period,
                price: orders[i].price,
                seller: orders[i].owner,
                isSeenBySeller: false,
                isAcceptedBySeller: false,
                isSeenByBuyer: false,
                isPayedByBuyer: false
            });
            requests[_RequestsCounter] = dataStruct;
            requestPerUser[msg.sender].push(_RequestsCounter);
            requestPerUser[orders[i].owner].push(_RequestsCounter);
            _RequestsCounter++;
        }
    }

    //reject/accept request
    function rejectAndAcceptRequest(uint256 id, bool accept) public {
        require(
            !requests[id].isSeenBySeller,
            "You can't allready seen this request."
        );
        requests[id].isSeenBySeller = true;
        requests[id].isAcceptedBySeller = accept;
    }

    //reject Payment
    function rejectPayment(uint256 id) public {
        require(
            !requests[id].isSeenByBuyer,
            "You can't allready seen this request."
        );
        require(
            requests[id].isAcceptedBySeller,
            "You can't reject non accepted request"
        );

        requests[id].isSeenByBuyer = true;
        requests[id].isPayedByBuyer = false;
    }

    //accept Payment and add compsable nft to the list of composable nfts for the buyer
    function acceptPayment(uint256 id) public payable {
        require(
            !requests[id].isSeenByBuyer,
            "You can't allready seen this request."
        );

        require(
            requests[id].isAcceptedBySeller,
            "You can't pay for non accepted request"
        );
        requests[id].isSeenByBuyer = true;
        requests[id].isPayedByBuyer = true;
        ComposedToken memory data = ComposedToken({
            id: requests[id].id,
            collection: requests[id].collection,
            owner: requests[id].seller,
            buyer: requests[id].buyer,
            date: block.timestamp + requests[id].period,
            price: requests[id].price,
            nfts: requests[id].ids,
            deleted: false
        });
        _tokenComposition[msg.sender].push(data);
        payable(requests[id].seller).transfer(requests[id].price);
        _mint(msg.sender, compositionCount, 1, "");
        compositionCount++;
    }

    function getRequests() public view returns (Request[] memory) {
        uint256[] memory RequestIds = requestPerUser[msg.sender];
        uint256 l = RequestIds.length;
        Request[] memory result = new Request[](l);
        for (uint256 i = 0; i < l; i++) {
            result[i] = requests[RequestIds[i]];
        }
        return result;
    }
}
