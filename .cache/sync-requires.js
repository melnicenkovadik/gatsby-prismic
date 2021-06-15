
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-404-js": preferDefault(require("C:\\Users\\melni\\WebstormProjects\\course\\multilang\\multilang-prismic-gatsby-example\\src\\pages\\404.js")),
  "component---src-pages-preview-js": preferDefault(require("C:\\Users\\melni\\WebstormProjects\\course\\multilang\\multilang-prismic-gatsby-example\\src\\pages\\preview.js")),
  "component---src-templates-homepage-js": preferDefault(require("C:\\Users\\melni\\WebstormProjects\\course\\multilang\\multilang-prismic-gatsby-example\\src\\templates\\Homepage.js")),
  "component---src-templates-page-js": preferDefault(require("C:\\Users\\melni\\WebstormProjects\\course\\multilang\\multilang-prismic-gatsby-example\\src\\templates\\Page.js"))
}

