// prefer default export if available
const preferDefault = m => (m && m.default) || m

exports.components = {
  "component---src-pages-404-js": () => import("./../../../src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */),
  "component---src-pages-preview-js": () => import("./../../../src/pages/preview.js" /* webpackChunkName: "component---src-pages-preview-js" */),
  "component---src-templates-homepage-js": () => import("./../../../src/templates/Homepage.js" /* webpackChunkName: "component---src-templates-homepage-js" */),
  "component---src-templates-page-js": () => import("./../../../src/templates/Page.js" /* webpackChunkName: "component---src-templates-page-js" */)
}

