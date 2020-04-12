const axios = require("axios");
const cheerio = require('cheerio');

async function doWebScraping() {
    const response = await axios.get("https://www.coindesk.com/");
    const $ = cheerio.load(response.data);

    const divElements = $("section.list-body").find("div.list-item-wrapper");
    const articleList = [];

    divElements.each((i, div) => {
        const title = $(div).find("h4").text();
        const desc = $(div).find("p").text();
        const image = $(div).find("img").attr("src");

        const article = {
            title: title,
            desc: desc,
            image: image
        }

        articleList.push(article);
    });

    return articleList;
}

async function start() {
    const articleList = await doWebScraping();
    console.log(articleList);
    // do something with the list, upload it to firestore for example
}

start();