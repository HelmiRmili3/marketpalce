// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract auth1 {
    address[] private addressArray;

    enum State {
        Patient,
        Laboratory,
        Admin
    }

    struct User {
        string nom;
        string prenom;
        string email;
        string password;
        address userAddress;
        State userState;
        bool isDeleted;
    }

    mapping(address => User) private users;

    function createUser(
        string memory nom,
        string memory prenom,
        string memory email,
        string memory password,
        address userAddress,
        State userState
    ) public {
        require(userAddress != address(0), "Invalid user address");

        if (userExists(userAddress)) {
            require(!userExists(userAddress), "Address allready used");
        } else {
            if (users[userAddress].isDeleted) {
                users[userAddress].nom = nom;
                users[userAddress].prenom = prenom;
                users[userAddress].email = email;
                users[userAddress].password = password;
                users[userAddress].userState = userState;
                users[userAddress].isDeleted = false;
            } else {
                users[userAddress] = User(
                    nom,
                    prenom,
                    email,
                    password,
                    userAddress,
                    userState,
                    false
                );
                addressArray.push(userAddress);
            }
        }
    }

    function deleteUser(address userAddress) public {
        require(users[userAddress].isDeleted == false, "User does not exist");
        users[userAddress].isDeleted = true;
    }
     function getUser(address userAddress) public view returns (User memory) {
        require(users[userAddress].isDeleted == false,"User is deleted");
        return  users[userAddress];
    }
    function userExists(address userAddress) public view returns (bool) {
        
        for (uint256 i = 0; i < addressArray.length; i++) {
            if (addressArray[i] == userAddress) {
                if (users[userAddress].isDeleted) {
                    return false;
                }
                return true;
            }
        }
        return false;
    }

    function getAllUsers() public view returns (User[] memory) {
        uint256 count = 0;

        for (uint256 i = 0; i < addressArray.length; i++) {
            if (!users[addressArray[i]].isDeleted) {
                count++;
            }
        }

        User[] memory result = new User[](count);

        uint256 index = 0;

        for (uint256 i = 0; i < addressArray.length; i++) {
            if (!users[addressArray[i]].isDeleted) {
                result[index] = users[addressArray[i]];
                index++;
            }
        }

        return result;
    }

    function getUsersFor(State userState) public view returns (User[] memory) {
        uint256 count = 0;

        for (uint256 i = 0; i < addressArray.length; i++) {
            if (
                users[addressArray[i]].userState == userState &&
                !users[addressArray[i]].isDeleted
            ) {
                count++;
            }
        }

        User[] memory result = new User[](count);

        uint256 index = 0;

        for (uint256 i = 0; i < addressArray.length; i++) {
            if (
                users[addressArray[i]].userState == userState &&
                !users[addressArray[i]].isDeleted
            ) {
                result[index] = users[addressArray[i]];
                index++;
            }
        }

        return result;
    }
}
