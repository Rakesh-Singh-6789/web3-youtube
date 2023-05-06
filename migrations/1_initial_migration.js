const Migrations = artifacts.require("Youtube.sol");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
