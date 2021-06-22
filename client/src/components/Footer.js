import React from 'react'
import twitterIcon from '../images/twitter.png'
import instagramIcon from '../images/instagram.png'
import facebookIcon from '../images/facebook.png'

const Footer = () => (
    <footer>
        <p className="copyright">© 2021 Powered by Prismic</p>
        <div className="social">
            <a href={'https://www.facebook.com/profile.php?id=100028478673270'}>
                <img src={facebookIcon} alt="Facebook social icon"/>
            </a>
            <a href={'https://www.instagram.com/melnyschenko/'}>
                <img src={instagramIcon} alt="Instagram social icon"/>
            </a>
        </div>
    </footer>
)

export default Footer
