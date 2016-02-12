##scraperjs
A complete and versatile web scraper.

Scraperjs 是一个网页抓取模块，是的网页抓取变成一个简单的工作。

### Installing
```
npm install scraperjs
```
如果你想进行测试（这是可选的，在安装的时候加上 --save-dev)
```
grunt test
```
一些特性你需要安装phantomjs

#Getting started （开始）
Scraperjs暴露了两种不同的scrapers.
- 静态抓取，这是一个轻快的方式，但是不允许应用在一些复杂的情况，就像抓取动态内容
- 动态抓取，这种方法有点繁杂，但是可以允许抓取动态内容，就像浏览器的控制台。
这两种都暴露出简单的API，但在抓取的时候有一些微小差别。

##让我们用两种方法来抓取黑客的新闻
并尝试观察其不同之处

静态抓取
```javascript
var scraperjs = require('scraperjs');
scraperjs.StaticScraper.create('https://news.ycombinator.com/')
	.scrape(function($) {
		return $(".title a").map(function() {
			return $(this).text();
		}).get();
	})
	.then(function(news) {
		console.log(news);
	})
```
scrape 允许接受一个函数包含要抓取的页面，然后返回结果，只允许接受一个参数。但仍然非常强大。
scraperjs在后台使用cheerio。

动态抓取
```javascript
var scraperjs = require('scraperjs');
scraperjs.DynamicScraper.create('https://news.ycombinator.com/')
	.scrape(function($) {
		return $(".title a").map(function() {
			return $(this).text();
		}).get();
	})
	.then(function(news) {
		console.log(news);
	})
```
同样，scrape允许接受一个函数去抓取页面，唯一的不同是，我们使用了动态抓取，该函数只能被封装在当前
页面，所以，不能使用闭包。这意味着在这种scrape中，你不能在scrape函数中调用未定义的函数。另外，scraing函数的返回结果必须是JSON格式
我们使用phantom和phantomjs来实现，当然也使用了jQuery。

无论如何，你可以在任何scraper中使用JSON数据

The $ varible received by the scraping function is, only for the dynamic scraper, hardcoded.

##Show me the way! (aka Routes)

为了更加灵活的抓取和爬虫，我们有时可能需要浏览许多的网页，而且我们也不想去映射各样的url样式，所以我们提供了Router 类。

##Example
```javascript
var scraperjs = require('scraperjs'),
	router = new scraperjs.Router();
 
router
	.otherwise(function(url) {
	console.log("Url '"+url+"' couldn't be routed.");
});
 
var path = {};
 
router.on('https?://(www.)?youtube.com/watch/:id')
	.createStatic()
	.scrape(function($) {
		return $("a").map(function() {
			return $(this).attr("href");
		}).get();
	})
	.then(function(links, utils) {
		path[utils.params.id] = links
	})
 
router.route("https://www.youtube.com/watch/YE7VzlLtp-4", function() {
	console.log("i'm done");
});
```
