const MCToken = artifacts.require("MCToken");

module.exports = function (deployer) {
  deployer.deploy(MCToken);
};
