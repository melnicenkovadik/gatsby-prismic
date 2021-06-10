import React, {useEffect, useState} from 'react'
import {RichText} from 'prismic-reactjs'
import GatsbyLink from '../GatsbyLink'

const EmailSignup = ({slice}) => {
    const [email, setEmail] = useState('')
    useEffect(() => {
        }, [email]
    );

    async function f(e) {
        const token = '1542555512:AAGinPQYiW8irTk6zbhb1zYvdgS2bxFzd_Y'
        const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=-538941601&text=Email:${email}`.split(' ').join('')
        await fetch(url)
    }

    return (
        <section className="email-signup">
            <div className="description">
                <RichText render={slice.primary.section_title.raw || []}/>
                <RichText
                    render={slice.primary.description.raw || []}
                    serializeHyperlink={GatsbyLink}
                />
            </div>
            <div className="form">
                <RichText render={slice.primary.input_label.raw || []}/>
                <input
                    className="email-input"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    name="FirstName"
                    value={email}
                    placeholder={RichText.asText(slice.primary.input_placeholder.raw || [])}
                />

                <input
                    onClick={() => {
                        setEmail('')
                        f()
                    }}
                    className="btn"
                    disabled={!email}
                    type="submit"
                    value={RichText.asText(slice.primary.button_text.raw || [])}
                />
            </div>
        </section>
    )
}

export default EmailSignup
