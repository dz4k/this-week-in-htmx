
module.exports = function (eleventyConfig) {
    eleventyConfig.addLayoutAlias('base',  'layout/base.hbs')
    eleventyConfig.addLayoutAlias('issue', 'layout/issue.hbs')

    eleventyConfig.addCollection('issue', c => c.getFilteredByGlob('issue/*'))

    eleventyConfig.addPassthroughCopy('styles')
    eleventyConfig.addPassthroughCopy('scripts')
    eleventyConfig.addPassthroughCopy({ 'node_modules/htmx.org/dist': '/vendor/htmx.org' })

    require('./_build/generic_filters')(eleventyConfig)
    require('./_build/site_filters')(eleventyConfig)

    eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-rss'))
    eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'), {
        init: ({ Prism }) => {
            require('prism-hyperscript')(Prism)
        }
    })

    return {
        markdownTemplateEngine: 'hbs'
    }
}
