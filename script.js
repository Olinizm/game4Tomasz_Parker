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

    var score = 0;
    var ScDisplay = document.getElementById("score")
    
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
            checkAcc(cId);
            destroyCircle(cId);
            
        }
    })

    //checks difference between inner and outer circle
    function checkAcc(idc)
    {
        var iCircle = document.getElementById(idc).offsetWidth;
        var oCircle =  document.getElementById(idc+"o").offsetWidth;
        console.log(iCircle + ":" + oCircle)
        var difference = Math.abs(iCircle-oCircle)
        if(difference<20)
        {
            if(difference<10)
            {
                console.log("300");
                score += 300;
            }
            else if(difference<15)
            {
                console.log("100");
                score += 100;
            }
            else
            {
                console.log("50");
                score += 50;
            }
        }
        else
        {
            console.log("miss");
        }
        ScDisplay.innerHTML = "Score: "+ score;
    }

    //creates a circle and displays in on the screen
    function spawnCircle()
    {
        var inner = document.createElement('div');
        inner.setAttribute('class', "inner_circle");
        inner.className = "inner_circle";
        inner.innerHTML = nrId%9+1;
        inner.setAttribute("id", nrId);
        colorit(inner, nrId);
        
        var outer = document.createElement('div');
        outer.setAttribute('class', "outer_circle");
        outer.setAttribute("id", nrId+"o");
        setPosition(inner, outer)
        setTimeout(destroyCircle, 3000, nrId);

        nrId++;
        
        $("#game").prepend(inner);
        $("#game").prepend(outer);
        shrink(outer);
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

    function shrink(outline)
    {
        $(outline).animate({ width: 75 }, {duration:3000, queue:false});
        $(outline).animate({ height: 75 }, {duration:3000, queue:false});
        leftPos = outline.offsetLeft+31;
        topPos = outline.offsetTop+31;
        $(outline).animate({ left:  leftPos }, {duration:3000, queue:false});
        $(outline).animate({ top:  topPos }, {duration:3000, queue:false});

    }

    //changes color depending on the id
    function colorit(circle, idCircle)
    {
        colornr = parseInt(idCircle/9)%3 //Adamus helped me figure out why only 1s changed color
        switch(colornr)
        {
            case 0:
                $(circle).css("background-color", "hotpink")
                break;
            case 1:
                $(circle).css("background-color", "teal")
                break;
            case 2:
                $(circle).css("background-color", "sandybrown")
        }
        
    }

    //first circle created manually
    spawnCircle();
    setCurrent(0);

    //spawn circle every set interval
    setInterval(spawnCircle, 1000);
})