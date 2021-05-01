function isUrl(url) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?' + // port
        '(\\/[-a-z\\d%@_.~+&:]*)*' + // path
        '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(url);
}

function isEmpty(a) {
    return a === null || a === '';
}

function isProvince(province) {
    let province_list = ['limpopo', 'mpumalanga', 'north west', 'gauteng', 'kwazulu natal', 'eastern cape', 'western cape', 'northern cape', 'orange free state'];
    for (let i = 0; i < province_list.length; i++) {
        if (province === province_list[i]) {
            return true;
        }
    }
    return false;
}

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);

}

function validatePassword(password) {
    let re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
}

function validateUsername(username) {
    let re = /^\w+$/;
    return res.test(username);
}

function isNumber(n) {
    return typeof (n) !== "boolean" && !isNaN(n);
}

function isCell(n) {
    return !isEmpty(n) && ((n.length === 10) || (n.length === 13))
}

function isTel(n) {
    return isCell(n)
}

function isFax(n) {
    return isCell(n)
}

function getAge(dateString) {

    let dates = dateString.split("-");
    let d = new Date();

    let userday = dates[2];
    let usermonth = dates[1];
    let useryear = dates[0];

    let curday = d.getDate();
    let curmonth = d.getMonth() + 1;
    let curyear = d.getFullYear();

    let age = curyear - useryear;

    if ((curmonth < usermonth) || ((curmonth === usermonth) && curday < userday)) {
        age--;
    }
    return age;
}

function isIDNumber(n) {
    return (isNumber(n)) && (n.length === 13);
}

let myHeaders = new Headers();

let myFormHeaders = myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

let initGet = {
    method: 'GET',
    headers: myHeaders,
    redirect: "follow",
    mode: 'cors',
    credentials: 'same-origin',
    cache: 'no-cache'
};

let initNewsAPI = {
    method: 'GET',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'text/plain'
    },
    redirect: "follow",
    mode: 'cors',
    cache: 'no-cache'
};

function myFetch(myrequest, formresponse) {
    fetch(myrequest).then(function (response) {
        if (!response.ok) {
            myStatus = response.statusText;
            /**console.log(myStatus);**/
            formresponse.innerHTML = myStatus;
        } else {
            return response.text();
        }
    }).then(function (data) {
        /**console.log(data);**/
        let parser = new DOMParser();
        //let doc =  parser.parseFromString(data, 'text/html').body.innerHTML;
        //formresponse.insertAdjacentHTML('afterbegin',data);
        formresponse.innerHTML = parser.parseFromString(data, 'text/html').body.innerHTML;
       // return true;


    }).catch(function (error) {
        //console.log(error);
        formresponse.innerHTML = error;
        //return false;
    });

    return true;
}

// language=HTML
let article_template = function(article){return `
<div class="box box-body with-border">
    <div class="box box-header with-border">
        <a href="${article.url}" target="_blank">
            <h2 class="box-title">${article.title}</h2>
        </a>
        </div>
            <div class="polaroid">
                <img src="${article.urlToImage}" style="width:100%">
                <div class="polatext">
                    ${article.description}
                </div>
                <div class="box box-footer with-border">
                    <a href="${article.url}" target="_blank"><h3 class="box-title"> ${article.source.name} -  ${article.author} </h3></a>
                </div>
    
            </div>
    </div>
`};


function fetch_articles_from_cache(topic){
   this.articles = JSON.parse(localStorage.getItem(topic));
   if (this.articles === null){
       this.articles = "";
   }
   return this.articles;
}

function store_articles_to_cache(topic,articles){
    localStorage.setItem(topic,JSON.stringify(articles))

}

function clean_cache(){

}

function return_date_string(){

    let now = new Date();
    let this_year = now.getFullYear();
    let this_month = now.getMonth();
    let this_day = now.getDate();

    this.date = this_year + "-" + this_month + "-" + this_day;

    return this.date;
}

let news_api_data = function (){
    this.date;
    this.apiKey = "41e896a0a1c94b61903408fae1a49471";
    this.pagesize = 25;

    this.init_news_api = {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'text/plain'
        },
        redirect: "follow",
        mode: 'cors',
        cache: 'force-cache'
    };

    this.return_date = function(){
        this.date = return_date_string();
        return this.date;
    };
    this.return_api_key = function(){
        return this.apiKey;
    };

    this.set_api_key = function(apikey){
        if (apikey !== ""){
            this.apiKey = apikey;
            return true;
        }else{
            return false;
        }
    };

    this.return_pagesize = function(){
        return this.pagesize;
    };

    this.set_pagesize = function(size){
        if (size > 0){
            this.pagesize = size;
            return true;
        }else{
            return false;
        }
    };

    this.get_init = function(){
        return this.init_news_api;
    };

};






