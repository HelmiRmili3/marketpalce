// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MedicalDataNFT is ERC721, Ownable {
    uint256 public _NftsCounter;
    struct NFT {
        uint256 id;
        string name;
        address owner;
        uint256 date;
        uint256 price;
        string data;
        uint256 birthday;
        string sexe;
    }

    //mapping for nfts
    mapping(uint256 => NFT) private NFTs;
    //mapping nfts per user
    mapping(address => uint256[]) public PatientNfts;

    //mapping for blocked userd
    mapping(address => bool) public patients;

    constructor() ERC721("MedicalNFT", "MED") {}

    function toggleTrue(address _patient) public onlyOwner {
        patients[_patient] = true;
    }

    function toggleFalse(address _patient) public onlyOwner {
        patients[_patient] = false;
    }

    function mint(
        string memory name,
        uint256 price,
        string memory data,
        uint256 birthday,
        string memory sexe
    ) public {
        require(!patients[msg.sender], "You are blocked from minting");
        require(bytes(name).length > 0, "Name can't be empty");
        require(bytes(data).length > 0, "Data can't be empty");

        _safeMint(msg.sender, _NftsCounter);

        NFT memory dataStruct = NFT({
            id: _NftsCounter,
            name: name,
            owner: msg.sender,
            date: block.timestamp,
            birthday: birthday,
            sexe: sexe,
            price: price,
            data: data
        });
        // Create new nft and add it to the list of the nfts.
        NFTs[_NftsCounter] = dataStruct;
        // Add the nft to the list of the nfts for this patient.
        PatientNfts[msg.sender].push(_NftsCounter);
        //increment the count of nfts
        _NftsCounter++;
    }

    //this function called by laboratorys
    function getNfts(uint256[] memory ids) public view returns (NFT[] memory) {
        NFT[] memory nfts = new NFT[](ids.length);
        for (uint256 i = 0; i < ids.length; i++) {
            nfts[i] = NFTs[ids[i]];
        }
        return nfts;
    }
    //this function called by laboratorys
    function getAllNfts() public view returns (NFT[] memory) {
        NFT[] memory nfts = new NFT[](_NftsCounter);
        for (uint256 i = 0; i < _NftsCounter; i++) {
            nfts[i] = NFT({
                id : NFTs[i].id,
                name : NFTs[i].name,
                owner : NFTs[i].owner,
                date : NFTs[i].date,
                price :NFTs[i].price,
                data : '',
                birthday :NFTs[i].birthday,
                sexe:NFTs[i].sexe
            });
        }
        return nfts;
    }
    //this function called by patient
    function getPatientNftsList() public view returns (NFT[] memory) {
        uint256[] memory list = PatientNfts[msg.sender];
        uint256 l = PatientNfts[msg.sender].length;
        NFT[] memory nfts = new NFT[](l);
        for (uint256 i = 0; i < l; i++) {
            nfts[i] = NFTs[list[i]];
        }
        return nfts;
    }
}
