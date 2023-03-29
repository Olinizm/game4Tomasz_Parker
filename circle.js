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
    constructor(inner, outer, pos, id)
    {
        this.inner = inner;
        this.outer = outer;
        this.circleID = id;
        this.pos = new position(pos.x, pos.y);
        $(this.inner).css("left", pos.x+circOffset)
                     .css("top", pos.y+circOffset)
                          
        $(this.outer).css("left", pos.x)
                     .css("top", pos.y)
    }

    inCircle(mousePos) 
    {
        if(parseInt(Math.abs(mousePos.x - this.pos.x)) < 40 && parseInt(Math.abs(mousePos.y - this.pos.y)) < 40)
        {
            return true;
        }
        return false;
    }
}
