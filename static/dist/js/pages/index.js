
//profiles
const this_menuitems = document.getElementsByName('menuitems');
function clearActive() {
    for (i = 0; i < this_menuitems.length; i++) {
        this_menuitems[i].classList.remove("active");

    }
}

let formresponse = document.getElementById('mainbodyinfdiv');


document.getElementById('softwareprojectslinkid').addEventListener("click", function () {
       clearActive();
       this.classList.add("active");

       let myrequest = new Request('/profiles/software-projects', initGet);
       myFetch(myrequest,formresponse);
});

//
document.getElementById('servicesid').addEventListener("click", function () {
       clearActive();
       this.classList.add("active");
 
       let myrequest = new Request('/profiles/services', initGet);
       myFetch(myrequest,formresponse);

       setTimeout(hireme_butt_listener,100);
});

document.getElementById('linkedinprofileid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");
    //    let myrequest = new Request('/profiles/linkedin', initGet);
    //    myFetch(myrequest,formresponse);

        $.ajax({
            type: "get",
            url: "/profiles/linkedin",
            data: "",
            cache: false,
            success: function (html) {
                formresponse.innerHTML = html;
            }
        });
});

// blog


// used to check if article dom is fully loaded;
function check_is_loaded(){
    this.article_display = document.querySelector("main");
    if (this.article_display === null){
        setTimeout(check_is_loaded,10);
    }
    return true;
}



document.getElementById('programmingid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");


       // language=HTML
    let template = `
            <div class="box box-body with-border">
                <div class="box box-header with-border">
                    <h3 class="box-title"><strong><i class="fa fa-code"> </i> Programming</strong></h3>
                    <blockquote>
                        As an programmer experienced in both <strong>Python27, Javascript, HTML5, CSS3, Jinja-Templating, Google App Engine and Google Cloud Platform</strong>
                        its easier for me to bring to you most informative articles on Programming everyday and on time.
                        <div id="advertcode"></div>
                    </blockquote>           
                </div>                    
                <form class="form-horizontal">
            
                        <div class="input-group">
                            <div class="input-group-addon">
                                <i class="glyphicon glyphicon-search"> </i> </div> <input type="text" id="search_field" class="form-control">
                            <div class="input-group-addon">
                                <a href="#" id="searchbuttid" onclick="refine_search_programming()"> <strong>Search</strong></a>
            
                            </div>
                        </div>
            
                </form>
                <div class="box box-container with-border">
                    <main></main>
                </div>
            
            </div>       
       `;

       if (check_is_loaded){
        update_programming();
       }else{
           console.log("We should never have gotten here at all");
       }

});

document.getElementById('scienceid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");

    // language=HTML
    let template = `
        <div class="box box-body with-border">
            <div class="box box-header with-border">
                <h3 class="box-title"><strong> <i class="fa fa-lightbulb-o"> </i> Science</strong></h3>
                <blockquote>
                    <strong>Justice Ndou</strong> brings an interesting view on todays scientific developments in areas as diverse as astronomy, space exploration and biotech
                    <div id="advertcode"></div>
                </blockquote>
            </div>               
            <form class="form-horizontal">       
                    <div class="input-group">
                        <div class="input-group-addon">
                            <i class="glyphicon glyphicon-search"> </i> </div> <input type="text" id="search_field" class="form-control">
                        <div class="input-group-addon">
                            <a href="#" id="searchbuttid" onclick="refine_search_science()"> <strong>Search</strong></a>        
                        </div>
                    </div>        
            </form>        
            <div class="box box-container with-border">
                <main></main>
            </div>        
        </div>    
    `;

    formresponse.innerHTML = template;
    if (check_is_loaded()){
        update_science_news();
    }

});

document.getElementById('philosophyid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");


    // language=HTML
    let template = `
        <div class="box box-body with-border">
            <div class="box box-header with-border">
                <h3 class="box-title"><strong> <i class="fa fa-balance-scale"> </i> Philosophy</strong></h3>
            <blockquote>
                <em>Daily dose of classical philosophical subjects articles from around the web</em>
            </blockquote>
            </div>
        
            <form class="form-horizontal">
        
                    <div class="input-group">
                        <div class="input-group-addon">
                            <i class="glyphicon glyphicon-search"> </i> </div> <input type="text" id="search_field" class="form-control">
                        <div class="input-group-addon">
                            <a href="#" id="searchbuttid" onclick="refine_search_philosophy()"> <strong>Search</strong></a>
        
                        </div>
                    </div>        
            </form>
            <div class="box box-container with-border">
                <main></main>
            </div>
        
        </div>
    
    `;
    formresponse.innerHTML = template;
    if (check_is_loaded()){
        update_philosophy();
    }else{
        console.log("Fatal Error");
    }


});

