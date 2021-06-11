import React from 'react'
import RichText from "prismic-reactjs/src/Component";
import {useAuth} from "./../../hooks/useAuth";

const MetaMask = ({slice}) => {
    const {login, logout, currentUser} = useAuth();
    const user = currentUser();
    const userAddress = user?.get("ethAddress");

    React.useEffect(() => {
    }, [user]);
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
                            <p>ETH Address: {userAddress}</p>
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
