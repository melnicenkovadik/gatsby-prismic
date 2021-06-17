const path = require('path')

const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

exports.onCreateWebpackConfig = ({stage, loaders, actions}) => {
    if (stage === "build-html" || stage === "develop-html") {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /web3/,
                        use: loaders.null(),
                    },
                    {
                        test: /@web3-react\/injected-connector/,
                        use: loaders.null(),
                    },
                ],
            },
        });
    }
    actions.setWebpackConfig({
        plugins: [new NodePolyfillPlugin()],

    });
};

exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions

    const pages = await graphql(`{
    allPrismicPage {
      nodes {
        id
        uid
        lang
        type
        url
      }
    }
    allPrismicHomepage {
      nodes {
        url
        type
        lang
      }
    }
  }`)

    pages.data.allPrismicPage.nodes.forEach((page) => {
        createPage({
            path: page.url,
            component: path.resolve(__dirname, 'src/templates/Page.js'),
            context: {...page},
        })
    })

    pages.data.allPrismicHomepage.nodes.forEach((page) => {
        createPage({
            path: page.url,
            component: path.resolve(__dirname, 'src/templates/Homepage.js'),
            context: {...page},
        })
    })
}
