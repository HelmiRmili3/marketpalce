// = artifacts.require("auth1");
//const MedicalDataNFT2 = artifacts.require("MedicalDataNFT2");
const contract  = artifacts.require("MedicalNFT");


module.exports = function (deployer) {
 // deployer.deploy(auth);
 // deployer.deploy(MedicalDataNFT2);
  deployer.deploy(contract);
};
