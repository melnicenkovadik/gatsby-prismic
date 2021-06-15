import * as React from 'react'
import { PreviewStoreProvider } from 'gatsby-source-prismic'
const loadableReady = require("@loadable/component").loadableReady

exports.replaceHydrateFunction = () => {
    return (element, container, callback) => {
        loadableReady(() => {
            ReactDOM.render(element, container, callback)
        })
    }
}
export const wrapRootElement = ({ element }) => (
  <PreviewStoreProvider initialEnabled={true}>{element}</PreviewStoreProvider>
)
