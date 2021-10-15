
module.exports = function (eleventyConfig) {
    eleventyConfig.addFilter('discordUrl', url => {
        if (url.startsWith('http')) return url
        return 'https://discordapp.com/channels/' + url
    })
}
