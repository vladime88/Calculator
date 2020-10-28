const { contract } = require('@openzeppelin/test-environment');

const { BN, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

const Adder = contract.fromArtifact('Adder');
const Suber = contract.fromArtifact('Suber');
const Multiplier = contract.fromArtifact('Multiplier');
const Divisor = contract.fromArtifact('Divisor');
// const Calculator = contract.fromArtifact('Calculator');

describe('Calculator', () => {
  beforeEach(async function () {
    this.adder = await Adder.new();
  });

  it('add numbers', async function () {
    expect(await this.adder.add(1, 1)).to.be.bignumber.equal(new BN(2));
  });

  beforeEach(async function () {
    this.suber = await Suber.new();
  });

  it('substract numbers nb1 - nb2', async function () {
    expect(await this.suber.sub(100, 98)).to.be.bignumber.equal(new BN(2));
  });

  it('reverts when nb1 < nb2', async function () {
    await expectRevert(
      this.suber.sub(98, 122),
      'Suber: no negative value here.',
    );
  });

  beforeEach(async function () {
    this.multiplier = await Multiplier.new();
  });

  it('multiply numbers nb1 by nb2', async function () {
    expect(await this.multiplier.mul(8, 8)).to.be.bignumber.equal(new BN(64));
  });

  beforeEach(async function () {
    this.divisor = await Divisor.new();
  });

  it('Divid nb1 by nb2', async function () {
    expect(await this.divisor.div(45, 5)).to.be.bignumber.equal(new BN(9));
  });

  it('reverts when nb2 <= 0', async function () {
    await expectRevert(
      this.divisor.div(55, 0),
      'Divisor: can not divide by 0',
    );
  });
});
