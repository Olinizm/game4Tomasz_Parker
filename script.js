$(document).ready(function() {
    //cursor position
    var mouseX = 0;
    var mouseY = 70;
    //stores the id of next circle to create, and next circle to click
    var nrId = 0;
    var cId = 0;
    //positions of the next circle to click
    var cPosX = 0;
    var cPosY = 0;

    //getting game window size to addjust spawn position
    var gameWindow = document.getElementById("game");
    var loffset = gameWindow.offsetLeft;
    var toffset = gameWindow.offsetTop;
    var windowWid = gameWindow.offsetWidth;
    
    //sets cursor position to mouse position
    $("#game").mousemove(function(event) {
        mouseX = event.pageX;
        mouseY = event.pageY;
        if(event.pageY < 70) mouseY = 70;
        $("#cursor").css("top", mouseY - 10)
                    .css("left", mouseX - 10);
    })

    //compares cursor position to cPos which stores position of the next circle to click
    $(document).click(function() {
        if(parseInt(Math.abs(mouseX - cPosX)) < 40 && parseInt(Math.abs(mouseY - cPosY)) < 40)
        {
            destroyCircle(cId);
        }
    })

    //creates a circle and displays in on the screen
    function spawnCircle()
    {
        var inner = document.createElement('div');
        inner.setAttribute('class', "inner_circle");
        inner.className = "inner_circle";
        inner.innerHTML = nrId%9+1;
        inner.setAttribute("id", nrId);
        
        var outer = document.createElement('div');
        outer.setAttribute('class', "outer_circle");
        outer.setAttribute("id", nrId+"o");
        setPosition(inner, outer)
        setTimeout(destroyCircle, 3000, nrId);

        nrId++;
        
        $("#game").prepend(inner);
        $("#game").prepend(outer);
    }
    
    //sets x and y positions to random for new made circles
    function setPosition(inner, outer)
    {
        spawnPosX = Math.random()* (windowWid-90) + loffset;
        spawnPosY = Math.random()* 520 + toffset;
        $(inner).css("left", spawnPosX+31)
                .css("top", spawnPosY+31)
                          
        $(outer).css("left", spawnPosX)
                .css("top", spawnPosY)
    }

    //sets the cPos values to the next circle
    function setCurrent(next)
    {
        if(parseInt(nrId) < parseInt(next)+1)
        {
            setTimeout(setCurrent, 100, next)
        }
        else
        {
            var circle = document.getElementById(next);
            cPosX = circle.offsetLeft+40;
            cPosY = circle.offsetTop+40;
            console.log(cPosX + " " + cPosY)
        }
        
    }

    //destroys circle of a certain id if it exists on screen
    function destroyCircle(circleId)
    {
        var exists = document.getElementById(circleId);
        if(exists) 
        {
            cId++;
            setCurrent(cId);
            $("#"+circleId).remove();
            $("#"+circleId+"o").remove();
        }
        
    }

    //first circle created manually
    spawnCircle();
    setCurrent(0);

    //spawn circle every set interval
    setInterval(spawnCircle, 1000);
})