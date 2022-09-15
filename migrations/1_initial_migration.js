const Migrations = artifacts.require("Migrations");
const Buy_stocks=artifacts.require('Buy_stocks')
module.exports = function (deployer) {
  deployer.deploy(Buy_stocks);
};
