import * as React from "react";
import {UnsupportedChainIdError, useWeb3React, Web3ReactProvider} from "@web3-react/core";
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected
} from "@web3-react/injected-connector";
import {UserRejectedRequestError as UserRejectedRequestErrorFrame} from "@web3-react/frame-connector";
import {Web3Provider} from "@ethersproject/providers";
import {formatEther} from "@ethersproject/units";

import {
    authereum,
    frame,
    injected,
    torus,
} from "./connectors";
import {useEagerConnect, useInactiveListener} from "./hooks";
import {Spinner} from "./Spinner";
import Salut from "../Salut";
import RichText from "prismic-reactjs/src/Component";

const connectorsByName = {
    MetaMast: injected,
    Frame: frame,
    Torus: torus,
    Authereum: authereum
};

function getErrorMessage(error) {
    if (error instanceof NoEthereumProviderError) {
        return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
    } else if (error instanceof UnsupportedChainIdError) {
        return "You're connected to an unsupported network.";
    } else if (
        error instanceof UserRejectedRequestErrorInjected ||
        error instanceof UserRejectedRequestErrorFrame
    ) {
        return "Please authorize this website to access your Ethereum account.";
    } else {
        console.error(error);
        return "An unknown error occurred. Check the console for more details.";
    }
}

function getLibrary(provider) {
    const library = new Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
}

function MetaMaskSlice({slice}) {
    return (
        <section className="meta-mask__container">
            <RichText render={slice.primary.meta_title.raw}/>
            <Web3ReactProvider getLibrary={getLibrary}>
                <MyComponent />
            </Web3ReactProvider>
        </section>
    );
}

function MyComponent() {
    const context = useWeb3React();
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

    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = React.useState();
    React.useEffect(() => {
        console.log('running')
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);

    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect();

    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector);

    // set up block listener
    const [blockNumber, setBlockNumber] = React.useState();
    React.useEffect(() => {
        console.log('running')
        if (library) {
            let stale = false;

            console.log('fetching block number!!')
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

    // fetch eth balance of the connected account
    const [ethBalance, setEthBalance] = React.useState();
    React.useEffect(() => {
        console.log('running')
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

    // log the walletconnect URI

    return (
        <div className={'meta-mask'}>
            <div style={{margin: "0", textAlign: "right"}}>
                {active ? "🟢" : error ? "🔴" : "🟠"}
            </div>
            {active ? <Salut/> : null}
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

            {Object.keys(connectorsByName).map(name => {
                const currentConnector = connectorsByName[name];
                const activating = currentConnector === activatingConnector;
                const connected = currentConnector === connector;
                const disabled =
                    !triedEager || !!activatingConnector || connected || !!error;

                return (
                    <button
                        className={'meta-mask__login'}
                        style={{position:'relative'}}
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

                {!!error && (
                    <h4 style={{marginTop: "1rem", marginBottom: "0"}}>
                        {getErrorMessage(error)}
                    </h4>
                )}
            </div>


            <div
                style={{
                    display: "grid",
                    gridGap: "1rem",
                    gridTemplateColumns: "fit-content",
                    maxWidth: "20rem",
                    margin: "auto"
                }}
            >
                {!!(library && account) && (
                    <button
                        style={{
                            height: "3rem",
                            borderRadius: "1rem",
                            cursor: "pointer"
                        }}
                        onClick={() => {
                            library
                                .getSigner(account)
                                .signMessage("You can sign message send")
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
                {connector === torus && (
                    <button
                        style={{
                            height: "3rem",
                            borderRadius: "1rem",
                            cursor: "pointer"
                        }}
                        onClick={() => {
                            connector.close();
                        }}
                    >
                        Kill Torus Session
                    </button>
                )}
            </div>
        </div>
    );
}

export default MetaMaskSlice
