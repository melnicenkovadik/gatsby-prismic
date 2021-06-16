import React, {useEffect, useState} from 'react'
import RichText from "prismic-reactjs/src/Component";
import Web3 from "web3";
import Web3Provider, {Connectors, useWeb3Context, Web3Consumer} from "web3-react";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import {GrStatusGood, MdContentCopy} from "react-icons/all";
import Salut from "../Salut";

const {InjectedConnector} = Connectors

const MetaMask = new InjectedConnector({supportedNetworks: [1, 4]})
const connectors = {MetaMask}


function Web3DataComponent() {
    let context;
    if (typeof window !== "undefined") {
        context = useWeb3Context();
    }
    if (context.error) {
        console.error("Error!");
    }
    if (localStorage.getItem('account')) {
        context.setConnector('MetaMask')
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
                        key={name}
                        className={'meta-mask__login'}
                        onClick={() => {
                            context.setConnector('MetaMask').then(() => {
                                localStorage.setItem('account', 'true');
                            })
                        }}
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
                    onClick={() => {
                        localStorage.removeItem('account')
                        context.unsetConnector()
                    }}
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
    const [getGasPrice, setGetGasPrice] = useState("...");
    const [getChainId, setGetChainId] = useState("...");
    const [getCoinbase, setGetCoinbase] = useState("...");
    const [isCopiedCoinBase, setIsCopiedCoinBase] = useState(false);
    useEffect(() => {
        console.log(text)
    }, [text]);

    const onCopyText = (text_TYPE) => {
        setText(text_TYPE)
        setIsCopiedCoinBase(true);
        setTimeout(() => {
            setIsCopiedCoinBase(false);
        }, 1000);
    };
    return (
        <Web3Consumer>
            {context => {
                const {
                    active, account, networkId, library
                } = context;
                // console.log('library', library);
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

                    library?.eth.getBalance(account)
                        .then((bal) => setBalance(bal))
                        .catch(error => setBalance(null))

                    library?.eth.getChainId()
                        .then((e) => setGetChainId(e))
                        .catch(e => setGetChainId(null))

                    library?.eth.getGasPrice()
                        .then((e) => setGetGasPrice(e))
                        .catch(e => setGetGasPrice(null))

                    library?.eth.getCoinbase()
                        .then((e) => setGetCoinbase(e))
                        .catch(e => setGetCoinbase(null))


                }
                return (
                    active && (
                        <React.Fragment>
                            <Salut/>
                            <div className={'meta-mask__item'}>
                                <div className={'meta-mask__item__label'}>
                                    Network ID
                                </div>
                                <div className={'meta-mask__item__value'}>
                                    {networkId || "None"}
                                </div>
                            </div>
                            <div className={'meta-mask__item'}>
                                <div className={'meta-mask__item__label'}>Account</div>
                                <div className={'meta-mask__item__value'}>
                                    {account || "None"}
                                </div>
                                <CopyToClipboard text={text} onCopy={() => onCopyText(account)}>
                                    <div className="code-section">
                                        <span>{account === text ? <GrStatusGood/> : <MdContentCopy/>}</span>
                                    </div>
                                </CopyToClipboard>
                            </div>
                            <div className={'meta-mask__item'}>
                                <div className={'meta-mask__item__label'}>
                                    Balance:
                                </div>
                                <div className={'meta-mask__item__value'}>
                                    {balance || "None"}
                                </div>

                            </div>
                            <div className={'meta-mask__item'}>
                                <div className={'meta-mask__item__label'}>Active Connector</div>
                                <div className={'meta-mask__item__value'}>
                                    MetaMask
                                </div>
                            </div>

                            <div className={'meta-mask__item'}>
                                <div className={'meta-mask__item__label'}>Block Number</div>
                                <div className={'meta-mask__item__value'}>
                                    {blockNumber || "None"}
                                </div>
                            </div>
                            <div className={'meta-mask__item'}>
                                <div className={'meta-mask__item__label'}>Gas Price</div>
                                <div className={'meta-mask__item__value'}>
                                    {getGasPrice || "None"}
                                </div>
                            </div>
                            <div className={'meta-mask__item'}>
                                <div className={'meta-mask__item__label'}>Chain Id</div>
                                <div className={'meta-mask__item__value'}>
                                    {getChainId || "None"}
                                </div>
                            </div>
                            <div className={'meta-mask__item'}>
                                <div className={'meta-mask__item__label'}>Coinbase</div>
                                <div className={'meta-mask__item__value'}>
                                    {getCoinbase || "None"}
                                </div>
                                <CopyToClipboard text={text} onCopy={() => onCopyText(getCoinbase)}>
                                    <div className="code-section">
                                        <span>{isCopiedCoinBase ? <GrStatusGood/> : <MdContentCopy/>}</span>
                                    </div>
                                </CopyToClipboard>
                            </div>
                        </React.Fragment>
                    )
                );
            }}
        </Web3Consumer>
    );
}

const MetaMaskSlice = ({slice}) => {


    return (
        <section className="meta-mask__container">
            <RichText render={slice.primary.meta_title.raw}/>
            <div className="meta-mask">
                <Web3Provider
                    connectors={connectors}
                    web3Api={Web3}
                    libraryName="web3.js"
                >
                    <Web3DataComponent/>
                </Web3Provider>
            </div>
        </section>
    )
}

export default MetaMaskSlice
