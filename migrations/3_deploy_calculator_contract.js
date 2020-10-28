// Adder is an artifact of the Adder contract
const Adder = artifacts.require('Adder');
// Suber is an artifact of the Suber contract
const Suber = artifacts.require('Suber');
// Multiplier is an artifact of the Multiplier contract
const Multiplier = artifacts.require('Multiplier');
// Divisor is an artifact of the Multiplier contract
const Divisor = artifacts.require('Divisor');
// Calculator is an artifact of the Calculator contract
const Calculator = artifacts.require('Calculator');

module.exports = async (deployer) => {
  // multiplierInstance is an instance of the already deployed Multiplier contract
  const multiplierInstance = await Multiplier.deployed();
  // divisorInstance is an instance of the already deployed Divisor contract
  const divisorInstance = await Divisor.deployed();
  // eslint-disable-next-line no-unused-vars
  const calculatorInstance = await deployer.deploy(
    Calculator,
    Adder.address, // use Adder address from artifact
    Suber.address, // use Suber address from artifact
    multiplierInstance.address, // use Multiplier address from instance
    divisorInstance.address, // use Divisor address from instance
  );
};
