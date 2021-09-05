const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (url) => {
    return await axios.get(url)
    .then(response => {
        const $ = cheerio.load(response.data);
        const name = $('h1.wt-text-body-03').html().trim();
        const image = $('li.wt-position-absolute > img').attr('src');
        const price = $('div.wt-mb-lg-0.wt-mb-xs-6[data-buy-box=""]>div>div>div>div>p').html().trim().replace(/,/g, '').match(/\d+.\d+/)[0];
        return ({
            name,
            image,
            price
        });
    });
}