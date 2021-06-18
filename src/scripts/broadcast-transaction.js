/**
 * Require the credentials that you entered in the .env file
 */
import Web3 from "web3";

import txDecoder from "ethereum-tx-decoder";

import EthereumTx from "ethereumjs-tx";

/**
 * Network configuration
 */
const mainnet = `https://mainnet.infura.io/61a1a73025814acbb624b7a5d8a37cac`
const testnet = `https://ropsten.infura.io/v3/61a1a73025814acbb624b7a5d8a37cac`

/**
 * Change the provider that is passed to HttpProvider to `mainnet` for live transactions.
 */
const networkToUse =  testnet
const web3 = new Web3( new Web3.providers.HttpProvider(networkToUse) )

export const broadcastTransaction = async (encodedTx) => {
    const decodedTx = txDecoder.decodeTx(encodedTx);

    const details = {
        "to": decodedTx.to,
        "value": decodedTx.value._hex,
        "gas":  decodedTx.gasLimit._hex,
        "gasPrice":  decodedTx.gasPrice._hex,
        "nonce":  decodedTx.nonce,
        "chainId":  1,
        "v": decodedTx.v,
        "r": decodedTx.r,
        "s": decodedTx.s
    }
    const updatedTx = new EthereumTx(details);
    const updatedTxSerialized = updatedTx.serialize();

    /**
     * Submit the raw transaction details to the provider configured above.
     */
    const transaction = await web3.eth.sendSignedTransaction('0x' + updatedTxSerialized.toString('hex') );

    /**
     * We now know the transaction ID, so let's build the public Etherscan url where
     * the transaction details can be viewed.
     */
    const url = `https://ropsten.etherscan.io/tx/${transaction.transactionHash}`

    window.console.log('URL: ', url);

    window.console.log(`Note: please allow for 30 seconds before transaction appears on Etherscan`);

    return transaction;
}
