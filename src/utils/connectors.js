import {InjectedConnector} from "@web3-react/injected-connector";
import {AuthereumConnector} from "@web3-react/authereum-connector";

export let injected = new InjectedConnector({
    supportedChainIds: [  1, // Mainet
        3, // Ropsten
        4, // Rinkeby
        5, // Goerli
        42, ]
});

export const authereum = new AuthereumConnector({chainId: 1});
