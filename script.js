$(document).ready(function() {
    var mouseX = 0;
    var mouseY = 70;
    
    $("#game").mousemove(function(event) {
        mouseX = event.pageX;
        mouseY = event.pageY;
        if(event.pageY < 70) mouseY = 70;
        $("#cursor").css("top", mouseY - 10)
                    .css("left", mouseX - 10);
    })

    function spawnCircle()
    {
        $(".inner_circle")
    }
})