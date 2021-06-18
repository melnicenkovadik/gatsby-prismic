/**
 * Require the credentials that you entered in the .env file
 */

import Web3 from "web3";

import EthereumTx from "ethereumjs-tx"

import axios from "axios";

/**
 * Network configuration
 */
const mainnet = `https://mainnet.infura.io/v3/f4605f617b6a4246936501f3af2f4fc7`

/**
 * Change the provider that is passed to HttpProvider to `mainnet` for live transactions.
 */
const networkToUse = mainnet
const web3 = new Web3( new Web3.providers.HttpProvider(networkToUse) )


/**
 * Set the web3 default account to use as your public wallet address
 */
web3.eth.defaultAccount = '0xcc9d35527E1480F2ceea26d3299C3385D410D818'


/**
 * Fetch the current transaction gas prices from https://ethgasstation.info/
 *
 * @return {object} Gas prices at different priorities
 */
export const getCurrentGasPrices = async () => {
    let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json')
    let prices = {
        low: response.data.safeLow / 10,
        medium: response.data.average / 10,
        high: response.data.fast / 10
    }

    return prices;
}

/**
 * This is the process that will run when you execute the program.
 */
export const prepareTransaction = async (amountToSend, account, destinationAddress) => {
    /**
     * Fetch the balance of the destination address
     */

    let destinationBalanceWei = await web3.eth.getBalance(destinationAddress);
    let destinationBalance = await web3.utils.fromWei(destinationBalanceWei, 'ether');

    window.console.log(`Destination wallet balance is currently ${destinationBalance} ETH`)

    /**
     * With every new transaction you send using a specific wallet address,
     * you need to increase a nonce which is tied to the sender wallet.
     */
    let nonce = await web3.eth.getTransactionCount(web3.eth.defaultAccount);
    window.console.log(`The outgoing transaction count for your wallet address is: ${nonce}`)


    /**
     * Fetch the current transaction gas prices from https://ethgasstation.info/
     */
    let gasPrices = await getCurrentGasPrices()

    const details = {
        "to": destinationAddress,
        "value": web3.utils.toHex( web3.utils.toWei(amountToSend || '0', 'ether') ),
        "gas": 21000,
        "gasPrice": gasPrices.high * 1000000000, // converts the gwei price to wei
        "nonce": nonce,
        "chainId": 1 // EIP 155 chainId - mainnet: 1, ropsten: 3
    }
    const transaction = new EthereumTx(details)
    const serializedTransaction = transaction.serialize()

    return serializedTransaction;
}

/**
 * Fetch your personal wallet's balance
 * @param {*} account
 */
export const getMyWalletBalance = async (account) => {
    let myBalanceWei = await web3.eth.getBalance(account || web3.eth.defaultAccount);
    let myBalance = await web3.utils.fromWei(myBalanceWei, 'ether');

    window.console.log(`Your wallet balance is currently ${myBalance} ETH`)
    return myBalance;
};
