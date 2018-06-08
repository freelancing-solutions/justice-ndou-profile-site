
//profiles
const this_menuitems = document.getElementsByName('menuitems');
function clearActive() {
    for (i = 0; i < this_menuitems.length; i++) {
        this_menuitems[i].classList.remove("active");

    }
}
document.getElementById('softwareprojectslinkid').addEventListener("click", function () {
       clearActive();
       this.classList.add("active");
       $.ajax({
            type: "get",
            url: "/profiles/software-projects",
            data: "",
            cache: true,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});
//
document.getElementById('servicesid').addEventListener("click", function () {
       clearActive();
       this.classList.add("active");
       $.ajax({
            type: "get",
            url: "/profiles/services",
            data: "",
            cache: true,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});


document.getElementById('linkedinprofileid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");
       $.ajax({
            type: "get",
            url: "/profiles/linkedin",
            data: "",
            cache: true,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});

// blog

document.getElementById('programmingid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");
       $.ajax({
            type: "get",
            url: "/blog/programming",
            data: "",
            cache: false,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});

document.getElementById('scienceid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");

       $.ajax({
            type: "get",
            url: "/blog/science",
            data: "",
            cache: false,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});

document.getElementById('philosophyid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");
       $.ajax({
            type: "get",
            url: "/blog/philosophy",
            data: "",
            cache: false,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});
document.getElementById('mathematicsid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");
       $.ajax({
            type: "get",
            url: "/blog/mathematics",
            data: "",
            cache: false,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});


document.getElementById('hackerid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");
    $.ajax({
         type: "get",
         url: "/blog/hacking",
         data: "",
         cache: false,
         success: function (html) {
             $('#mainbodyinfdiv').html(html)
         }
     });
});


// social media links

document.getElementById('facebookid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");
       $.ajax({
            type: "get",
            url: "/social/facebook",
            data: "",
            cache: false,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});
//googleid
document.getElementById('googleid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");
       $.ajax({
            type: "get",
            url: "/social/google",
            data: "",
            cache: false,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});
// twitterid
document.getElementById('twitterid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");
       $.ajax({
            type: "get",
            url: "/social/twitter",
            data: "",
            cache: false,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});
//quoraid
document.getElementById('quoraid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");
       $.ajax({
            type: "get",
            url: "/social/quora",
            data: "",
            cache: false,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});



//youtubeid
document.getElementById('youtubeid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");
       $.ajax({
            type: "get",
            url: "/social/youtube",
            data: "",
            cache: false,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});


//Hireme

document.getElementById('dohireid').addEventListener("click", function(){
    clearActive();
    this.classList.add("active");
    $.ajax({
        type: "get",
        url: "/services/dohire",
        data: "",
        cache: false,
        success: function(html){
            $('#mainbodyinfdiv').html(html)
        }
    });
});
//checkrequeststatusid
document.getElementById('checkrequeststatusid').addEventListener("click", function(){
    clearActive();
    this.classList.add("active");
    $.ajax({
        type: "get",
        url: "/services/request-status",
        data: "",
        cache: false,
        success: function(html){
            $('#mainbodyinfdiv').html(html)
        }
    });
});

// TODO- use google api for news and any other available API's to populate our blog upon launch,
// TODO- blog pages must be summaries with links to the original article///

// use this get request https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=3b2be7ef781441f4bde537854ffff2bf
const apiKey = '3b2be7ef781441f4bde537854ffff2bf';

const main = document.querySelector('main');
const now = new Date();
const this_year = now.getFullYear();
const this_month = now.getMonth();
const this_day = now.getDay();
const this_date = this_year + "-" + this_month + "-" + this_day;
const this_pagesize = 100;
var topics_list = ["CyberAttacks","Hacking Tools","Linux","Kali Linux","Hacking","Penetration Testing Algorithms",
"Botnets","Botnet Mining","Hackers","Penetration Testing","DDOS","Networking","State Sponsored Hacking","Maths","Mathematics in Programming","Mathematics",
"Numerical Algorithms","Graph Theory","Cryptography","Numerical Analysis","Theory of Everything","Number Theory","Combinatorials","Programming","Python Algorithms",
"Algorithms","AI Algorithms","Advanced Algorithms","Cryptographic Algorithms","Javascript","Python27","HTML5",
"CSS3","Jquery","Jinja2","Jinja-Templating","Google App Engine","Google App Engine","Physics","Nanotechnolodgy",
"Space Exploration","Advanced Physics","Astronomy","Mechanical Engineering","Chemical Engineering","Biotech"];


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
  function randomizeTopics(){
    
    randomized = shuffle(topics_list)
    temp_string = ""
    for (i = 0; i < randomized.length; i++){

        if (i === 0){
            temp_string = '"'+ randomized[i] + '"'
        }else{
            temp_string = temp_string + ' OR "'   + randomized[i] + '"'
        }
        
    }
    return temp_string

}

//window.addEventListener('load', e =>{
//updateNews();
//}); https://newsapi.org/v2/everything?q=bitcoin&apiKey=3b2be7ef781441f4bde537854ffff2bf

async function updateNews(){
    const res = await fetch('https://newsapi.org/v2/everything?q='+ randomizeTopics() +'&pageSize='+ this_pagesize +'&from='+this_date+'&apiKey='+apiKey);
    const json = await res.json();
    main.innerHTML = json.articles.map(createArticle).join('\n');

}

function createArticle(article){
    return `
<div class="box box-body with-border">
    <div class="box box-header with-border">
        <a href="${article.url}">
            <h3 class="box-title">${article.title}</h3>
        </a>
    </div>
<div class="polaroid">
    <img src="${article.urlToImage}" style="width:100%">
    <div class="polatext">
     ${article.description}
    </div>
</div>

</div>

    `;
}
console.log(randomizeTopics());
updateNews();
