import slugify from "../../../../../utils/slugify.js"

export default {
    "headInject": "<style>main { width: min(1000px, 100%); }</style>",
    "in": "data",
    dynamicPermalink: false,
    eleventyComputed: {
        permalink: a => {
            return slugify(a.page.filePathStem.replace("/pages/garden", "")) + ".html"
        }
    }
}
