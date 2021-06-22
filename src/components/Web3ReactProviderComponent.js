import {UnsupportedChainIdError, useWeb3React} from "@web3-react/core";
import React, {useEffect, useState} from "react";
import Salut from "./Salut";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import {GrStatusGood, MdContentCopy} from "react-icons/all";
import {formatEther} from "@ethersproject/units";
import {Spinner} from "./Spinner";
import {authereum, injected} from "../utils/connectors";
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected
} from "@web3-react/injected-connector";
import {useEagerConnect, useInactiveListener} from "../hooks";

const ethereum = window.ethereum

const connectorsByName = {
    MetaMast: injected,
    Authereum: authereum
};
const getErrorMessage = (error) => {
    if (error instanceof NoEthereumProviderError) {
        return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
    } else if (error instanceof UnsupportedChainIdError) {
        return "You're connected to an unsupported network.";
    } else if (
        error instanceof UserRejectedRequestErrorInjected
    ) {
        return "Please authorize this website to access your Ethereum account.";
    } else {
        console.error(error);
        return "An unknown error occurred. Check the console for more details.";
    }
}
export const Web3ReactProviderComponent = () => {
    let context
    if (window.ethereum !== "undefined") {
        context = useWeb3React();
    } else {
        return <div><h1>Use another browser please</h1></div>
    }
    const {
        connector,
        library,
        chainId,
        account,
        activate,
        deactivate,
        active,
        error
    } = context;

    const [activatingConnector, setActivatingConnector] = useState();
    const [copy, setCopy] = useState(false);
    const [text, setText] = useState(false);
    const onCopyText = (_copy) => {
        setText(_copy)
        setCopy(true);
        setTimeout(() => {
            setCopy(false);
        }, 1000);
    };
    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);
    const triedEager = useEagerConnect();

    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector);

    const [blockNumber, setBlockNumber] = useState();
    useEffect(() => {
        if (library) {
            let stale = false;

            library
                .getBlockNumber()
                .then(blockNumber => {
                    if (!stale) {
                        setBlockNumber(blockNumber);
                    }
                })
                .catch(() => {
                    if (!stale) {
                        setBlockNumber(null);
                    }
                });

            const updateBlockNumber = blockNumber => {
                setBlockNumber(blockNumber);
            };
            library.on("block", updateBlockNumber);

            return () => {
                library.removeListener("block", updateBlockNumber);
                stale = true;
                setBlockNumber(undefined);
            };
        }
    }, [library, chainId]);

    const [ethBalance, setEthBalance] = useState();
    useEffect(() => {
        if (library && account) {
            let stale = false;

            library
                .getBalance(account)
                .then(balance => {
                    if (!stale) {
                        setEthBalance(balance);
                    }
                })
                .catch(() => {
                    if (!stale) {
                        setEthBalance(null);
                    }
                });

            return () => {
                stale = true;
                setEthBalance(undefined);
            };
        }
    }, [library, account, chainId]);
    const [transactionDetail, setTransactionDetail] = useState();
    useEffect(() => {
        if (library && account) {
            let stale = false;
            library.getBlock("latest")
                .then((block) => {
                    if (!stale) {
                        setTransactionDetail(block);

                    }
                })
                .catch(() => {
                    if (!stale) {
                        setTransactionDetail(null);
                    }
                });
            return () => {
                stale = true;
                setTransactionDetail(undefined);
            };
        }
    }, [library, account, chainId]);
    const [to, setToTransaction] = useState();
    const [value, setValueTransaction] = useState();

    const disabledTo = to?.length === 42 ? false : true
    const transactionParameters = {
        to: to, // Required except during contract publications.
        from:ethereum ? ethereum?.selectedAddress : null, // must match user's active address.
        value: value
    };

    const txHash = async () => {
        await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        }).then(() => {
            alert('Transaction success')
        })
            .catch(() => {
                alert('Transaction failed to send')
            })
    }

    return (
        <div className={'meta-mask'}>
            <label for="to">To:</label>
            <input
                onChange={(e) => setToTransaction(e.target.value)}
                className={'meta-mast__input'}
                name={'to'}
                value={to}/>
            <label for="value">Value:</label>
            <input
                onChange={(e) => setValueTransaction(e.target.value)}
                className={'meta-mast__input'}
                name={'value'}
                value={value}/>

            <button
                disabled={disabledTo}
                className={'meta-mask__btn meta-mask__action-send'}
                onClick={() => txHash()}>
                SEND
            </button>
            <div style={{margin: "0", textAlign: "right"}}>
                {active ? "🟢" : error ? "🔴" : "🟠"}
            </div>
            {active ? <Salut/> : null}
            {active ?
                <>
                    <div className={'meta-mask__item'}>
                        <div className={'meta-mask__item__label'}>Chain Id ⛓
                        </div>
                        <div className={'meta-mask__item__value'}>
                            {chainId === undefined ? "..." : chainId}
                        </div>
                    </div>
                    <div className={'meta-mask__item'}>
                        <div className={'meta-mask__item__label'}>Block Number 🔢</div>
                        <div className={'meta-mask__item__value'}>
                            {blockNumber === undefined
                                ? "..."
                                : blockNumber === null
                                    ? "Error"
                                    : blockNumber.toLocaleString()}
                        </div>
                    </div>
                    <div className={'meta-mask__item'}>
                        <div className={'meta-mask__item__label'}>Account 🤖</div>
                        <div className={'meta-mask__item__value'}>
                            {account === undefined
                                ? "..."
                                : account === null
                                    ? "None"
                                    : `${account.substring(0, 6)}...${account.substring(
                                        account.length - 4
                                    )}`}
                        </div>
                        <CopyToClipboard text={text} onCopy={() => {
                            onCopyText(account)
                        }}>
                            <div className="code-section">
                                <span>{copy ? <GrStatusGood/> : <MdContentCopy/>}</span>
                            </div>
                        </CopyToClipboard>
                    </div>
                    <div className={'meta-mask__item'}>
                        <div className={'meta-mask__item__label'}>Balance 💰</div>
                        <div className={'meta-mask__item__value'}>
                            {ethBalance === undefined
                                ? "..."
                                : ethBalance === null
                                    ? "Error"
                                    : `Ξ${parseFloat(formatEther(ethBalance)).toPrecision(4)}`}
                        </div>
                    </div>
                    <div className={'meta-mask__item'}>
                        <div className={'meta-mask__item-transaction-container'}>
                            {
                                transactionDetail &&
                                <>
                                    <h5 style={{textAlign: 'center'}}>Transaction Detail</h5>
                                    <div className={'meta-mask__item-transaction'}>
                                        <div className={'meta-mask__item__label'}>Hash</div>
                                        <div className={'meta-mask__item__value'}>
                                            {parseFloat(formatEther(transactionDetail.hash)).toPrecision(8)}
                                        </div>
                                    </div>
                                    <div className={'meta-mask__item-transaction'}>
                                        <div className={'meta-mask__item__label'}>Miner</div>
                                        <div className={'meta-mask__item__value'}>
                                            {parseFloat(formatEther(transactionDetail.miner)).toPrecision(8)}
                                        </div>
                                    </div>
                                    <div className={'meta-mask__item-transaction'}>
                                        <div className={'meta-mask__item__label'}>Number</div>
                                        <div className={'meta-mask__item__value'}>{transactionDetail.number}</div>
                                    </div>
                                    <div className={'meta-mask__item-transaction'}>
                                        <div className={'meta-mask__item__label'}>Parent Hash</div>
                                        <div className={'meta-mask__item__value'}>
                                            {parseFloat(formatEther(transactionDetail.parentHash)).toPrecision(8)}
                                        </div>
                                    </div>
                                    <div className={'meta-mask__item-transaction'}>
                                        <div className={'meta-mask__item__label'}>Transactions</div>
                                        <div className={'meta-mask__item__value'}>
                                            {
                                                Object.keys(transactionDetail.transactions).map((c, i) => {
                                                    return (
                                                        <div key={i}>
                                                            {parseFloat(formatEther(transactionDetail.transactions[c])).toPrecision(8)}
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }

                        </div>


                    </div>
                </> : null}


            {Object.keys(connectorsByName).map(name => {
                const currentConnector = connectorsByName[name];
                const activating = currentConnector === activatingConnector;
                const connected = currentConnector === connector;
                const disabled =
                    !triedEager || !!activatingConnector || connected || !!error;

                return (
                    <button
                        className={'meta-mask__login'}
                        style={{position: 'relative'}}
                        disabled={disabled}
                        key={name}
                        onClick={() => {
                            setActivatingConnector(currentConnector);
                            activate(connectorsByName[name]);

                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: "0",
                                left: "0",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                color: "black",
                                margin: "0 0 0 1rem"
                            }}
                        >
                            {activating && (
                                <Spinner
                                    color={"black"}
                                    style={{height: "25%", marginLeft: "-1rem"}}
                                />
                            )}

                        </div>
                        {name}
                    </button>
                );
            })}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                {(active || error) && (
                    <button
                        className={'meta-mask__logout'}
                        onClick={() => {
                            deactivate();
                        }}
                    >
                        Deactivate
                    </button>
                )}
                {!!(library && account) && (
                    <button
                        className={'meta-mask__btn'}
                        onClick={() => {
                            library
                                .getSigner(account)
                                .signMessage("Вадим взламывает Ваши кошельки, оставайтесь в шоке! \n Спасибо :)")
                                .then(signature => {
                                    window.alert(`Success!\n\n${signature}`);
                                })
                                .catch(error => {
                                    window.alert(
                                        "Failure!" +
                                        (error && error.message ? `\n\n${error.message}` : "")
                                    );
                                });
                        }}
                    >
                        Sign Message
                    </button>
                )}
                {!!error && (
                    <h4 style={{marginTop: "1rem", marginBottom: "0"}}>
                        {getErrorMessage(error)}
                    </h4>
                )}
            </div>


        </div>
    );
}
