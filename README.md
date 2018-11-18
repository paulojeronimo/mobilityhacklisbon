# blockchain-ecu


## Create your account on the Rinkeby network

You can do it on the geth console or on the metamask (easier)

run the network localy

```
brew install ethereum
geth --rinkeby --rpc --rpcapi="personal,eth,network,web3,net" --ipcpath "~/Library/Ethereum/geth.ipc"
```

Wait it to sync and than you can deploy the contracts, while that, add your wallet to the list of accounts:

> this might take long time to run

```
echo "your private key" >> ecu-test-rinkeby.key
geth --rinkeby account import ecu-test-rinkeby.key
```

then check it

```
geth attach
> eth.accounts
["0x3e495e542ed5668d7cb63ed9ae8debce1a9eac2e"]
> eth.getBalance(eth.accounts[0])
0 # it will get updated after the network syncs
```

Then just check the values on the truffle.js on the project's folder.

Before deploying the contracts you must unlock the account by:

```
personal.unlockAccount(eth.accounts[0], null, 1200)
```

then on the project's folder

```
truffle migrate --reset --compile-all --network rinkeby
```



