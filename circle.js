class position 
{
    constructor(posX, posY)
    {
        this.x = posX;
        this.y = posY;
    }
}


class circle
{
    constructor(inner, outer, newpos, id)
    {
        this.inner = inner;
        this.outer = outer;
        this.circleID = id;
        this.pos = new position(newpos.x+40+circOffset, newpos.y+40+circOffset);
        
        $(this.inner).css("left", newpos.x+circOffset)
                     .css("top", newpos.y+circOffset)
                          
        $(this.outer).css("left", newpos.x)
                     .css("top", newpos.y)
    }

    inCircle(mousePos) 
    {
        if(parseInt(Math.abs(mousePos.x - this.pos.x)) < 42 && parseInt(Math.abs(mousePos.y - this.pos.y)) < 42)
        {
            return true;
        }
        return false;
    }
}
