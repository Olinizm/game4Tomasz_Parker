$(document).ready(function() {
    var mouseX = 0;
    var mouseY = 70;

    var gameWindow = document.getElementById("game");
    var loffset = gameWindow.offsetLeft;
    var toffset = gameWindow.offsetTop;
    var windowWid = gameWindow.offsetWidth
    
    $("#game").mousemove(function(event) {
        mouseX = event.pageX;
        mouseY = event.pageY;
        if(event.pageY < 70) mouseY = 70;
        $("#cursor").css("top", mouseY - 10)
                    .css("left", mouseX - 10);
    })

    function spawnCircle()
    {
        spawnPosX = Math.random()* (windowWid-70) + loffset;
        spawnPosY = Math.random()* 550 + toffset;
        $(".inner_circle").css("left", spawnPosX+20)
                          .css("top", spawnPosY+20)
                          
        $(".outer_circle").css("left", spawnPosX)
                          .css("top", spawnPosY)
    }
    spawnCircle();
})