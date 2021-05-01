function my_quora_profile (){
    this.full_profile_url ="https://www.quora.com/profile/Justice-Ndou";
    this.profile_name = "Justice Ndou";
    this.profile_topics_url = "https://www.quora.com/topic/";
    this.profile_topics = ["GOD","Philosophy","Mathematics","Mechanical-Engineering","Computer-Science","Cognitive-Science",
    "Memetics","Cognitive-Psychology","Quantum-Mechanics","Social-and-Economic-Developments","Computer-Programming"];


    this.init_get = {
        method: "GET",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "text/plain"
        },
        redirect: "follow",
        mode: "no-cors",
        cache: "force-cache"
    };


    this.fetch_request = new Request(this.full_profile_url,this.init_get);

    this.quora_display = document.getElementById("myquora");

    this.load_on_iframe = function(){
      return  `
        <iframe type="text/html" width="720" height="405" src="${ this.full_profile_url }"></iframe>  
      `;
    };

    let self = this;
    fetch(this.fetch_request).then(function(response){
        return response.text();
    }).then(function (data){
        console.dir(data);
        let parser = new DOMParser();
        self.quora_display.innerHTML = self.load_on_iframe();
    }).catch(function(err){
        console.log(err.message);
    })

}




