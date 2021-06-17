import { InjectedConnector } from "@web3-react/injected-connector";
import { FrameConnector } from "@web3-react/frame-connector";
import { TorusConnector } from "@web3-react/torus-connector";
import { AuthereumConnector } from "@web3-react/authereum-connector";

export const injected = new InjectedConnector({
    supportedChainIds: [1]
});
export const frame = new FrameConnector({ supportedChainIds: [1] });

export const torus = new TorusConnector({ chainId: 1 });

export const authereum = new AuthereumConnector({ chainId: 1 });
