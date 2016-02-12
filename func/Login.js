/**
 * Created by m on 16-2-6.
 */

var superagent = require('superagent');
var cheerio = require('cheerio');

var globalCookie = "PHPSESSID=0o3b0g4nduhfjiago4lp39pqq2ml4mao;"; // zMYP_7b76_lastact=1454729713%09member.php%09logging;" +
    //" zMYP_7b76_sid=yggPRr; Hm_lvt_7186fb251fb61836db21af858694d15f=1454728570,1454728882,1454729662,1454729714; " +
    //"Hm_lpvt_7186fb251fb61836db21af858694d15f=1454729714";
var index_url = "http://bbs.wfun.com/";
    var request_url = "http://bbs.wfun.com/forum.php?mod=post&action=reply&fid=2&tid=898926&extra=page%3D1&replysubmit=yes&infloat=yes&handlekey=fastpost";
var request_urr = "http://bbs.wfun.com/forum.php?mod=post&action=reply&fid=2&tid=898895&extra=page%3D1&replysubmit=yes&infloat=yes&handlekey=fastpost";
var post_url = "http://bbs.wfun.com/member.php?mod=logging&action=login&loginsubmit=yes&loginhash=Lf05E&inajax=1";

module.exports = function login() {
    superagent
        .post(post_url)
        .send({"username": "zjwyy"})
        .send({"password": "wfun123"})
        .set("Accept-Encoding","gzip, deflate")
        .set("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .set("Cookie", globalCookie)
        //.redirect(index_url)
        .end(function (err, res) {

            postCommit();
    /*        if (err || !res.ok) {
                console.log('Error');
            } else {
                var getn = getName();
                console.log(getn);
            }
            console.log(res.status + "");*/
        })
};


/*
module.exports = function () {
    superagent
        .get('http://bbs.wfun.com/forum.php?mod=viewthread&tid=897140&pid=14017487&page=2&extra=page%3D1#pid14017487')
        .end(function (err, res) {
            var str = res.header['set-cookie'][1];
            /!*var pos = str.indexOf(';');
            console.log(str.substr(0, pos));*!/
            console.log(str);
        })
};*/

/*function getName() {
    superagent.get(index_url, function (err, res) {
        var $ = cheerio.load(res.text);
        var name = "test";
       /!* if($) {
            name = $('.name dhcss').text();
        }
        console.log(name);*!/
        console.log($);
    })
        .set("Accept-Encoding","gzip, deflate")
        .end(function (err, res) {
            if (err) {
                console.log(err);
            }
        })
        
}*/

function getName() {
    superagent.get(index_url)
        .set("Accept-Encoding","gzip, deflate")
        .end(function (err, res) {
            var $ = cheerio.load(res.text);
            var name = "test";
            if ($) {
               name = $('.has_login').text().toString();
            }
            //
            console.log(name);
            return name;
        })
}

function postCommit () {
    var post_time = Date.now().toString();
    superagent
        .post(request_url)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Cookie', globalCookie)
        .send({
            "message": "66666666666",
            "posttime": post_time.substr(0,9),
            "formhash": "6b37745a"
        })
        .end(function (err, res) {
            if (err || !res.ok) {
                console.log('Error');
            } else {
                console.log('success! : ' + res.status);
            }
        })
}