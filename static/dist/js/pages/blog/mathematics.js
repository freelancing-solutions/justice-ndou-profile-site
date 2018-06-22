// use this get request https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=3b2be7ef781441f4bde537854ffff2bf
const apiKey = '41e896a0a1c94b61903408fae1a49471';



const main = document.querySelector('main');
const now = new Date();
const this_year = now.getFullYear();
const this_month = now.getMonth();
const this_day = now.getDay();
const this_date = this_year + "-" + this_month + "-" + this_day;
const this_pagesize = 25;
const thisTopics = '"Primes" OR "Geometry" OR "Space Geometry" OR "Elliptic Curve Cryptography" OR "Maths" OR "Mathematics in Programming" OR "Mathematics" OR "Numerical Algorithms" OR "Graph Theory"  OR "Cryptography" OR "Numerical Analysis" OR "Theory of Everything" OR "Number Theory" OR "Combinatorials"';

async function updateNews()
{
    fetch('https://newsapi.org/v2/everything?q='+thisTopics+'&pageSize='+this_pagesize+'&from='+this_date+'&apiKey='+apiKey,{ mode:'no-cors',method:'GET'})    
    .then(function(response){
        if (!response.ok) {
            throw Error(response.statusText);
          }else{
            const json = res.json();
            main.innerHTML = json.articles.map(createArticle).join('\n');    
          }
    })
    
    .catch(function(error) {
        console.log('Looks like there was a problem: \n', error);
    });        
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

function fetchOldArticles(){
var old_articles = JSON.parse(localStorage.getItem('article'));

for (i = 0; i < old_articles.length; i++){
 main.innerHTML += createArticle(article=old_articles[i]).join('\n');     
}

}

//fetchOldArticles();
updateNews();
