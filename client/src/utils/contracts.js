import Web3 from "web3";
const web3 = new Web3("http://localhost:7545");

export const auth0 = require("../auth0.json");
export const auth0Address = "0x9CF029810B68693f0f7a833AF25888A4339B7A95";
export const Auth0Contract = new web3.eth.Contract(auth0.abi, auth0Address);

export const MedicalDataNFT = require("../MedicalDataNFT.json");
export const MedicalDataNFTAddress = "0x88DF24C74be913C2E1Da119fa7e89bA5361e2af9";
export const  MedicalDataNFTContract = new web3.eth.Contract(MedicalDataNFT.abi, MedicalDataNFTAddress);

export const Composable = require("../Composable.json");
export const ComposableAddress = "0x0fC99156A4C5ED68E56c08a66f8AcB09d37a5499";
export const ComposableContract  = new web3.eth.Contract(Composable.abi, ComposableAddress);

