// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MedicalNFT is ERC721 ,Ownable {
    uint256 public _tokenIdCounter;
    uint256 public _buyRequestsCounter;
    uint256 public _blockedCounter;

    mapping(uint256 => MedicalData) private _tokenData;
    mapping(address => BuyRequest[]) private _buyRequests;
    mapping(uint256 => Patient) public _blocked;

    struct Patient {
        address _address;
        bool _isblocked;
    }

    struct MedicalData {
        uint256 tokenId;
        string name;
        address owner;
        uint256 date;
        uint256 price;
        string data;
        address[] buyers;
        uint256 period;
    }

    struct BuyRequest {
        address buyer;
        address owner;
        uint256 tokenId;
        uint256 date;
        bool isCompleted;
        bool isAccepted;
    }



    constructor() ERC721("MedicalNFT", "MED") {}


    function toggleBlock(address _patient) public onlyOwner {
         for (uint256 i = 0; i < _blockedCounter; i++){
             if(_blocked[i]._address == _patient){
                 _blocked[i]._isblocked = !_blocked[i]._isblocked;
             }
         }
    }

    function _isblocked(address _patient) private view returns (bool) {
        for (uint256 i = 0; i < _blockedCounter; i++) {
            if (
                _blocked[i]._address == _patient &&
                _blocked[i]._isblocked == true
            ) {
                return true;
            }
        }
        return false;
    }

    function _isBuyer(uint256 _tokenId, address _buyer)
        private
        view
        returns (bool)
    {
        for (uint256 i = 0; i < _tokenData[_tokenId].buyers.length; i++) {
            if (_tokenData[_tokenId].buyers[i] == _buyer) {
                return true;
            }
        }
        return false;
    }

    function _isOwner(uint256 _tokenId, address _owner)
        private
        view
        returns (bool)
    {
        if (_tokenData[_tokenId].owner == _owner) {
            return true;
        }
        return false;
    }

    function _isBuyRequestExists(uint256 _tokenId, address _buyer)
        private
        view
        returns (bool)
    {
        address _owner = _tokenData[_tokenId].owner;
        BuyRequest[] storage requests = _buyRequests[_owner];
        for (uint256 i = 0; i < requests.length; i++) {
            if (
                requests[i].buyer == _buyer &&
                requests[i].tokenId == _tokenId &&
                requests[i].isCompleted == false
            ) {
                return true;
            }
        }
        return false;
    }

    function addBuyRequest(uint256 _tokenId) public {
        require(
            !_isOwner(_tokenId, msg.sender),
            "Owner of the NFT cant make request"
        );
        require(
            !_isBuyer(_tokenId, msg.sender),
            "This nft is Allready been bot"
        );
        require(
            !_isBuyRequestExists(_tokenId, msg.sender),
            "This request allready exist"
        );
        address _owner = _tokenData[_tokenId].owner;

        BuyRequest memory dataStruct = BuyRequest({
            buyer: msg.sender,
            owner: _owner,
            tokenId: _tokenId,
            date: block.timestamp,
            isCompleted: false,
            isAccepted: false
        });

        _buyRequests[_owner].push(dataStruct);
        _buyRequestsCounter++;
    }

    function approveBuyRequest(address _buyer, uint256 _tokenId)
        public
        payable
    {
        require(
            _isBuyRequestExists(_tokenId, _buyer),
            "Buy request does not exist"
        );
        for (uint256 i = 0; i < _buyRequests[msg.sender].length; i++) {
            if (
                _buyRequests[msg.sender][i].buyer == _buyer &&
                _buyRequests[msg.sender][i].tokenId == _tokenId
            ) {
                _buyRequests[msg.sender][i].isAccepted = true;
                _buyRequests[msg.sender][i].isCompleted = true;
                payable(_tokenData[_tokenId].owner).transfer(
                    _tokenData[_tokenId].price
                ); // send ETH to owner
                _tokenData[_tokenId].buyers.push(_buyer);
                break;
            }
        }
    }

    function rejectBuyRequest(address _buyer, uint256 _tokenId) public {
        require(
            _isBuyRequestExists(_tokenId, _buyer),
            "Buy request does not exist"
        );
        for (uint256 i = 0; i < _buyRequests[msg.sender].length; i++) {
            if (
                _buyRequests[msg.sender][i].buyer == _buyer &&
                _buyRequests[msg.sender][i].tokenId == _tokenId
            ) {
                _buyRequests[msg.sender][i].isAccepted = false;
                _buyRequests[msg.sender][i].isCompleted = true;
                break;
            }
        }
    }

    function mint(
        string memory name,
        uint256 price,
        string memory data,
        uint256 period
    ) public {
        require(
            !_isblocked(msg.sender),
            "This user is blocked for minting nfts"
        );
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(data).length > 0, "Data cannot be empty");
        require(price > 0, "Price must be greater than zero");

        _safeMint(msg.sender, _tokenIdCounter);

        MedicalData memory dataStruct = MedicalData({
            tokenId: _tokenIdCounter,
            name: name,
            owner: msg.sender,
            date: block.timestamp,
            price: price,
            data: data,
            buyers: new address[](0),
            period: period
        });

        _tokenData[_tokenIdCounter] = dataStruct;
        _tokenIdCounter++;


        Patient memory patientdata = Patient({
            _address : msg.sender,
            _isblocked : false 
        });

        _blocked[_blockedCounter] =  patientdata;
        _blockedCounter++;
        
    }

    function getTokenData(uint256 tokenId)
        public
        view
        returns (MedicalData memory)
    {
        require(_exists(tokenId), "Token does not exist");
        return _tokenData[tokenId];
    }

    function getBuyRequests() public view returns (BuyRequest[] memory) {
        BuyRequest[] memory requests = new BuyRequest[](0);
        if (_buyRequests[msg.sender].length > 0) {
            requests = _buyRequests[msg.sender];
            return requests;
        } else {
            return requests;
        }
    }
}
