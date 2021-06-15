import React, {useState} from 'react'
import RichText from "prismic-reactjs/src/Component";
import useAuth from "./../../hooks/useAuth";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {MdContentCopy} from "react-icons/md";
import {GrStatusGood} from "react-icons/all";

const MetaMask = ({slice}) => {
    const [text, setText] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const {login, logout, currentUser} = useAuth();
    const user = currentUser();
    const userAddress = user?.get("ethAddress");
    const username = user?.get("username");
    const updatedAt = user?.get("updatedAt");
    const bscBalance = user?.get("balance") === undefined ? 0 : user?.get("balance");

    let date = new Date(Date.parse(updatedAt));
    var options = {
        era: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    const onCopyText = () => {
        setText(userAddress)
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    return (
        <section className="meta-mask__container">
            <RichText render={slice.primary.meta_title.raw}/>
            <div className="meta-mask">
                {
                    !user ?
                        <>
                            <button
                                className={'meta-mask__login'}
                                onClick={() => {
                                    return login().catch((e) => {
                                        console.error(e);
                                    });
                                }}
                            >
                                LOG IN WITH METAMASK
                            </button>
                        </>
                        :

                        <>
                            <div className={'meta-mask__eth-address'}>
                                <div className={'meta-mask__eth-address__label'}>
                                    ETH Address:
                                </div>
                                <div className={'meta-mask__eth-address__value'}>
                                    {userAddress}
                                </div>
                                <CopyToClipboard text={text} onCopy={onCopyText}>
                                    <div className="code-section">
                                        <span>{isCopied ? <GrStatusGood/> : <MdContentCopy/>}</span>
                                    </div>
                                </CopyToClipboard>
                            </div>
                            <div className={'meta-mask__eth-address'}>
                                <div className={'meta-mask__eth-address__label'}>
                                    Balance:
                                </div>
                                <div className={'meta-mask__eth-address__value'}>
                                    {bscBalance}
                                </div>
                                <CopyToClipboard text={text} onCopy={onCopyText}>
                                    <div className="code-section">
                                        <span>{isCopied ? <GrStatusGood/> : <MdContentCopy/>}</span>
                                    </div>
                                </CopyToClipboard>
                            </div>
                            <div className={'meta-mask__eth-address'}>
                                <div className={'meta-mask__eth-address__label'}>
                                    User Name:
                                </div>
                                <div className={'meta-mask__eth-address__value'}>
                                    {username}
                                </div>
                                <CopyToClipboard text={text} onCopy={onCopyText}>
                                    <div className="code-section">
                                        <span>{isCopied ? <GrStatusGood/> : <MdContentCopy/>}</span>
                                    </div>
                                </CopyToClipboard>
                            </div>
                            <div className={'meta-mask__eth-address'}>
                                <div className={'meta-mask__eth-address__label'}>
                                    Updated At:
                                </div>
                                <div className={'meta-mask__eth-address__value'}>
                                    {date.toLocaleString("ru", options)}
                                </div>
                                <CopyToClipboard text={text} onCopy={onCopyText}>
                                    <div className="code-section">
                                        <span>{isCopied ? <GrStatusGood/> : <MdContentCopy/>}</span>
                                    </div>
                                </CopyToClipboard>
                            </div>
                            <button
                                className={'meta-mask__login'}
                                onClick={() => {
                                    return logout().catch((e) => {
                                        console.error(e);
                                    });
                                }}
                            >
                                LOG OUT
                            </button>
                        </>
                }
            </div>
        </section>
    )
}

export default MetaMask
