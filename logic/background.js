class Background {
    constructor(x, y ,width, height, bg_src)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.img = document.createElement("img");
        this.img.id = "bg";

        this.img.src = bg_src;
        this.img.width = this.width;
        this.img.height = this.height;

    }

    draw()
    {
        document.getElementById("container-canvas").appendChild(this.img);
    }

    // Odrisi
    clear()
    {
        document.getElementById("bg").remove();
    }

    // Ponovno nariši in posodobi kordinate
    redraw()
    {
        this.clear();
        this.draw();
    }
}