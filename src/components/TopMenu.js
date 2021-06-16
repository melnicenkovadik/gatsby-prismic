import React from 'react'
import {graphql, Link} from 'gatsby'
import {RichText} from 'prismic-reactjs'
import LanguageSwitcher from './LanguageSwitcher'
import logo from '../images/logo.png'

const TopMenu = ({topMenu, activeDocMeta}) => {
    const renderedMenuLinks = topMenu.menu_links
        ? topMenu.menu_links.map((menuLink, index) => (
            <div key={`top-nav-${index}`}>
                <Link id={menuLink.link.id} to={menuLink.link.url}>
                    {RichText.asText(menuLink.label.raw)}
                </Link>
            </div>
        ))
        : null

    return (
        <header>

            <Link to="/">
                <img className="logo" src={logo} alt="Site logo"/>
            </Link>
            <div className="menu">
                <div>
                    {renderedMenuLinks}
                    <LanguageSwitcher activeDocMeta={activeDocMeta}/>
                </div>
            </div>

        </header>
    )
}

export const query = graphql`
    fragment TopMenuFragment on PrismicTopMenu {
        type
        lang
        data {
            menu_links {
                label {
                    raw
                    html
                    text
                }
                link {
                    id
                    url
                }
            }
        }
    }
`

export default TopMenu
