
module.exports = {
    permalink: '/issue/{{ Issue }}/',
    layout: 'issue',
    eleventyComputed: {
        title: data => `Issue № ${data.Issue}: ${data.Title}`,
        authors: data => data.Authors.map(author => {
            const sp = author.split(/[<>]/g)
            return { name: sp[0].trim(), url: sp[1] }
        }),
        description: data => data.Description,
    }
}
