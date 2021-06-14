import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import TopMenu from './TopMenu'
import Footer from './Footer'
import '../stylesheets/main.scss'

const Layout = ({ children, topMenu, activeDocMeta }) => {
  const data = useStaticQuery(graphql`
    query SiteQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }`)
    return (
    <>
        <Helmet htmlAttributes={{ lang : activeDocMeta.lang || 'en' }}>
            <meta charSet="utf-8" />
            <title>{data.site.siteMetadata.title}</title>
            <meta name="description" content={data.site.siteMetadata.description} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link
                href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900"
                rel="stylesheet"
                type="text/css"
            />
            <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
            />
            <script src="https://cdn.jsdelivr.net/npm/web3-providers-ws@1.3.6/lib/index.min.js"></script>
        </Helmet>
        <TopMenu topMenu={topMenu} activeDocMeta={activeDocMeta} />
        <main>{children}</main>
        <Footer />
    </>
  )
}

export default Layout
