// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MedicalDataNFT is ERC721, Ownable {
    uint256 public _NftsCounter;
    uint256 public _RequestsCounter;
    struct User {
        address wallet;
        uint256 requests;
        uint256 nft;
        uint256 collection;
        bool enable;
    }
    struct NFT {
        uint256 id;
        string name;
        address owner;
        uint256 date;
        uint256 price;
        string data;
        address[] buyers;
    }
    struct Request {
        string collection;
        uint256 id;
        uint256[] ids;
        uint256 date;
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
        address owner;
        uint256[] nfts;
    }
    mapping(uint256 => NFT) private NFTs;
    mapping(address => User) public Users;
    mapping(address => uint256[]) public UsersNfts;
    mapping(address => mapping(uint256 => Request)) public Requests;
    mapping(address => mapping(string => uint256[])) public UsersCollections;

    constructor() ERC721("MedicalNFT", "MED") {}

    function getUserIds() public view returns (uint256[] memory) {
        return UsersNfts[msg.sender];
    }

    function getUserCollactions(
        string memory collection
    ) public view returns (uint256[] memory) {
        return UsersCollections[msg.sender][collection];
    }

    function toggleBlock(address _patient) public onlyOwner {
        Users[_patient].enable = !Users[_patient].enable;
    }

    function addUser() public {
        User memory data = User({
            wallet: msg.sender,
            requests: 0,
            nft: 0,
            collection: 0,
            enable: true
        });
        if (Users[msg.sender].enable || !(Users[msg.sender].enable)) {} else {
            Users[msg.sender] = data;
        }
    }

    function mint(
        string memory name,
        uint256 price,
        string memory data
    ) public {
        require(Users[msg.sender].enable, "You are blocked form minting");
        require(bytes(name).length > 0, "Name can't be empty");
        require(bytes(data).length > 0, "Data can't be empty");

        _safeMint(msg.sender, _NftsCounter);

        NFT memory dataStruct = NFT({
            id: _NftsCounter,
            name: name,
            owner: msg.sender,
            date: block.timestamp,
            price: price,
            data: data,
            buyers: new address[](0)
        });
        // Create new nft and add it to the list of the nfts.
        NFTs[_NftsCounter] = dataStruct;
        // Add the nft to the list of the nfts for this patient.
        UsersNfts[msg.sender].push(_NftsCounter);
        // add the nft to the collection nft for the user
        UsersCollections[msg.sender][name].push(_NftsCounter);
        //increment the nb of nfts for the patient
        Users[msg.sender].nft++;
        //increment the count of nfts
        _NftsCounter++;
    }

    function addBuyRequest(LabRequest[] memory requests) public {
        require(Users[msg.sender].enable, "You are blocked form buying nfts");
        for (uint256 i = 0; i < requests.length; i++) {
            uint256 buyerCounter = Users[msg.sender].requests;
            uint256 sellerCounter = Users[msg.sender].requests;
            uint256 total;
            for (uint256 j = 0; j < requests[i].nfts.length; j++) {
                total = total + NFTs[requests[i].nfts[j]].price;
            }
            Request memory dataStruct = Request({
                collection: requests[i].name,
                id: _RequestsCounter,
                ids: requests[i].nfts,
                date: block.timestamp,
                buyer: msg.sender,
                price: total,
                seller: requests[i].owner,
                isSeenBySeller: false,
                isAcceptedBySeller: false,
                isSeenByBuyer: false,
                isPayedByBuyer: false
            });
            Requests[msg.sender][buyerCounter] = dataStruct;
            Requests[requests[i].owner][sellerCounter] = dataStruct;
            Users[msg.sender].requests++;
            _RequestsCounter++;
        }
    }

    function approveBuyRequest(uint256 _id, bool accepted) public {
        require(
            Requests[msg.sender][_id].isAcceptedBySeller != true,
            "This request allready done"
        );
        address _buyer = Requests[msg.sender][_id].buyer;
        Requests[msg.sender][_id].isSeenBySeller = true;
        Requests[msg.sender][_id].isAcceptedBySeller = accepted;
        Requests[_buyer][_id].isSeenBySeller = true;
        Requests[_buyer][_id].isAcceptedBySeller = accepted;
    }

    function acceptPayment(uint256 _id) public {
        require(
            Requests[msg.sender][_id].isAcceptedBySeller == true,
            "This request allready rejected"
        );
        //get the seller address
        address _seller = Requests[msg.sender][_id].seller;
        //get the buyer category
        string memory collection = Requests[msg.sender][_id].collection;
        //send the payment amount to the seller
        payable(_seller).transfer(Requests[msg.sender][_id].price);

        // set the filds to true for the seller and the buyer
        Requests[msg.sender][_id].isSeenByBuyer = true;
        Requests[msg.sender][_id].isPayedByBuyer = true;
        Requests[_seller][_id].isSeenByBuyer = true;
        Requests[_seller][_id].isPayedByBuyer = true;
        uint256[] memory list = Requests[msg.sender][_id].ids;
        for (uint256 i = 0; i < list.length; i++) {
            // add the nfts to the collection of the nfts
            UsersCollections[msg.sender][collection].push(list[i]);
            UsersNfts[msg.sender].push(list[i]);
            Users[msg.sender].nft++;
            NFTs[list[i]].buyers.push(msg.sender);
        }
    }

    function rejectPayment(uint256 _id) public {
        require(
            Requests[msg.sender][_id].isAcceptedBySeller == true,
            "This request allready rejected"
        );
        address _seller = Requests[msg.sender][_id].seller;
        Requests[msg.sender][_id].isSeenByBuyer = true;
        Requests[msg.sender][_id].isPayedByBuyer = false;
        Requests[_seller][_id].isSeenByBuyer = true;
        Requests[_seller][_id].isPayedByBuyer = false;
    }

    function getNftData() public view returns (NFT[] memory) {
        NFT[] memory result = new NFT[](_NftsCounter);
        for (uint256 i = 0; i < _NftsCounter; i++) {
            NFT memory data = NFT({
                id: NFTs[i].id,
                name: NFTs[i].name,
                owner: NFTs[i].owner,
                date: NFTs[i].date,
                price: NFTs[i].price,
                data: NFTs[i].data,
                buyers: NFTs[i].buyers
            });
            result[i] = data;
        }
        return result;
    }
}