document.getElementById('mathematicsid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");

    // language=HTML
    let template = `
        <div class="box box-body with-border">
            <div class="box box-header with-border">
                <h3 class="box-title"><strong><i class="fa fa-y-combinator"> </i> Mathematics</strong></h3>
                <blockquote>
                    <em>Mathematics is basically the cornerstone of every scientific discovery in the modern world, enjoy</em>
                </blockquote>
            </div>
            <form class="form-horizontal">
        
                    <div class="input-group">
                        <div class="input-group-addon">
                            <i class="glyphicon glyphicon-search"> </i> </div> <input type="text" id="search_field" class="form-control">
                        <div class="input-group-addon">
                            <a href="#" id="searchbuttid" onclick="refine_search_mathematics()"> <strong>Search</strong></a>
        
                        </div>
                    </div>
        
            </form>
        
            <div class="box box-container with-border">
                <main></main>
            </div>
        
        </div>
    
    `;


    formresponse.innerHTML = template;
    if (check_is_loaded()){
        update_mathematics_articles();
    }else{
        console.log("Fatal Error");
    }

});


document.getElementById('hackerid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");
    // language=HTML
    let template = `
            <div class="box box-body with-border">
                <div class="box box-header with-border">
                    <h3 class="box-title"><strong><i class="fa fa-hacker-news"> </i> Hacking</strong></h3>
                    <blockquote>
                        <strong>Justice Ndou</strong>, Brings you a daily dose of exciting, interesting and informative hacking articles
                        <div id="advertcode"></div>
                    </blockquote>
                </div>
                <form class="form-horizontal">
            
                        <div class="input-group">
                            <div class="input-group-addon">
                                <i class="glyphicon glyphicon-search"> </i> </div> <input type="text" id="search_field" class="form-control">
                            <div class="input-group-addon">
                                <a href="#" id="searchbuttid" onclick="refine_search_hacking()"> <strong>Search</strong></a>
            
                            </div>
                        </div>
            
                </form>
                <div class="box box-container with-border">
                    <main></main>
                </div>
            
            </div>    
    `;


    formresponse.innerHTML = template;
    if (check_is_loaded()){
        update_hacking_articles();
    }else{
        console.log("Fatal Error");
    }


});


document.getElementById('networkingid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");
// language=HTML
    let template = `
        <div class="box box-body with-border">
            <div class="box box-header with-border">
                <h3 class="box-title"><strong><i class="fa fa-hacker-news"> </i> Networking</strong></h3>
                <blockquote>
                    <strong>Justice Ndou</strong>, Brings you a daily dose of exciting, interesting and informative networking articles
                    <div id="advertcode"></div>
                </blockquote>
            </div>
            <form class="form-horizontal">
        
                    <div class="input-group">
                        <div class="input-group-addon">
                            <i class="glyphicon glyphicon-search"> </i> </div> <input type="text" id="search_field" class="form-control">
                        <div class="input-group-addon">
                            <a href="#" id="searchbuttid" onclick="refine_search_networking()"> <strong>Search</strong></a>
        
                        </div>
                    </div>
        
            </form>
            <div class="box box-container with-border">
                <main></main>
            </div>
        
        </div>    
    `;


    formresponse.innerHTML = template;
    if (check_is_loaded()){
        update_networking_articles();
    }else{
        console.log("Fatal Error");
    }


});

document.getElementById('aiid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");


    // language=HTML
    let template = `
            <div class="box box-body with-border">
            <div class="box box-header with-border">
                <h3 class="box-title"><strong><i class="fa fa-hacker-news"> </i> Artificial Intelligence</strong></h3>
                <blockquote>
                    <strong>Justice Ndou</strong>, Brings you a daily dose of exciting, interesting and informative Artificial Intelligence articles from around the web
                    <div id="advertcode"></div>
                </blockquote>
            </div>
            <form class="form-horizontal">
        
                    <div class="input-group">
                        <div class="input-group-addon">
                            <i class="glyphicon glyphicon-search"> </i> </div> <input type="text" id="search_field" class="form-control">
                        <div class="input-group-addon">
                            <a href="#" id="searchbuttid" onclick="refine_search_ai()"> <strong>Search</strong></a>
        
                        </div>
                    </div>
        
            </form>
            <div class="box box-container with-border">
                <main></main>
            </div>
        
        </div>
    `;



    formresponse.innerHTML = template;
    if (check_is_loaded()){
            update_ai_articles();
    }else{
        console.log("Fatal Error");
    }





});


// social media links

