import React from "react";
import {Web3ReactProvider} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import RichText from "prismic-reactjs/src/Component";
import {Web3ReactProviderComponent} from "../Web3ReactProviderComponent";


const getLibrary = (provider) => {
    const library = new Web3Provider(provider );
    library.pollingInterval = 8000;
    return library;
}

const MetaMaskSlice = ({slice}) => {
    return (
        <section className="meta-mask__container">
            <RichText render={slice.primary.meta_title.raw}/>
            <Web3ReactProvider getLibrary={getLibrary}>
                <Web3ReactProviderComponent/>
            </Web3ReactProvider>
        </section>
    );
}

export default MetaMaskSlice
