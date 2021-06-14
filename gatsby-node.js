const path = require('path')

const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

exports.onCreateWebpackConfig = ({stage, loaders="\\", actions}) => {
    if (stage === "build-html") {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /portis\.js|authereum\.js/,
                        use: '/',
                    },
                ],
            },
        });
    }
    actions.setWebpackConfig({
        plugins: [new NodePolyfillPlugin()],
    });
};

exports.createPages = async ({graphql, actions,reporter}) => {
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
    if (pages.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }
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

const replacePath = path => (path === `/` ? path : path.replace(/\/$/, ``))
// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = ({ page, actions }) => {
    const { createPage, deletePage } = actions
    const oldPage = Object.assign({}, page)
    // Remove trailing slash unless page is /
    page.path = replacePath(page.path)
    if (page.path !== oldPage.path) {
        // Replace old page with new page
        deletePage(oldPage)
        createPage(page)
    }
}
exports.onCreateNode = ({ node }) => {
        console.log(node.internal.type)
}
