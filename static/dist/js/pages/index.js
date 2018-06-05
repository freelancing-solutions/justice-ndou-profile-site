
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
            cache: true,
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
            cache: true,
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
            cache: true,
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
            cache: true,
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
         cache: true,
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
            cache: true,
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
            cache: true,
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
            cache: true,
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
            cache: true,
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
            cache: true,
            success: function (html) {
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
const this_pagesize = 50;
const thisTopics = '"CyberAttacks" OR "Hacking Tools" OR "Linux" OR "Kali Linux" OR "Hacking" OR "Penetration Testing Algorithms" OR "Botnets" OR "Botnet Mining" OR  "Hackers" OR "Penetration Testing" OR "DDOS" OR "Networking" OR "State Sponsored Hacking" OR "Maths" OR "Mathematics in Programming" OR "Mathematics" OR "Numerical Algorithms" OR "Graph Theory"  OR "Cryptography" OR "Numerical Analysis" OR "Theory of Everything" OR "Number Theory" OR "Combinatorials" OR "Programming" OR "Python Algorithms" OR "Algorithms" OR "AI Algorithms" OR "Advanced Algorithms"  OR "Cryptographic Algorithms" OR "Javascript" OR "Python27" OR "HTML5" OR "CSS3" OR "Jquery" OR "Jinja2" OR "Jinja-Templating" OR "Google App Engine" OR "Google App Engine" OR "Physics" OR "Nanotechnolodgy" OR "Space Exploration" OR "Advanced Physics" OR "Astronomy" OR "Mechanical Engineering" OR "Chemical Engineering" OR "Biotech"';

//window.addEventListener('load', e =>{
//updateNews();
//}); https://newsapi.org/v2/everything?q=bitcoin&apiKey=3b2be7ef781441f4bde537854ffff2bf

async function updateNews(){
    const res = await fetch('https://newsapi.org/v2/everything?q='+thisTopics+'&pageSize='+ this_pagesize +'&from='+this_date+'&apiKey='+apiKey);
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

updateNews();
