/**
 * Created by m on 16-2-5.
 */

var scraper = require('scraperjs');
var url = 'http://bbs.wfun.com';



module.exports = function () {
    var str = "";
    scraper.StaticScraper.create(url)
        .scrape(function ($) {
            return $("#homegrids_c_2 a").map(function () {
                //var get_content =  $(this).text();
                return {
                     title: $(this).attr('title'),
                     href: $(this).attr('href')
                };
                //return $(this).attr('href');
            }).get();
        })
        .then(function (news) {
            news.forEach(function (newt) {
                console.log('------------');
                console.log('标题：' + newt.title);
                console.log('链接：' + newt.href);
            })
        })
};


module.exports = function () {
    scraper.StaticScraper.create(url)
        .scrape(function ($) {
            return $('').map(function () {
                return $(this).attr('href');
            }).get();
        })
        .then(function (h) {
            console.log(h);
        })
};