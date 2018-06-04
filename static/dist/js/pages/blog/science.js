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
const this_pagesize = 25;
const thisTopics ='"Fusion" OR "Atomic Physics" OR "Physics" OR "Nanotechnolodgy" OR "Space Exploration" OR "Advanced Physics" OR "Astronomy" OR "Mechanical Engineering" OR "Chemical Engineering" OR "Biotech" ';

//window.addEventListener('load', e =>{
//updateNews();
//}); https://newsapi.org/v2/everything?q=bitcoin&apiKey=3b2be7ef781441f4bde537854ffff2bf

async function updateNews(){
    const res = await fetch('https://newsapi.org/v2/everything?q='+thisTopics+'&pageSize='+this_pagesize+'&from='+this_date+'&apiKey='+apiKey);
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

document.getElementById('advertcode').innerHTML = advertCode;
