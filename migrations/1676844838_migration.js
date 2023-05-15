//const MedicalDataNFT = artifacts.require("MedicalDataNFT");
const Composable = artifacts.require("Composable");
//const auth0 = artifacts.require("auth0");

module.exports = function (deployer) {
 // deployer.deploy(MedicalDataNFT);
  deployer.deploy(Composable);
  //deployer.deploy(auth0);
};
