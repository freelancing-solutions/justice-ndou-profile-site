let ai_topics = function(){
    //this.default_topics = "Programming" + " OR " + "Python Algorithms" + " OR " + "Algorithms" + " OR " + "AI Algorithms" + " OR " + "Advanced Algorithms"  + " OR " + "Cryptographic Algorithms" + " OR " + "Javascript" + " OR " + "Python27" + " OR " + "HTML5" + " OR " + "CSS3" + " OR " + "Jquery" + " OR " + "Jinja2" + " OR " + "Jinja-Templating" + " OR " + "Google App Engine" + " OR " + "Google App Engine";
    this.default_topics = "AI" + " OR " + "Artificial Intelligence" + " OR " + "Tensorflow" + " OR " + " Machine Learning" + " OR " + "Neural Networks" + " OR " + "Deep Neural Networks" +
        " OR " + " Genetic Algorithms" + " OR " + "Expert Systems" + " OR " + "Back Propagation Algorithms";

    this.topics = "";
    this.language = "en";

    this.set_topics = function(topics){
         if (topics !== ""){
             this.topics = topics;
             return true;
         }else{
             return false;
         }
    };

    this.get_topics = function(){
      if (this.topics !== ""){
          return this.topics;
      }else{
          this.topics = this.default_topics;
          return this.topics;
      }
    };


    this.get_language = function(){
      return this.language;
    };


    this.fetch_articles = function(date_string){
       return fetch_articles_from_cache("ai-" + date_string);
    };

    this.store_articles = function(date_string,articles){
        store_articles_to_cache("ai-" + date_string, articles);
    };

    this.fetch_backend_topics = function(){
        this.topics_url = "/topics/ai";
        this.topics_request = new Request(this.topics_url,initGet);
        this.topics_list = "";

        let self = this;

        fetch(this.topics_request).then(function(response){
            if (!response.ok){
                console.log("There was an error fetching backend ai topics");
                throw new Error("There was an error fetching backend ai topics");
            }else{
                return response;
            }
        }).then(function(data){
            return data.text();
        }).then(function(data){
            self.topics_list = data;
        }).catch(function(err){
            console.log(err);
            self.topics_list = "";
        });

        return self.topics_list;
    };

    this.fetch_backend_articles = function (){

        this.articles_url = "/articles/ai";
        this.articles_request = new Request(this.articles_url,initGet);
        this.back_end_articles = "";

        let self = this;

        fetch(this.articles_request).then(function (response) {
            if (!response.ok){
                console.log("Error fetching backend ai articles");
                throw new Error("Error fetching backend ai articles");
            }else{
                return response;
            }
        }).then(function(data){
            return data.text();
        }).then(function(data){
            self.back_end_articles = data;
        }).catch(function(err){
            console.log(err.message);
        });

        return this.back_end_articles;

    };
};



function update_ai_articles(){
    console.log("AI called");

    this.api_data = new news_api_data();
    this.topics = new ai_topics();

    this.present_articles = "";
    this.rendered_dom = "";

    this.ai_url = "https://newsapi.org/v2/everything?q=" + this.topics.get_topics() + "&language=" + this.topics.get_language() + "&pageSize=" + this.api_data.return_pagesize() + "&from=" + this.api_data.return_date() + "&apiKey=" + this.api_data.return_api_key();
    this.ai_request = new Request(this.ai_url,this.api_data.get_init());

    if (this.present_articles === ""){
        this.present_articles = this.topics.fetch_articles(this.api_data.return_date());
    }

    this.article_display = document.querySelector("main");

    this.create_article = function (article){
        // language=HTML
        return article_template(article);
    };
    let self = this;


    if (self.present_articles !== "") {
        console.log(self.present_articles);
        if (self.rendered_dom === "") {
            self.article_display.innerHTML = self.present_articles.articles.map(this.create_article).join("\n");
            self.rendered_dom = self.article_display.innerHTML;
        }else{
            self.article_display.innerHTML = self.rendered_dom;
        }
        }else {

        fetch(self.ai_request).then(function (response) {
            if (!response.ok) {
                console.log(response);
                throw new Error("Bad response while fetching AI articles");
            } else {
                return response;
            }
        }).then(function (data) {
            console.log("First Data");
            console.dir(data);
            return data.json();
        }).then(function (data) {
            console.dir(data);
            self.article_display.innerHTML = data.articles.map(self.create_article).join("\n");
            self.topics.store_articles(self.api_data.return_date(),data);
            self.present_articles = data;
            self.rendered_dom = self.article_display.innerHTML;
        }).catch(function (error) {
            console.log("Error fetching ai articles: \n", error.message);
            self.present_articles = self.topics.fetch_articles(self.api_data.return_date());
            if (self.present_articles !== "") {
                self.article_display.innerHTML = self.present_articles.articles.map(self.create_article).join("\n");
            }else{
                self.article_display.innerHTML = `<strong> Sorry for this but it looks like there is no internet connection </strong>`;
            }

        });
    }
}


function refine_search_ai(){
     this.api_data = new news_api_data();


     console.log("AI");
     let search_text = document.getElementById("search_field").value;

     if (!isEmpty(search_text)){
         this.hacking_fetch_url = "https://newsapi.org/v2/everything?q=" + search_text + "&pageSize=" + this.api_data.return_pagesize() + "&from="+this.api_data.return_date()+"&apiKey="+this.api_data.return_api_key();
         this.hacking_fetch_request = new Request(this.hacking_fetch_url,this.api_data.get_init());
         this.article_display = document.querySelector("main");
            let self = this;
            fetch(self.hacking_fetch_request).then(function (response) {
                if (!response.ok) {
                    console.log(response);
                    // consider loading cached articles here
                    throw new Error("Bad Response");
                } else {
                    return response;
                }
            }).then(function (data) {
                return data.json();
            }).then(function (data) {
                self.article_display.innerHTML = data.articles.map(self.create_article).join("\n");
            }).catch(function (error) {
                console.log("Error fetching AI articles: \n", error);
            });

     }
}
