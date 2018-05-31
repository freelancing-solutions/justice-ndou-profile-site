


// TODO- use google api for news and any other available API's to populate our blog upon launch,
// TODO- blog pages must be summaries with links to the original article///

// use this get request https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=3b2be7ef781441f4bde537854ffff2bf
const apiKey = '3b2be7ef781441f4bde537854ffff2bf';

const main = document.querySelector('main');

//window.addEventListener('load', e =>{
//updateNews();
//}); https://newsapi.org/v2/everything?q=bitcoin&apiKey=3b2be7ef781441f4bde537854ffff2bf

async function updateNews(){
    const res = await fetch('https://newsapi.org/v2/everything?q=freelancing&apiKey='+apiKey);
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

    <img src="${article.urlToImage}">
    <blockquote>
    ${article.description}
    </blockquote>
    
</div>

    `;
}
updateNews();