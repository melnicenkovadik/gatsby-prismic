import React from 'react'
import RichText from "prismic-reactjs/src/Component";

const MetaMask = ({slice,pageContext }) => {
    return (
        <section className="meta-mask__container">
            <RichText render={slice.primary.meta_title.raw}/>
        </section>
    )
}

export default MetaMask
