import React from 'react'
import RichText from "prismic-reactjs/src/Component";
import useAuth from "./../../hooks/useAuth";

const MetaMask = ({slice,pageContext }) => {
    console.log(pageContext);
    const {login, logout, currentUser} = useAuth();

    return (
        <section className="meta-mask__container">
            <RichText render={slice.primary.meta_title.raw}/>
            <div className="meta-mask">
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
            </div>
        </section>
    )
}

export default MetaMask
