//tetrisid
//mainbodyinf


document.getElementById('tetrisid').addEventListener("click", function(){
    const route = "tetris";
    const my_data = '&route=' + route;
    $.ajax({
        type: "post",
        url: "/games",
        data: my_data,
        cache: false,
        success: function(response){
            $('#mainbodyinf').html(response);
        }
    });
});

document.getElementById('pacmanid').addEventListener("click", function(){
    const route = "pacman";
    const my_data = '&route=' + route;
    $.ajax({
        type: "post",
        url: "/games",
        data: my_data,
        cache: false,
        success: function(response){
            $('#mainbodyinf').html(response);
        }
    });
});