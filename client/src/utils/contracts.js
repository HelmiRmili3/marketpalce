import Web3 from "web3";
const web3 = new Web3("http://localhost:7545");

const auth0 = require("../auth0.json");
const auth0Address = "0xb4a2059F3d05C5f61671B7ca199a605f2DD080f5";
export const Auth0Contract = new web3.eth.Contract(auth0.abi, auth0Address);

const MedicalDataNFT = require("../MedicalDataNFT.json");
const MedicalDataNFTAddress = "0xCA1705f9dD097eA55D05a742Cb46d73B68A1A0c9";
export const  MedicalDataNFTContract = new web3.eth.Contract(MedicalDataNFT.abi, MedicalDataNFTAddress);

const Composable = require("../Composable.json");
const ComposableAddress = "0x1F138C92Ac49cb9aef91A007bFdcBB307B6443F2";
export const ComposableContract  = new web3.eth.Contract(Composable.abi, ComposableAddress);

