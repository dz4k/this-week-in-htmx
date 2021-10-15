
const
	version = new URL("https://jsonfeed.org/version/1"),
	base = new URL("https://thisweek.htmx.org"),
	homepage = new URL("https://denizaksimsek.com"),
	myName = "Deniz Akşimşek"

module.exports = class {
	data() {
		return {
		  permalink: '/feed.json'
		}
	}
	
	render({ collections, permalink }) {
		return JSON.stringify({
			version,
			title: myName,
			home_page_url: base,
			feed_url: new URL(permalink, base),
			author: {
				name: myName,
				url: homepage,
			},
			items: collections.issue.map(post => ({
				id: post.url,
				title: post.data.title,
				content_html: post.templateContent,
				url: new URL(post.url, base),
				summary: post.data.summary,	
				date_published: this.isodatetime(post.date),
			}))
		})
	}
}

