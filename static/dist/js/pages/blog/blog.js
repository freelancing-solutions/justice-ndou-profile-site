


// TODO- use google api for news and any other available API's to populate our blog upon launch,
// TODO- blog pages must be summaries with links to the original article///

// use this get request https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=3b2be7ef781441f4bde537854ffff2bf


function get_blog_articles(){

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

    fetch('https://newsapi.org/v2/everything?q='+thisTopics+'&pageSize='+this_pagesize+'&from='+this_date+'&apiKey='+apiKey,{ mode:'no-cors',method:'GET'})    
        .then(function(response){
            if (!response.ok) {
                throw Error(response.statusText);
            }else{
                return response.json();            
            }
        }).then(function(data){
                main.innerHTML = data.articles.map(createArticle).join('\n');
        })    
        .catch(function(error) {
            console.log('Looks like there was a problem: \n', error);
        });        


    function createArticle(article){
        if (article.url.startsWith("http:")) {
            article.url.replace("http:", "https:")
        }
        // if (article.urlToImage.startsWith("http:")) {
        //     // try loading the image and then displaying it here using javascript calls
        //     article.url.replace("http:", "https:")
        // }

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
}