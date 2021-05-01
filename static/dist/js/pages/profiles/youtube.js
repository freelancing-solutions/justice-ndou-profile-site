



function my_youtube_channels(){

};



function youtube_search(){

    let self = this;
    this.topics = ["HDMI Over IP", "Networking", "Home Networking","Home Server Builds","Javascript","Jinja Templating","Google App Engine","Firebase","Firebase Functions",
    "Cloud Functions","SpaceX","Elon Musk","REACT","REACT FLUX","RaspberryPI","Angular","CCTV","Serverless Applications","Istio","kubernettes","Tensorflow","Deep Learning","AI","Neural Networks"];
    this.random_topic = function(){
        //managing youtube topics
        return self.topics[Math.floor(Math.random() * self.topics.length)];
    };

    try{
        this.search_term = document.getElementById("search_field").value;
    }catch (e) {
        this.search_term = this.random_topic();
    }

    if (this.search_term === ""){
        this.search_term = this.random_topic();
    }
    this.init_get ={
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'text/plain'
        },
        redirect: "follow",
        mode: 'cors',
        cache: 'force-cache'
    };

    this.get_yuotube_api_key = function(){
        // get youtube api key from the backend
    };

    this.apikey = "AIzaSyAURtCt8PWrfUIB07RkqM064anLCHd6sM0";
    this.part = "snippet";
    this.maxResults = 25;
    this.type = "video";
    this.baseurl = "https://www.googleapis.com/youtube/v3/search?";
    this.fetch_url = this.baseurl +"q="+ this.search_term + "&maxResults=" + this.maxResults + "&part=" + this.part + "&type=" + this.type + "&key=" + this.apikey;

    this.fetch_request = new Request(this.fetch_url,this.init_get);

    this.show_snippets = function (results) {
        this.html = "";
        this.entries = results.items;

        this.check_dom = function(){
            this.article_display = document.querySelector("youtube-search");
            if (this.article_display === null){
                setTimeout(self.check_dom,10);
            }
            return true;
        };

        this.search_results_dom = document.querySelector("youtube-search");
        let self = this;

        if (self.check_dom()) {
            this.entries.forEach(function (value, index) {
                // language=HTML
                console.dir(value);
                self.html += `<div class="box box-body with-border">
                            <div class="box box-header with-border">
                                <a href="//youtube.com/watch?v=${value.id.videoId}" target="_blank">
                                    <h2 class="box-title"><strong> <i class="fa fa-youtube-play"> </i> ${index + 1} - ${value.snippet.title}</strong></h2>
                                </a>
                            </div>
                                    <div class="box box-body">                                    
                                        <iframe id="ytplayer" type="text/html" width="720" height="405" src="https://www.youtube.com/embed/${value.id.videoId}" frameborder="0" allowfullscreen></iframe>
                                        <div class="box-footer">
                                            ${value.snippet.description}                                            
                                        </div>
                                        <div class="box box-footer with-border">
                                            <a href="//youtube.com/watch?v=${value.id.videoId}" target="_blank"><h3 class="box-title"> ${value.snippet.channelTitle} </h3></a>
                                        </div>                            
                                    </div>
                            </div>
                `;
            });

            this.search_results_dom.innerHTML = self.html;
        }
    };



    fetch(this.fetch_request).then(function(response) {
        if (response.ok) {
            return response.json();
        }else{
            throw new Error("Error fetching video data");
        }
    }).then(function(data){
        self.show_snippets(data);
    }).catch(function(err){
        console.log(err.message);
        this.search_results_dom.innerHTML = err.message;
    });

}

