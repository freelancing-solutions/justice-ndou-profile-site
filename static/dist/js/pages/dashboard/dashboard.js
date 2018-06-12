/***
 *
                        <li id="hiremeid"><a href="#"><strong><i class="fa fa-dashboard"> </i> Hire Me</strong></a></li>
                        <li id="messagesid"><a href="#"><strong><i class="fa fa-envelope"> </i> Messages </strong></a></li>
                        <li id="interestsid"><a href="#"><strong><i class="fa fa-ioxhost"> </i> Interests </strong></a></li>
                        <li id="projectsid"><a href="#"><strong><i class="fa fa-git-square"> </i> Projects </strong></a></li>

 *
 *
 *
 */

// mainbodyinf


document.getElementById('hiremeid').addEventListener('click', function (event) {
    console.log(event);
    const route = "hireme";
    const my_data = "&route=" + route;

    $.ajax({
        type: "post",
        url: '/dashboard',
        data: my_data,
        cache: false,
        success: function(response){
            $('#mainbodyinf').html(response)
        }
    })
});


document.getElementById('messagesid').addEventListener('click', function (event) {
    console.log(event);
    const route = "messages";
    const my_data = "&route=" + route;

    $.ajax({
        type: "post",
        url: '/dashboard',
        data: my_data,
        cache: false,
        success: function(response){
            $('#mainbodyinf').html(response)
        }
    })
});

document.getElementById('interestsid').addEventListener('click', function (event) {
    console.log(event);
    const route = "interests";
    const my_data = "&route=" + route;

    $.ajax({
        type: "post",
        url: '/dashboard',
        data: my_data,
        cache: false,
        success: function(response){
            $('#mainbodyinf').html(response)
        }
    })
});

document.getElementById('projectsid').addEventListener('click', function (event) {
    console.log(event);
    const route = "projects";
    const my_data = "&route=" + route;

    $.ajax({
        type: "post",
        url: '/dashboard',
        data: my_data,
        cache: false,
        success: function(response){
            $('#mainbodyinf').html(response)
        }
    })
});

//blogcreatepageid
//blogcreatepostid

document.getElementById('blogcreatepageid').addEventListener('click', function (event) {
    console.log(event);
    const route = "createpage";
    const my_data = "&route=" + route;

    $.ajax({
        type: "post",
        url: '/dashboard',
        data: my_data,
        cache: false,
        success: function(response){
            $('#mainbodyinf').html(response)
        }
    })
});

