const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (url) => {
    axios.get(url)
    .then(response => {
        const $ = cheerio.load(response.data);
        const name = $('h1.wt-text-body-03').html().trim();
        const image = $('li.wt-position-absolute > img').attr('src');
        const price = $('div.wt-mb-lg-0.wt-mb-xs-6[data-buy-box=""]>div>div>div>div>p').html().trim().replace(/,/g, '').match(/\d+.\d+/)[0];
        console.log( {
            name,
            image,
            price
        });
    });
}


// async function scrapeProduct(url){

//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url);

//     const [el] = await page.$x(`//*[@id="listing-right-column"]/div/div[1]/div[1]/div/div/div/div/div[1]/ul/li[1]/img`);
//     const src = await el.getProperty('src');
//     const srcTxt = await src.jsonValue();

//     const [el2] = await page.$x(`//*[@id="listing-page-cart"]/div[3]/div[1]/div[1]/div/div[1]/p[1]`);
//     const price = await el2.getProperty('textContent');
//     const priceTxt = JSON.stringify(await price.jsonValue()).match(/\d+.\d+/)[0] + " TL";

//     const [el3] = await page.$x(`//*[@id="listing-page-cart"]/div[2]/h1`);
//     const name = await el3.getProperty('textContent');
//     const nameTxt = JSON.stringify(await name.jsonValue()).replace(/\\n|"/g,'').trim();

//     browser.close();
//     return {
//         name: nameTxt,
//         image: srcTxt,
//         price: priceTxt
//     }
// }



// async function createProduct(url){
//     console.log(await scrapeProduct(url));
// }

// createProduct("https://www.etsy.com/listing/888881112/personalized-gift-glass-art-first?ref=hp_rv-4");