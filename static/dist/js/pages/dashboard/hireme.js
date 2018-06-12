
const hiremes = document.getElementsByName('thishire');
for (i = 0; i < hiremes.length; i++){
    hiremes[i].addEventListener('click', function () {
        hiremeClickHandler(this.id);
    });
}

//mainbodyinf
function hiremeClickHandler(id){
    const route = 'get-project';
    const projectid = id;
    const my_data = '&route=' + route + '&projectid=' + projectid;
    $.ajax({
        type: "post",
        url: "/dashboard",
        data: my_data,
        cache: false,
        success: function(response){
            $('#mainbodyinf').html(response);
        }
    });
}