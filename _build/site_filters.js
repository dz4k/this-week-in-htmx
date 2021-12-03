
module.exports = function (eleventyConfig) {
    eleventyConfig.addFilter('_chatlog', text => {
        //
        const blocks = []
        let currentBlock = ''
        for (const line of text.split('\n')) {
            if (line.startsWith('  ')) {
                currentBlock += '\n' + line.substring(2)
            } else {
                blocks.push(currentBlock)
                currentBlock = line
            }
        }
        if (blocks[0] == '') blocks.shift()

        blocks.forEach((block, i) => {
            blocks[i] = block
                .replace(/^([^\-](?:[^:]|\\:)*):/m, ' <b class="author">$1</b>') // Author
                .replace(/^--- (.*) ---/m, ' <i class="stage-direction">$1</i>') // Actions
                .replace(/\[Re\. ((?:[^:]|\\:)+): ([^\]]+)\]/, // Reply to
                    '<span class="replyto">&rarrhk; Re. <b>$1</b> <span>$2</span></span>')
                .replace(/\[(\p{So})(\d+)\]/gu, // Reactions 
                    '<span class="reaction"><span class="emoji">$1</span> $2</span>')
        })

        return blocks.join('\n\n')
    })
    
    eleventyConfig.addFilter('discordUrl', href => {
        if (href.startsWith('http')) return href
        return 'https://discordapp.com/channels/' + href
    })
    
    let twitterUrl
    eleventyConfig.addFilter('twitterUrl', twitterUrl = href => {
        if (href.startsWith('http')) return href
        return 'https://twitter.com/' + href.replace('/', '/status/')
    })

    eleventyConfig.addFilter('twitterProfile', href => {
        const url = new URL(twitterUrl(href))
        url.pathname = '/' + url.pathname.split('/')[1]
        return url
    })

    eleventyConfig.addFilter('twitterHandle', href => {
        const url = new URL(twitterUrl(href))
        return '@' + url.pathname.split('/')[1]
    })

    eleventyConfig.addFilter('cite', (a1, a2) => {
        console.log(typeof a2 === 'string'?a2:a1)
        const url = new URL(typeof a2 === 'string' ? a2 : a1)
        let title = typeof a2 === 'string' ? a1 : undefined
        
        if (title === undefined) {
            if (url.hostname === 'twitter.com') {
                title = '@' + url.pathname.split('/')[1]
            } else {
                title = url
            }
        }

        return `<footer>&mdash; <a href="${url}">${title}</a></footer>`
    })
}
