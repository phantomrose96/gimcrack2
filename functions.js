const cheerio = require('cheerio');
const rootsite = 'https://archiveofourown.org/works/8472670/';
const fetch = require('node-fetch');

function onMessage(message) {
	if(message.content.includes('!fetch')) {
		const chaptNum = message.content.match(/\d+/);
		fetchChapterLink(chaptNum[0]).then(result => {
			if(result !== '') {
				message.channel.send('Sure thing, bucko: ' + result);
			}
			else {
				message.channel.send('Hey what do I look like, a fortune teller?');
			}
		}).catch(err => console.log(err));
	}
}

async function fetchChapterLink(chapter) {
	const response = await 	fetch(rootsite);
	const HTMLText = await response.text();

	return new Promise((resolve) => {
		const $ = cheerio.load(HTMLText);
		const category = $('option').filter((_ind, element) =>element.firstChild && element.firstChild.data === `${chapter}. Chapter ${chapter}`);
		const chapSuffix = category[0] ? category[0].attribs.value : '';
		if(!chapSuffix) {
			resolve('');
		}
		resolve(rootsite + 'chapters/' + chapSuffix);
	});
}

module.exports = {
	onMessage: onMessage,
};