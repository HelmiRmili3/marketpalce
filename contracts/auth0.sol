// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract auth0 is Ownable {
    uint256 public patientCounter;
    uint256 public laboratoryCounter;

    struct Admin {
        address wallet;
        string name;
        string email;
        string password;
    }

    struct Patient {
        uint256 id;
        string nom;
        string prenom;
        string email;
        string password;
        address wallet;
        string role;
        uint256 birthday;
        string sexe;
    }
    struct Laboratory {
        uint256 id;
        string name;
        string email;
        string password;
        address wallet;
        string role;
        string license;
        string discription;
    }

    Admin public admin;
    mapping(uint256 => Patient) public patients;
    mapping(uint256 => Laboratory) public laboratorys;
    mapping(address => bool) private addressArray;

    constructor() {}

    //create patient
    function createPatient(
        string memory nom,
        string memory prenom,
        string memory email,
        string memory hash,
        string memory sexe,
        uint256 date
    ) public {
        require(
            admin.wallet != msg.sender,
            "You can't create patient account with admin address"
        );

        require(!addressArray[msg.sender], "This address is allready used");
        require(bytes(nom).length > 0, "nom must be not empty");
        require(bytes(prenom).length > 0, "prenom must be not empty");
        require(bytes(email).length > 0, "email must be not empty");
        require(bytes(hash).length > 0, "password must be not empty");
        require(bytes(sexe).length > 0, "sexe must be not empty");
        require(date > 0, "date must be not empty");
        Patient memory data = Patient({
            id: patientCounter,
            nom: nom,
            prenom: prenom,
            email: email,
            password: hash,
            wallet: msg.sender,
            role: "Patient",
            birthday: date,
            sexe: sexe
        });
        patients[patientCounter] = data;
        patientCounter++;
        addressArray[msg.sender] = true;
    }

    //create laboratory
    function createLaboratory(
        string memory name,
        string memory email,
        string memory hash,
        address wallet,
        string memory license,
        string memory discription
    ) public onlyOwner {
        require(
            wallet != msg.sender,
            "You can't create laboratory account with admin address"
        );
        require(!addressArray[wallet], "This address is allready used");
        require(bytes(name).length > 0, "nom must be not empty");
        require(bytes(email).length > 0, "email must be not empty");
        require(bytes(hash).length > 0, "password must be not empty");
        require(bytes(license).length > 0, "password must be not empty");
        require(bytes(discription).length > 0, "discription must be not empty");
        Laboratory memory data = Laboratory({
            id: laboratoryCounter,
            name: name,
            email: email,
            password: hash,
            wallet: wallet,
            role: "Laboratory",
            license: license,
            discription: discription
        });
        laboratorys[laboratoryCounter] = data;
        laboratoryCounter++;
        addressArray[wallet] = true;
    }

    //change password laboratory
    function changePasswordLaboratory(uint256 id, string memory hash) public {
        require(addressArray[msg.sender], "This account is not found");
        laboratorys[id].password = hash;
    }

    function changePasswordPaitent(uint256 id, string memory hash) public {
        require(addressArray[msg.sender], "This account is not found");
        patients[id].password = hash;
    }

    function changePasswordAdmin(string memory hash) public onlyOwner {
        require(owner() == msg.sender, "Your are not the admin");
        admin.password = hash;
    }

    function createAdmin(string memory email, string memory hash)
        public
        onlyOwner
    {
        require(
            owner() == msg.sender,
            "Your are not the owner of this contract "
        );
        Admin memory data = Admin({
            wallet: owner(),
            name: "admin",
            email: email,
            password: hash
        });

        admin = data;
    }

    function getPatient(address wallet) public view returns (Patient memory) {
        Patient memory data;
        for (uint256 i = 0; i < patientCounter; i++) {
            if (patients[i].wallet == wallet) {
                data = patients[i];
                break;
            }
        }
        return data;
    }

    function getLaboratory(address wallet)
        public
        view
        returns (Laboratory memory)
    {
        Laboratory memory data;
        for (uint256 i = 0; i < laboratoryCounter; i++) {
            if (laboratorys[i].wallet == wallet) {
                data = laboratorys[i];
                break;
            }
        }
        return data;
    }

    function getUserType(address wallet) public view returns(string memory){
        string memory result;
        if(wallet == admin.wallet){
            result = "admin";
        }
        for (uint256 i = 0; i < patientCounter; i++) {
            if (patients[i].wallet == wallet) {
                result = "patient";
            }
        }
        for (uint256 j = 0; j < laboratoryCounter; j++) {
            if (laboratorys[j].wallet == wallet) {
                result = "laboratory";
            }
        }
        return result;
    }

    function getLaboratorys()
        public
        view
        onlyOwner
        returns (Laboratory[] memory)
    {
        Laboratory[] memory list = new Laboratory[](laboratoryCounter);
        for (uint256 i = 0; i < laboratoryCounter; i++) {
            list[i] = laboratorys[i];
        }
        return list;
    }

    function getPatients() public view onlyOwner returns (Patient[] memory) {
        Patient[] memory list = new Patient[](patientCounter);
        for (uint256 i = 0; i < patientCounter; i++) {
            list[i] = patients[i];
        }
        return list;
    }
}
