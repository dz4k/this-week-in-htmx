
const { DateTime } = require('luxon')
const path = require('path')
const fs = require('fs')

const markdownLibrary = require("markdown-it")({
    html: true,
    linkify: true,
    typographer: true,
    anchorPrefix: 'h-',
})

module.exports = function (eleventyConfig) {
    const luxify = d =>
        (d instanceof Date ? DateTime.fromJSDate(d) :
            typeof d == 'string' ? DateTime.fromISO(d) :
/* else */             DateTime.local()).setZone('UTC')

    eleventyConfig.addFilter('datetime', date => luxify(date).toLocaleString(DateTime.DATETIME_FULL))
    eleventyConfig.addFilter('datefmt', (date, fmt) => luxify(date).toFormat(fmt))
    eleventyConfig.addFilter('isodate', date => luxify(date).toISODate())
    eleventyConfig.addFilter('isodatetime', date => luxify(date).toISO())
    eleventyConfig.addFilter('isotime', date => luxify(date).toISOTime())
    eleventyConfig.addFilter('dateid', date => luxify(date).toFormat('MMddHHmmss'))


    eleventyConfig.addFilter('reverse', e => (function* () {
        for (let i = e.length - 1; i >= 0; i--) yield e[i]
    }()))

    eleventyConfig.addFilter('limit', (i, e) => (function* () {
        let n = 0
        for (const v of e) {
            if (n++ == i) break
            yield v
        }
    }()))

    eleventyConfig.addFilter('eq', (a, b) => a === b)
    eleventyConfig.addFilter('gt', (a, b) => a > b)
    eleventyConfig.addFilter('ge', (a, b) => a >= b)
    eleventyConfig.addFilter('le', (a, b) => a <= b)
    eleventyConfig.addFilter('lt', (a, b) => a < b)

    eleventyConfig.addFilter('and', (...args) => args.slice(0, -1).reduce((a, b) => a && b))
    eleventyConfig.addFilter('or', (...args) => args.slice(0, -1).reduce((a, b) => a || b))
    eleventyConfig.addFilter('not', a => !a)

    eleventyConfig.addFilter('d', (...args) =>
        args.find(arg => arg !== undefined && arg !== null))

    eleventyConfig.addFilter('replace', (haystack, needle, hay) => {
        return haystack.replace(new RegExp(needle, 'g'), hay)
    })

    eleventyConfig.addFilter('truncateUrl', url => {
        if (typeof url !== 'string') return url
        url = new URL(url)
        const path = url.pathname.split('/')
        const dotdotdot = path.length > 2 || url.query || url.hash
        if (path.length > 2) {
            url.pathname = `${path.slice(0, 2).join('/')}/`
        }
        url.query = null
        url.hash = ''
        return url.href + (dotdotdot ? '…' : '')
    })

    eleventyConfig.addPairedShortcode('fig', (body, caption, link) =>
        `

<figure><figcaption>${typeof link === 'string'
            ? `<a href="${link}">${markdownLibrary.renderInline(caption)}</a>`
            : markdownLibrary.renderInline(caption)
        }</figcaption>

${body}

</figure>

`) // `

    eleventyConfig.addShortcode('set', function ({ hash, data: { root } }) {
        Object.assign(root, hash)
    })

    eleventyConfig.addShortcode('call', f => f())

    eleventyConfig.addShortcode('eval', function (body) {
        return new Function('with (this) return ' + body).call(this)
    })

    eleventyConfig.addPairedShortcode('exec', function (body) {
        return new Function('with (this) { ' + body + ' }').call(this)
    })

    eleventyConfig.addShortcode('fread', function (pathname) {
        console.log(this.page.inputPath)
        const realpath = path.resolve(this.page.inputPath, '..', pathname)
        return fs.readFileSync(realpath, { encoding: 'utf-8' })
    })
}
