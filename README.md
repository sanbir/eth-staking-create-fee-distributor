# eth-staking-create-fee-distributor

Creates a per client instance of [`FeeDistributor` contract](https://github.com/p2p-org/staking-draft/blob/master/contracts/FeeDistributor.sol). 

## Requirements
- Node.js 16.17.0
- npm 8.15.0

## Usage
```shell
cd eth-staking-create-fee-distributor
npm i
node createFeeDistributor.js <RPC_URL> <PRIVATE_KEY> <FEE_DISTRIBUTOR_FACTORY_ADDRESS> <CLIENT_ADDRESS>

# e.g.
node createFeeDistributor.js https://goerli.infura.io/v3/f52bd8e7578c435c978ab9cf68cd3a18 62d7bb725787d84b059eb4950f6eea060d898183250ca3ea673a36b8e113018f 0xc298912794951d29832c9ae39faab29896b628d9 0x0000000000000000000000000000000000C0FFEE
```

or you can just run
```shell
node createFeeDistributor.js
```
providing all the required arguments:
- RPC_URL
- PRIVATE_KEY
- FEE_DISTRIBUTOR_FACTORY_ADDRESS
- CLIENT_ADDRESS

in the `.env` file.

The output of the program is just the address of the newly created per client instance of `FeeDistributor` contract.

Example output:

`0x681847E1f87D14062A28d130Af13B0F6389B4719`


This address is intended to be used as a EL rewards recipient in a validator.

This program is for generating instances of `FeeDistributor` only. For withdrawing the rewards, use a different program.

