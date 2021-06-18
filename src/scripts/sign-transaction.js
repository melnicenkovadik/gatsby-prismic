/**
 * Require the credentials that you entered in the .env file
 */

import txDecoder from "ethereum-tx-decoder";

import EthereumTx from "ethereumjs-tx";

export const signTransaction = async (encodedTx) => {
    const decodedTx = txDecoder.decodeTx(encodedTx);

    const details = {
        "to": decodedTx.to,
        "value": decodedTx.value._hex,
        "gas":  decodedTx.gasLimit._hex,
        "gasPrice":  decodedTx.gasPrice._hex,
        "nonce":  decodedTx.nonce,
        "chainId":  1
    }
    const updatedTx = new EthereumTx(details);

    updatedTx.sign( Buffer.from('3f29e926ecc8f8d500e34da61d678f15d371e793512da06905a3fcba4260b0e4', 'hex') )
    const updatedTxSerialized = updatedTx.serialize()

    return updatedTxSerialized;
}