document.getElementById('facebookid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");
       let myrequest = new Request('/social/facebook', initGet);
       myFetch(myrequest,formresponse);

       setTimeout((function (d, s, id) {
           var js, fjs = d.getElementsByTagName(s)[0];
           if (d.getElementById(id)) return;
           js = d.createElement(s);
           js.id = id;
           js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0&appId=1131871303549991&autoLogAppEvents=1';
           fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk')),10);
});
//googleid
document.getElementById('googleid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");
       let myrequest = new Request('/social/google', initGet);
       myFetch(myrequest,formresponse);
});
// twitterid
document.getElementById('twitterid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");

       let myrequest = new Request('/social/twitter', initGet);
       myFetch(myrequest,formresponse);
});
//quoraid
document.getElementById('quoraid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");

       let myrequest = new Request('/social/quora', initGet);
       myFetch(myrequest,formresponse);

       //my_quora_profile();
       setTimeout(my_quora_profile,3000);
    
});

//youtubeid
document.getElementById('youtubeid').addEventListener("click", function () {
    clearActive();
    this.classList.add("active");

       let myrequest = new Request('/social/youtube', initGet);
       myFetch(myrequest,formresponse);

    function check_dom(){
    this.article_display = document.querySelector("youtube-search");
            if (this.article_display === null){
                setTimeout(self.check_dom,10);
            }
            return true;
    }
    check_dom();

    youtube_search();
});


//pph id

document.getElementById('pphid').addEventListener("click", function(){
    clearActive();
    this.classList.add("active");
    let response_element = `<iframe src="https://www.upwork.com/o/profiles/users/~01f013b5a637b415f8/" frameborder="0" height=800 width=600></iframe>`;
    formresponse.innerHTML = response_element;   
});


//Hireme

document.getElementById('dohireid').addEventListener("click", function(){
    clearActive();
    this.classList.add("active");

       let myrequest = new Request('/services/dohire', initGet);
       myFetch(myrequest,formresponse);

       setTimeout(hireme_butt_listener, 100)
});
//checkrequeststatusid
document.getElementById('checkrequeststatusid').addEventListener("click", function(){
    clearActive();
    this.classList.add("active");

       let myrequest = new Request('/services/request-status', initGet);
       myFetch(myrequest,formresponse);

       setTimeout(get_status_event,100);
    
});

function hireme_butt_listener() {
    let this_hireme_butt = document.getElementById("hiremesend");
    this_hireme_butt.addEventListener("click", hireme_submit);
};

function pph_hireme_butt() {
    
}



function verify() {
    const hireme_fields = document.getElementsByName('hireme');

    for (i = 0; i < hireme_fields.length; i++) {
        if ((hireme_fields[i].value === null) || (hireme_fields[i].value === "")) {
            return false
        } else {
            return true
        }
    }
}

function hireme_submit (){

    if (verify() === true) {
        const route = "hireme";
        const names = document.getElementById('namesid').value;
        const cell = document.getElementById('cellid').value;
        const email = document.getElementById('emailid').value;
        const website = document.getElementById('websiteid').value;
        const myfacebook = document.getElementById('facebookid').value;
        const mytwitter = document.getElementById('twitterid').value;
        const company = document.getElementById('companyid').value;
        const freelancing = document.getElementById('freelancingid').value;
        const project_type = document.getElementById('projecttypeid').value;
        const project_title = document.getElementById('projecttitleid').value;
        const project_description = document.getElementById('projectdescriptionid').value;

        const form_data = '&route=' + route + '&names=' + names + '&cell=' + cell + '&email=' + email + '&website=' + website + '&myfacebook=' + myfacebook +
            '&mytwitter=' + mytwitter + '&company=' + company + '&freelancing=' + freelancing + '&projecttype=' + project_type +
            '&projecttitle=' + project_title + '&projectdescription=' + project_description;

        $.ajax({
            type: 'post',
            url: '/services',
            data: form_data,
            cache: false,
            success: function (result) {
                $('#hiremeinf').html(result)
            }
        });
    } else {
        document.getElementById('hiremeinf').innerHTML = "please fill in all the fields";
    }

}
function get_status_event(){
    document.getElementById('requeststatusbutt').addEventListener("click",get_status)
}


function get_status(){
    const projectid = document.getElementById('referenceid').value;
    const route = "request-this-status";
    if (!isEmpty(projectid)){

    const mydata = '&route=' + route + '&projectid=' + projectid;
    $.ajax({
        type: "post",
        url: "/services/request-status",
        data: mydata,
        cache: false,
        success: function (response) {
            $('#statusinfdiv').html(response)
        }
    })
}else{
    let my_status = document.getElementById("statusinfdiv");
    my_status.innerHTML = `<strong> Please fill in your project id </strong>` 
}

}