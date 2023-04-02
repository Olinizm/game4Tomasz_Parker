class deathScreen
{
    constructor ()
    {
        this.div = document.createElement('div');
        $(this.div).css("width", "30%")
                   .css("height", $(window).height()*0.4)
                   .css("left", "35%")
                   .css("top", $(window).height()*0.02);

        $(this.div).addClass("popup");
        $(this.div).text("Game Over");
        $("#game").prepend(this.div); 
    }

    show()
    {
        $(this.div).show();
        $("#hpbar").toggle();
        $(this.div).animate({top: $(window).height()*0.2}, {duration: 500});
    }
}