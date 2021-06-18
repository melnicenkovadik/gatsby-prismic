import React from "react";
import {Web3ReactProvider,useWeb3React} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import RichText from "prismic-reactjs/src/Component";
import {Web3ReactProviderComponent} from "../Web3ReactProviderComponent";
import * as RB from 'react-bootstrap';
import { broadcastTransaction } from '../../scripts/broadcast-transaction';
import { prepareTransaction } from '../../scripts/prepare-transaction';
import { signTransaction } from '../../scripts/sign-transaction';
import { BalanceComponent } from '../Balance';

const getLibrary = (provider) => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
}


export const TransactionCreator = () => {
    const { account } = useWeb3React();
    const [isTxLoading, setIsTxLoading] = React.useState(false);
    const [amount, setAmount] = React.useState('');
    const [executedTxId, setExecutedTxId] = React.useState(undefined);
    const [address, setAddress] = React.useState('');

    const handlePrepareTransaction = () => {
        setIsTxLoading(true)
        setExecutedTxId(undefined)

        prepareTransaction(amount, account, address).then(preparedTx =>
            signTransaction(preparedTx).then(signedTx =>
                broadcastTransaction(signedTx).then(executedTx => {
                        setExecutedTxId(executedTx.transactionHash);
                        setIsTxLoading(false);
                    }
                )
            )
        );
    }

    const handleChangeAmount = (amount) => setAmount(amount);

    return (
        <div className="transaction-creator">
            <RB.Container>
                <h3>Transaction creator</h3>
                <RB.Row className="justify-content-md-center mb-7 mt-4">
                    <div className="form">
                        <RB.Col>
                            <RB.InputGroup className="mb-3 mw-50">
                                <RB.FormControl
                                    placeholder="Enter destination address"
                                    aria-label="Address to send"
                                    aria-describedby="basic-addon2"
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                />
                            </RB.InputGroup>
                            <RB.InputGroup className="mb-3 mw-50">
                                <RB.FormControl
                                    placeholder="Enter amount to send"
                                    aria-label="Amount to send"
                                    aria-describedby="basic-addon2"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                />
                                <RB.InputGroup.Append>
                                    <RB.InputGroup.Text id="basic-addon2">ETH</RB.InputGroup.Text>
                                </RB.InputGroup.Append>
                            </RB.InputGroup>
                            <BalanceComponent handleChangeAmount={handleChangeAmount} account={account}/>
                            <RB.Button
                                onClick={handlePrepareTransaction}
                                variant="primary"
                                className="w-100"
                            >
                                Send
                            </RB.Button>
                        </RB.Col>
                    </div>
                </RB.Row>
                {executedTxId ? (
                    <RB.Row className="justify-content-md-center mt-3">
                        <a
                            href={`https://ropsten.etherscan.io/tx/${executedTxId}`}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            {`https://ropsten.etherscan.io/tx/${executedTxId}`}
                        </a>
                    </RB.Row>
                ) : null}
                {isTxLoading ? (
                    <RB.Spinner animation="border" role="status" className="mt-3">
                        <span className="sr-only">Loading...</span>
                    </RB.Spinner>
                ) : null}
            </RB.Container>
        </div>
    )
}

const MetaMaskSlice = ({slice}) => {
    return (
        <section className="meta-mask__container">
            <RichText render={slice.primary.meta_title.raw}/>
            <Web3ReactProvider getLibrary={getLibrary}>
                <Web3ReactProviderComponent/>
                <TransactionCreator />
            </Web3ReactProvider>
        </section>
    );
}

export default MetaMaskSlice
