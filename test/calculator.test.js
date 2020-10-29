const { contract } = require('@openzeppelin/test-environment');

const { BN, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

const Adder = contract.fromArtifact('Adder');
const Suber = contract.fromArtifact('Suber');
const Multiplier = contract.fromArtifact('Multiplier');
const Divisor = contract.fromArtifact('Divisor');
const Calculator = contract.fromArtifact('Calculator');

describe('Calculator', () => {
  beforeEach(async function () {
    this.adder = await Adder.new();
    this.suber = await Suber.new();
    this.multiplier = await Multiplier.new();
    this.divisor = await Divisor.new();
    this.calculator = await Calculator.new(
      this.adder.address,
      this.suber.address,
      this.multiplier.address,
      this.divisor.address,
    );
  });

  it('add numbers', async function () {
    expect(await this.calculator.add(1, 1)).to.be.bignumber.equal(new BN(2));
  });

  it('substract numbers nb1 - nb2', async function () {
    expect(await this.calculator.sub(100, 98)).to.be.bignumber.equal(new BN(2));
  });

  it('reverts when nb1 < nb2', async function () {
    await expectRevert(
      this.calculator.sub(98, 122),
      'Suber: no negative value here.',
    );
  });

  it('multiply numbers nb1 by nb2', async function () {
    expect(await this.calculator.mul(8, 8)).to.be.bignumber.equal(new BN(64));
  });

  it('Divid nb1 by nb2', async function () {
    expect(await this.calculator.div(45, 5)).to.be.bignumber.equal(new BN(9));
  });

  it('reverts when nb2 <= 0', async function () {
    await expectRevert(
      this.calculator.div(55, 0),
      'Divisor: can not divide by 0',
    );
  });
});
