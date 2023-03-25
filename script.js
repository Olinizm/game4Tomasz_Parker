$(document).ready(function() {
    var mouseX = 0;
    var mouseY = 70;
    var nrId = 0;
    var cId = 0;
    var cPosX = 0;
    var cPosY = 0;

    var gameWindow = document.getElementById("game");
    var loffset = gameWindow.offsetLeft;
    var toffset = gameWindow.offsetTop;
    var windowWid = gameWindow.offsetWidth;
    
    $("#game").mousemove(function(event) {
        mouseX = event.pageX;
        mouseY = event.pageY;
        if(event.pageY < 70) mouseY = 70;
        $("#cursor").css("top", mouseY - 10)
                    .css("left", mouseX - 10);
    })

    $(document).click(function() {
        if(parseInt(Math.abs(mouseX - cPosX)) < 30 && parseInt(Math.abs(mouseY - cPosY)) < 30)
        {
            console.log("jest");
            spawnCircle();
            console.log(cId);
            $("#"+cId).remove();
            $("#"+cId+"o").remove();
            cId++;
            setCurrent(cId);
        }
    })

    function spawnCircle()
    {
        var inner = document.createElement('div');
        inner.setAttribute('class', "inner_circle");
        inner.className = "inner_circle";
        inner.setAttribute("id", nrId);
        var outer = document.createElement('div');
        outer.setAttribute('class', "outer_circle");
        outer.setAttribute("id", nrId+"o");
        setPosition(inner, outer)
        nrId++;
        
        $("#game").prepend(inner);
        $("#game").prepend(outer);
    }
    function setPosition(inner, outer)
    {
        spawnPosX = Math.random()* (windowWid-70) + loffset;
        spawnPosY = Math.random()* 530 + toffset;
        $(inner).css("left", spawnPosX+20)
                .css("top", spawnPosY+20)
                          
        $(outer).css("left", spawnPosX)
                .css("top", spawnPosY)
    }
    function setCurrent(next)
    {
        var circle = document.getElementById(next);
        cPosX = circle.offsetLeft+30;
        cPosY = circle.offsetTop+30;
        console.log(cPosX + " " + cPosY)
        
    }
    spawnCircle();
    setCurrent(0);
})