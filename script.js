var circOffset = 32;

$(document).ready(function() {
    //cursor position
    var mouse = new position(0, 70);
    //stores the id of next circle to create, and next circle to click
    var nrId = 0;

    //List of circles on the screen
    var circles = [];

    //getting game window size to addjust spawn position
    var gameWindow = document.getElementById("game");
    var loffset = gameWindow.offsetLeft;
    var toffset = gameWindow.offsetTop;
    var windowWid = gameWindow.offsetWidth;
    
    var ar = 3000;

    var combo = 0;
    var score = 0;
    var ScDisplay = document.getElementById("score")
    
    //sets cursor position to mouse position
    $("#game").mousemove(function(event) {
        mouse.x = event.pageX;
        mouse.y = event.pageY;
        if(event.pageY < 70) mouse.y = 70;
        $("#cursor").css("top", mouse.y - 10)
                    .css("left", mouse.x - 10);
    })

    //compares cursor position to cPos which stores position of the next circle to click
    $(document).click(function() {
        if(circles[0].inCircle(mouse))
        {
            checkAcc(circles[0].circleID);
            destroyCircle(circles[0].circleID, true);
            
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
            combo++;
            if(difference<10)
            {
                console.log("300");
                score += 300 * combo;
            }
            else if(difference<15)
            {
                console.log("100");
                score += 100 * combo;
            }
            else
            {
                console.log("50");
                score += 50 * combo;
            }
        }
        else
        {
            console.log("miss");
            combo = 0;
        }
        ScDisplay.innerHTML = "Score: "+ score;
    }

    //creates a circle and displays in on the screen
    function spawnCircle()
    {
        var inner = document.createElement('div');
        inner.setAttribute('class', "inner_circle");
        inner.innerHTML = nrId%9+1;
        inner.setAttribute("id", nrId);
        
        colorit(inner, nrId);
        
        var outer = document.createElement('div');
        outer.setAttribute('class', "outer_circle");
        outer.setAttribute("id", nrId+"o");
        circles.push(new circle(inner, outer, getPosition(), nrId))

        setTimeout(destroyCircle, ar, nrId, false);


        nrId++;
        
        $("#game").prepend(inner);
        $("#game").prepend(outer);
        shrink(outer);
    }
    
    //sets x and y positions to random for new made circles
    function getPosition()
    {
        spawnPosX = Math.random()* (windowWid-90) + loffset;
        spawnPosY = Math.random()* 520 + toffset;
        return new position(spawnPosX, spawnPosY);
    }

    //destroys circle of a certain id if it exists on screen
    function destroyCircle(circleId, clicked)
    {
        var exists = document.getElementById(circleId);
        if(exists) 
        {
            if(!clicked)
            {
                combo = 0;
            }
            $("#"+circleId).remove();
            $("#"+circleId+"o").remove();
            circles.shift();
        }
        
    }

    //outer circle animation
    function shrink(outline)
    {
        $(outline).animate({ width: 75 }, {duration: ar, queue:false});
        $(outline).animate({ height: 75 }, {duration: ar, queue:false});
        leftPos = outline.offsetLeft+circOffset;
        topPos = outline.offsetTop+circOffset;
        $(outline).animate({ left:  leftPos }, {duration: ar, queue:false});
        $(outline).animate({ top:  topPos }, {duration: ar, queue:false});

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

    //spawn circle every set interval
    setInterval(spawnCircle, 1000);
})