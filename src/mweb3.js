require('dotenv').config();
const Web3 = require('web3');
const { CHAIN } = require("./constants");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const NMC = process.env.MNEMONIC;  
const infuraToken = process.env.INFURA_TOKEN;
const moralisToken = process.env.MORALIS_TOKEN;

const BSC_URL = `https://speedy-nodes-nyc.moralis.io/${moralisToken}/bsc/testnet`;
const ETHEREUM_URL = `https://speedy-nodes-nyc.moralis.io/${moralisToken}/eth/rinkeby`;

let web3=null, myAccount='0x';

const getContract = p => new web3.eth.Contract(...p);

async function switchChain(chain) {
    console.log('Switching chain..');
    switch(chain) {
        case CHAIN.BSC:
            web3 = new Web3(new HDWalletProvider(NMC, BSC_URL));
            myAccount = (await web3.eth.getAccounts())[0];
            console.log('account:', myAccount, 'chainId:', await web3.eth.getChainId());
            break;
            case CHAIN.ETHEREUM:
                web3 = new Web3(new HDWalletProvider(NMC, ETHEREUM_URL));
                myAccount = (await web3.eth.getAccounts())[0];
            console.log('account:', myAccount, 'chainId:', await web3.eth.getChainId());
            break;
        default: console.log('Err: Switching to an invalid chain!');
    }
    return {web3, myAccount};
}

module.exports = {
    getContract,
    switchChain,
}