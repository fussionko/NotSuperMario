class Canvas {
    constructor(width, height, parent)
    {   
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.id = "main-screen";
        parent.appendChild(this.canvas);
    }

    getContext()
    {
        return this.canvas.getContext('2d');
    }
}