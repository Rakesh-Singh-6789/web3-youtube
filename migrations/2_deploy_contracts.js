var UserStore = artifacts.require("./UserStore.sol");
var VideoStore = artifacts.require("./VideoStore.sol");
var UserActions = artifacts.require("./UserActions.sol");
var TTMToken = artifacts.require("./TTMToken.sol");

module.exports = function(deployer) {
  deployer.deploy(UserStore);
  deployer.deploy(VideoStore);
  deployer.deploy(UserActions);
  deployer.deploy(TTMToken);

};


