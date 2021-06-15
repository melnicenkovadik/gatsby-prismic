import React, {useState} from 'react'
import RichText from "prismic-reactjs/src/Component";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {MdContentCopy} from "react-icons/md";
import {GrStatusGood} from "react-icons/all";
import Web3 from "web3";
import Web3Provider, {Connectors, useWeb3Context, Web3Consumer} from "web3-react";

const {
    InjectedConnector,
} = Connectors;

function Web3DataComponent() {
    const context = useWeb3Context();
    if (context.error) {
        console.error("Error!");
    }
    return (
        <React.Fragment>
            <Web3ConsumerComponent/>
            {context.error && (
                <p className={'meta-mask__error-alert'}>An error occurred, check the console for details.</p>
            )}
            {
                !context.connectorName ?
                    <button
                        disabled={context.connectorName === '0'}
                        className={'meta-mask__login'}
                        onClick={() => context.setConnector('0')}
                    >
                        LOG IN WITH METAMASK
                    </button>
                    : null
            }

            <br/>
            <br/>

            {(context.active || (context.error && context.connectorName)) && (
                <button
                    className={'meta-mask__login'}
                    onClick={() => context.unsetConnector()}
                >
                    {context.active ? "Deactivate Connector" : "Reset"}
                </button>
            )}
        </React.Fragment>
    );
}

function Web3ConsumerComponent() {
    const [text, setText] = useState("");
    const [balance, setBalance] = useState("...");
    const [blockNumber, setBlockNumber] = useState("...");
    const [isCopied, setIsCopied] = useState(false);

    const onCopyText = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    return (
        <Web3Consumer>
            {context => {
                const {
                    active, connectorName, account, networkId, library
                } = context;
                if (library) {
                    let stale = false;
                    library.eth
                        .getBlockNumber()
                        .then(r => {
                            if (!stale) {
                                setBlockNumber(r);
                            }
                        })
                        .catch(e => {
                            console.log(e);
                            if (!stale) {
                                setBlockNumber(null);
                            }
                        });

                    setText(account)
                    library?.eth.getBalance(account)
                        .then((bal) => setBalance(bal))
                        .catch(error => setBalance(null))
                }

                return (
                    active && (
                        <React.Fragment>
                            <div className={'meta-mask__eth-address'}>
                                <div className={'meta-mask__eth-address__label'}>
                                    Network ID
                                </div>
                                <div className={'meta-mask__eth-address__value'}>
                                    {networkId}
                                </div>
                            </div>
                            <div className={'meta-mask__eth-address'}>
                                <div className={'meta-mask__eth-address__label'}>Account</div>
                                <div className={'meta-mask__eth-address__value'}>
                                    {account || "None"}
                                </div>
                                <CopyToClipboard text={text} onCopy={onCopyText}>
                                    <div className="code-section">
                                        <span>{isCopied ? <GrStatusGood/> : <MdContentCopy/>}</span>
                                    </div>
                                </CopyToClipboard>
                            </div>
                            <div className={'meta-mask__eth-address'}>
                                <div className={'meta-mask__eth-address__label'}>Balance</div>
                                <div className={'meta-mask__eth-address__value'}>
                                    {balance}
                                </div>
                            </div>
                            <div className={'meta-mask__eth-address'}>
                                <div className={'meta-mask__eth-address__label'}>Block Number</div>
                                <div className={'meta-mask__eth-address__value'}>
                                    {blockNumber}
                                </div>
                            </div>
                            <div className={'meta-mask__eth-address'}>
                                <div className={'meta-mask__eth-address__label'}>Active Connector</div>
                                <div className={'meta-mask__eth-address__value'}>
                                    MetaMask
                                </div>
                            </div>
                        </React.Fragment>
                    )
                );
            }}
        </Web3Consumer>
    );
}

const MetaMask = ({slice}) => {
    const MetaMask = new InjectedConnector({supportedChainIds: [1, 3, 4, 5, 42]});
    return (
        <section className="meta-mask__container">
            <RichText render={slice.primary.meta_title.raw}/>
            <div className="meta-mask">
                <Web3Provider
                    connectors={[MetaMask]}
                    web3Api={Web3}
                    libraryName="web3.js"
                >
                    <Web3DataComponent/>
                </Web3Provider>
            </div>
        </section>
    )
}

export default MetaMask
