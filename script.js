//I put it here because it's used by other js files
var circOffset = 30;

$(document).ready(function() {
    //cursor position
    var mouse = new position(0, 70);
    //stores the id of next circle to create
    var nrId = 0;

    //List of circles on the screen
    var circles = [];

    

    //getting game window size to addjust spawn position
    $("#game").css("height", $(window).height()*0.9);
    $("#game").css("width", $(window).width()*0.7);
    var gameWindow = document.getElementById("game");
    var loffset = gameWindow.offsetLeft;
    var toffset = gameWindow.offsetTop;
    var windowWid = gameWindow.offsetWidth;

    //dynamically resizes the window
    $(window).resize(function() {
        $("#game").css("height", $(window).height()*0.9);
        $("#game").css("width", $(window).width()*0.7);
        loffset = gameWindow.offsetLeft;
        toffset = gameWindow.offsetTop;
        windowWid = gameWindow.offsetWidth;
    })
    
    //outer circles approach rate
    var ar = 3000;

    //score and combo variables and displays
    var combo = 0;
    var score = 0;
    var hp = 100;

    //hp deploying mechanics
    $("#hp").animate({width: "0%"}, {duration: 12500, queue: false});
    let deployHP = () => hp-=0.8;
    setInterval(deployHP, 100);
    
    //sets cursor position to mouse position
    $("#game").mousemove(function(event) {
        mouse.x = event.pageX;
        mouse.y = event.pageY;
        //makes sure the cursor doesn't leave the game window
        if(event.pageY < 70) mouse.y = 70;
        if(event.pageY > 0.97*$(window).height()) mouse.y = $(window).height()*0.97;
        if(event.pageX < 0.15*$(window).width()) mouse.x = 0.15*$(window).width();
        if(event.pageX > 0.85*$(window).width()) mouse.x = 0.85*$(window).width();
        $("#cursor").css("top", mouse.y - 10)
                    .css("left", mouse.x - 10);
    })

    //compares cursor position to the position of the first circle
    $(document).click(function() {
        if(circles[0].inCircle(mouse))
        {
            checkAcc(circles[0]);
            destroyCircle(circles[0].circleID, true);
            
        }
    })

    //checks difference between inner and outer circle
    function checkAcc(circle)
    {
        var iCircle = circle.inner.offsetWidth;
        var oCircle =  circle.outer.offsetWidth;
        var difference = Math.abs(iCircle-oCircle)
        if(difference<20)
        {
            combo++;
            if(difference<8)
            {
                displayAcc(circle, 300,"rgba(47, 200, 255, 0.8)")
                score += 300 * combo;
                hp+=15;
            }
            else if(difference<15)
            {
                displayAcc(circle, 100,"rgba(30, 255, 50, 0.8)")
                score += 100 * combo;
                hp+=10;
            }
            else
            {
                displayAcc(circle, 50,"rgba(255, 183, 17, 0.8)")
                score += 50 * combo;
                hp+=5;
            }
            
        }
        else
        {
            displayAcc(circle, "miss","rgba(255, 20, 20, 0.8)")
            combo = 0;
            hp-=10;
        }
        $("#score").text(score);
        $("#combo").text(combo+"x");
        displayHP();
    }

    //creates a circle and displays in on the screen
    function spawnCircle()
    {
        var inner = document.createElement('div');
        inner.setAttribute('class', "inner_circle");
        inner.innerHTML = nrId%9+1;
        inner.setAttribute("id", nrId);
        
        var outer = document.createElement('div');
        outer.setAttribute('class', "outer_circle");
        outer.setAttribute("id", nrId+"o");

        circles.push(new circle(inner, outer, getPosition(), nrId))
        colorit(inner, nrId);

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
        spawnPosY = Math.random()* ($(window).height()*0.9-140) + toffset;
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
                displayAcc(circles[0], "miss","rgba(255, 20, 20, 0.5)")
                $("#combo").text("0x");
                hp-=10;
                displayHP();
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
        leftPos = outline.offsetLeft+circOffset+1;
        topPos = outline.offsetTop+circOffset+1;
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

    function displayAcc(circle, points, color)
    {
        var accuracy = document.createElement('div');
        $(accuracy).text(points);
        $(accuracy).addClass("accuracy");
        $(accuracy).css("top", circle.pos.y-20)
                   .css("left", circle.pos.x-20)
                   .css("text-shadow", "0px 0px 4px "+color)
        $("#game").append(accuracy);
        let destroyAcc = (displayed) => $(displayed).remove();
        setTimeout(destroyAcc, 800, accuracy);
    }

    function displayHP()
    {
        if(hp > 100) hp = 100;
        if(hp < 0) hp = 0;
        $("#hp").stop();
        $("#hp").css("width", hp+"%")
        $("#hp").animate({width: "0%"}, {duration: 12500, queue: false});
    }

    //first circle created manually
    spawnCircle();

    //spawn circle every set interval
    setInterval(spawnCircle, 1000);
    
})