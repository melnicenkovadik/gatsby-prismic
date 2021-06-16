import React from 'react'
import RichText from "prismic-reactjs/src/Component";
import Web3 from "web3";
import Web3Provider, {useWeb3Context, Web3Consumer} from "web3-react";
import {InjectedConnector} from "web3-react/dist/connectors";


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
    return (
        <Web3Consumer>
            {context => {
                const {
                    active, account, networkId
                } = context;
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
