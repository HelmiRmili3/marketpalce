
const MedicalDataNFT  = artifacts.require("MedicalDataNFT");
module.exports = function (deployer) {
  deployer.deploy(MedicalDataNFT);
};
