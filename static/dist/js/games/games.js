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
            //document.html(response);
            $('#mainbodyinf').html(response);
        }
    });
});

document.getElementById('chessid').addEventListener("click", function(){
    const route = "chess";
    const my_data = '&route=' + route;
    $.ajax({
        type: 'post',
        url: '/games',
        data: my_data,
        cache: false,
        success: function(response){
            $('#mainbodyinf').html(response);
        }
    });
});

//pingpongid
document.getElementById('pingpongid').addEventListener("click", function () {
    const route = "pingpong";
    const my_data = '&route=' + route;
    $.ajax({
        type: 'post',
        url: '/games',
        data: my_data,
        cache: false,
        success: function (response) {
            $('#mainbodyinf').html(response);
        }
    });
});
//checkersid
document.getElementById('checkersid').addEventListener("click", function () {
    const route = "checkers";
    const my_data = '&route=' + route;
    $.ajax({
        type: 'post',
        url: '/games',
        data: my_data,
        cache: false,
        success: function (response) {
            $('#mainbodyinf').html(response);
        }
    });
});
//matrixid
document.getElementById('matrixid').addEventListener("click", function () {
    const route = "matrix";
    const my_data = '&route=' + route;
    $.ajax({
        type: 'post',
        url: '/games',
        data: my_data,
        cache: false,
        success: function (response) {
                
            $('#mainbodyinf').html(response);
        }
    });
});
