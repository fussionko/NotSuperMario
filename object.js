class GameObject{
    constructor(x, y, width, height, max_state)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.img = new Image;
        this.img.src = "object_image_neki.png"
        this.img_w = 637;
        this.img_h = 637;

        this.state = 0;
        this.max_state = max_state;
        this.sound_break = new Sound("object_sound_break.mp3");
    }
    
    clear()
    {
        main_ctx.beginPath();
        main_ctx.clearRect(this.x, this.y, this.width, this.height);
        main_ctx.closePath();
    }


    stateOver()
    {
        if(this.state > this.max_state)
        {
            this.sound_break.play();
            return 1;
        }
        return 0;
    }
}

class GameObject_Solid extends GameObject {
    constructor(x, y, width, height)
    {
        super(x, y, width, height, 0);
    }
    redraw()
    {
        this.clear();
        this.draw();
    }

    draw()
    {
        main_ctx.beginPath();
        main_ctx.drawImage(this.img, 0, 0, this.img_w, this.img_h, this.x, this.y, this.width, this.height);
        main_ctx.closePath();
    }
}

class GameObject_Destroy extends GameObject  {
    constructor(x, y, width, height)
    {
        super(x, y, width, height, 1);    
    }

    redraw()
    {
        this.clear();
        this.draw();
    }

    draw()
    {
        main_ctx.beginPath();
        switch(this.state)
        {
            case 0: main_ctx.drawImage(this.img, this.img_w*3, 0, this.img_w, this.img_h, this.x, this.y, this.width, this.height);break;
            case 1: main_ctx.drawImage(this.img, this.img_w, 0, this.img_w, this.img_h, this.x, this.y, this.width, this.height);break;
        }
        
        main_ctx.closePath();
    }
}

class GameObject_Special extends GameObject  {
    constructor(x, y, width, height)
    {
        super(x, y, width, height, 1);

        this.spawn = 1;
    }

    redraw()
    {
        this.clear();
        this.draw();
    }

    draw()
    {
        main_ctx.beginPath();
        switch(this.state)
        {
            case 0: main_ctx.drawImage(this.img, this.img_w*2, 0, this.img_w, this.img_h, this.x, this.y, this.width, this.height);break;
            case 1: main_ctx.drawImage(this.img, this.img_w, 0, this.img_w, this.img_h, this.x, this.y, this.width, this.height);break;
        }
        main_ctx.closePath();
    }
}

class GameObject_Cracked extends GameObject  {
    constructor(x, y, width, height)
    {
        super(x, y, width, height, 0);
    }

    redraw()
    {
        this.clear();
        this.draw();
    }

    draw()
    {
        main_ctx.beginPath();
        main_ctx.drawImage(this.img, this.img_w, 0, this.img_w, this.img_h, this.x, this.y, this.width, this.height);
        main_ctx.closePath();
    }
}