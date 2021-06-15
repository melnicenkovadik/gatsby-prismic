var plugins = [{
      name: 'gatsby-source-prismic',
      plugin: require('C:/Users/melni/WebstormProjects/course/multilang/multilang-prismic-gatsby-example/node_modules/gatsby-source-prismic/gatsby-ssr'),
      options: {"plugins":[],"repositoryName":"multilang-prismic-gatsby-example","accessToken":"","releaseID":"","schemas":{"homepage":{"Main":{"display_title":{"type":"StructuredText","config":{"single":"heading1","label":"display_title"}},"body":{"type":"Slices","fieldset":"Slice zone","config":{"labels":{"headline_with_button":[],"full_width_image":[],"info_with_image":[],"text_info":[],"email_signup":[],"my_projects":[]},"choices":{"headline_with_button":{"type":"Slice","fieldset":"Headline with button","description":"Headline & description with button","icon":"library_books","display":"list","non-repeat":{"headline":{"type":"StructuredText","config":{"single":"heading1, heading2","label":"headline"}},"description":{"type":"StructuredText","config":{"multi":"paragraph, strong, em, hyperlink, list-item, o-list-item","allowTargetBlank":true,"label":"description"}},"button":{"type":"Image","config":{"constraint":{"width":235,"height":75},"thumbnails":[],"label":"button"}}},"repeat":{}},"full_width_image":{"type":"Slice","fieldset":"Full width image","description":"Full page width featured image","icon":"image","display":"list","non-repeat":{"background_image_position":{"type":"Select","config":{"options":["Left","Right"],"default_value":"Left","label":"background_image_position"}},"image":{"type":"Image","config":{"constraint":{"width":1080,"height":580},"thumbnails":[],"label":"image"}}},"repeat":{}},"info_with_image":{"type":"Slice","fieldset":"Info with image","description":"Text section with featured image","icon":"art_track","display":"list","non-repeat":{"featured_image":{"type":"Image","config":{"constraint":{"width":600,"height":690},"thumbnails":[{"name":"tablet","width":800,"height":400},{"name":"mobile","width":400,"height":300}],"label":"featured_image"}},"section_title":{"type":"StructuredText","config":{"single":"heading1,heading2","label":"section_title"}},"text":{"type":"StructuredText","config":{"multi":"paragraph,heading3,strong,em,hyperlink,list-item,o-list-item","allowTargetBlank":true,"label":"text"}}},"repeat":{"skill_img":{"type":"Image","config":{"constraint":{},"thumbnails":[],"label":"skill img"}}}},"text_info":{"type":"Slice","fieldset":"Text info","description":"2 column text section","icon":"subject","display":"list","non-repeat":{"section_title":{"type":"StructuredText","config":{"single":"heading1, heading2","label":"section_title"}},"left_column_text":{"type":"StructuredText","config":{"multi":"paragraph, heading3, strong, em, hyperlink, list-item, o-list-item","allowTargetBlank":true,"label":"left_column_text"}},"right_column_text":{"type":"StructuredText","config":{"multi":"paragraph, heading3, strong, em, hyperlink, list-item, o-list-item","allowTargetBlank":true,"label":"right_column_text"}}},"repeat":{}},"email_signup":{"type":"Slice","fieldset":"Email signup","description":"Email signup form","icon":"email","display":"list","non-repeat":{"section_title":{"type":"StructuredText","config":{"single":"heading1, heading2","label":"section_title"}},"description":{"type":"StructuredText","config":{"multi":"paragraph, strong, em, hyperlink, list-item, o-list-item","allowTargetBlank":true,"label":"description"}},"input_label":{"type":"StructuredText","config":{"single":"paragraph","label":"input_label"}},"input_placeholder":{"type":"StructuredText","config":{"single":"paragraph","label":"input_placeholder"}},"button_text":{"type":"StructuredText","config":{"single":"paragraph","label":"button_text"}}},"repeat":{}},"my_projects":{"type":"Slice","fieldset":"My Projects","description":"My Projects","icon":"ac_unit","display":"list","non-repeat":{"my_projects_title":{"type":"StructuredText","config":{"single":"heading1","label":"My projects title"}}},"repeat":{"item_image":{"type":"Image","config":{"constraint":{},"thumbnails":[],"label":"item image"}},"item_title":{"type":"StructuredText","config":{"single":"heading3","label":"item title"}},"item_description":{"type":"StructuredText","config":{"multi":"paragraph,preformatted,heading1,heading2,heading3,heading4,heading5,heading6,strong,em,hyperlink,image,embed,list-item,o-list-item,rtl","label":"item description"}},"item_stack_describe":{"type":"StructuredText","config":{"multi":"paragraph,preformatted,heading1,heading2,heading3,heading4,heading5,heading6,strong,em,hyperlink,image,embed,list-item,o-list-item,rtl","label":"item stack describe"}},"link":{"type":"Link","config":{"label":"link"}}}}}}}}},"page":{"Main":{"display_title":{"type":"StructuredText","config":{"single":"heading1","label":"display_title"}},"uid":{"type":"UID","config":{"label":"uid"}},"body":{"type":"Slices","fieldset":"Slice zone","config":{"labels":{"headline_with_button":[],"full_width_image":[],"info_with_image":[],"text_info":[],"email_signup":[],"my_projects":[],"blog":[],"metamask_container":[]},"choices":{"headline_with_button":{"type":"Slice","fieldset":"Headline with button","description":"Headline & description with button","icon":"library_books","display":"list","non-repeat":{"headline":{"type":"StructuredText","config":{"single":"heading1, heading2","label":"headline"}},"description":{"type":"StructuredText","config":{"multi":"paragraph, strong, em, hyperlink, list-item, o-list-item","allowTargetBlank":true,"label":"description"}},"button":{"type":"Image","config":{"constraint":{"width":235,"height":75},"thumbnails":[],"label":"button"}}},"repeat":{}},"full_width_image":{"type":"Slice","fieldset":"Full width image","description":"Full page width featured image","icon":"image","display":"list","non-repeat":{"background_image_position":{"type":"Select","config":{"options":["Left","Right"],"default_value":"Left","label":"background_image_position"}},"image":{"type":"Image","config":{"constraint":{"width":1080,"height":580},"thumbnails":[],"label":"image"}}},"repeat":{}},"info_with_image":{"type":"Slice","fieldset":"Info with image","description":"Text section with featured image","icon":"art_track","display":"list","non-repeat":{"featured_image":{"type":"Image","config":{"constraint":{"width":600,"height":690},"thumbnails":[{"name":"tablet","width":800,"height":400},{"name":"mobile","width":400,"height":300}],"label":"featured_image"}},"section_title":{"type":"StructuredText","config":{"single":"heading1,heading2","label":"section_title"}},"text":{"type":"StructuredText","config":{"multi":"paragraph,heading3,strong,em,hyperlink,list-item,o-list-item","allowTargetBlank":true,"label":"text"}}},"repeat":{"skill_img":{"type":"Image","config":{"constraint":{},"thumbnails":[],"label":"skill img"}}}},"text_info":{"type":"Slice","fieldset":"Text info","description":"2 column text section","icon":"subject","display":"list","non-repeat":{"section_title":{"type":"StructuredText","config":{"single":"heading1, heading2","label":"section_title"}},"left_column_text":{"type":"StructuredText","config":{"multi":"paragraph, heading3, strong, em, hyperlink, list-item, o-list-item","allowTargetBlank":true,"label":"left_column_text"}},"right_column_text":{"type":"StructuredText","config":{"multi":"paragraph, heading3, strong, em, hyperlink, list-item, o-list-item","allowTargetBlank":true,"label":"right_column_text"}}},"repeat":{}},"email_signup":{"type":"Slice","fieldset":"Email signup","description":"Email signup form","icon":"email","display":"list","non-repeat":{"section_title":{"type":"StructuredText","config":{"single":"heading1, heading2","label":"section_title"}},"description":{"type":"StructuredText","config":{"multi":"paragraph, strong, em, hyperlink, list-item, o-list-item","allowTargetBlank":true,"label":"description"}},"input_label":{"type":"StructuredText","config":{"single":"paragraph","label":"input_label"}},"input_placeholder":{"type":"StructuredText","config":{"single":"paragraph","label":"input_placeholder"}},"button_text":{"type":"StructuredText","config":{"single":"paragraph","label":"button_text"}}},"repeat":{}},"my_projects":{"type":"Slice","fieldset":"My Projects","description":"My Projects","icon":"ac_unit","display":"list","non-repeat":{"my_projects_title":{"type":"StructuredText","config":{"single":"heading1","label":"My projects title"}}},"repeat":{"item_image":{"type":"Image","config":{"constraint":{},"thumbnails":[],"label":"item image"}},"item_title":{"type":"StructuredText","config":{"single":"heading3","label":"item title"}},"item_description":{"type":"StructuredText","config":{"multi":"paragraph,preformatted,heading1,heading2,heading3,heading4,heading5,heading6,strong,em,hyperlink,image,embed,list-item,o-list-item,rtl","label":"item description"}},"item_stack_describe":{"type":"StructuredText","config":{"multi":"paragraph,preformatted,heading1,heading2,heading3,heading4,heading5,heading6,strong,em,hyperlink,image,embed,list-item,o-list-item,rtl","label":"item stack describe"}},"link":{"type":"Link","config":{"label":"link"}}}},"blog":{"type":"Slice","fieldset":"blog","description":"blog","icon":"add_circle_outline","display":"list","non-repeat":{"blog_title":{"type":"StructuredText","config":{"single":"heading1","label":"blog title"}}},"repeat":{"item_image":{"type":"Image","config":{"constraint":{},"thumbnails":[],"label":"item image"}},"blog_item_title":{"type":"StructuredText","config":{"single":"heading3","label":"blog item title"}},"short_description":{"type":"StructuredText","config":{"multi":"paragraph,preformatted,heading1,heading2,heading3,heading4,heading5,heading6,strong,em,hyperlink,image,embed,list-item,o-list-item,rtl","label":"short description"}},"content":{"type":"StructuredText","config":{"multi":"paragraph,preformatted,heading1,heading2,heading3,heading4,heading5,heading6,strong,em,hyperlink,image,embed,list-item,o-list-item,rtl","label":"content"}},"date":{"type":"Date","config":{"label":"date"}}}},"metamask_container":{"type":"Slice","fieldset":"MetaMask container","description":"MetaMask container","icon":"attach_money","display":"list","non-repeat":{"meta_title":{"type":"StructuredText","config":{"single":"heading3","label":"meta title"}}},"repeat":{}}}}}}},"top_menu":{"Main":{"display_title":{"type":"StructuredText","config":{"single":"heading1","label":"display_title"}},"menu_links":{"type":"Group","config":{"fields":{"label":{"type":"StructuredText","config":{"single":"paragraph","label":"label"}},"link":{"type":"Link","config":{"label":"link","placeholder":"Select a Link..."}}},"label":"menu_links"}}}}},"prismicToolbar":true},
    },{
      name: 'gatsby-plugin-react-helmet',
      plugin: require('C:/Users/melni/WebstormProjects/course/multilang/multilang-prismic-gatsby-example/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-plugin-offline',
      plugin: require('C:/Users/melni/WebstormProjects/course/multilang/multilang-prismic-gatsby-example/node_modules/gatsby-plugin-offline/gatsby-ssr'),
      options: {"plugins":[],"precachePages":["/page/metamask/","/page/*"]},
    },{
      name: 'gatsby-plugin-manifest',
      plugin: require('C:/Users/melni/WebstormProjects/course/multilang/multilang-prismic-gatsby-example/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"gatsby-starter-default","short_name":"starter","start_url":"/","background_color":"#663399","theme_color":"#663399","display":"minimal-ui","icon":"src/images/favicon.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"6a74359a1653ad46b2b5852087315b53"},
    },{
      name: 'default-site-plugin',
      plugin: require('C:/Users/melni/WebstormProjects/course/multilang/multilang-prismic-gatsby-example/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    try {
      const result = plugin.plugin[api](args, plugin.options)
      if (result && argTransform) {
        args = argTransform({ args, result })
      }
      return result
    } catch (e) {
      if (plugin.name !== `default-site-plugin`) {
        // default-site-plugin is user code and will print proper stack trace,
        // so no point in annotating error message pointing out which plugin is root of the problem
        e.message += ` (from plugin: ${plugin.name})`
      }

      throw e
    }
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
