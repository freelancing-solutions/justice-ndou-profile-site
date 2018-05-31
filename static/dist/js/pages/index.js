
//profiles

document.getElementById('softwareprojectslinkid').addEventListener("click", function () {
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

document.getElementById('linkedinprofileid').addEventListener("click", function () {
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


//youtubeid
document.getElementById('youtubeid').addEventListener("click", function () {
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


// use this get request https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=3b2be7ef781441f4bde537854ffff2bf
const apiKey = '3b2be7ef781441f4bde537854ffff2bf';

const advertCode = `
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-format="fluid"
     data-ad-layout-key="-fb+5w+4e-db+86"
     data-ad-client="ca-pub-7790567144101692"
     data-ad-slot="7246754264"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

`

const main = document.querySelector('main');
const now = new Date();
const this_year = now.getFullYear();
const this_month = now.getMonth();
const this_day = now.getDay();
const this_date = this_year + "-" + this_month + "-" + this_day;

//window.addEventListener('load', e =>{
//updateNews();
//}); https://newsapi.org/v2/everything?q=bitcoin&apiKey=3b2be7ef781441f4bde537854ffff2bf

async function updateNews(){
    const res = await fetch('https://newsapi.org/v2/everything?q="freelance" OR "cryptocurrency" OR "crypto-coins" OR "Crypto-Currency"  OR "crypto Mining" OR "bitcoin" OR "Python27 Development" or "Python27 Developers" OR "Google Cloud" OR "AI" or "Artificial Intelligence"&pageSize=25&sortBy=publishedAt,relevancy,popularity&from='+this_date+'&apiKey='+apiKey);
    const json = await res.json();
    main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article){
    return `
<div class="box box-body with-border">
    <div class="box box-header with-border">
        <a href="${article.url}">
            <h2 class="box-title">${article.title}</h2>
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
document.getElementById('mainadvertcode').innerHTML = advertCode;