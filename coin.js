class Coin extends movingObject{
    constructor(x, y, width, height, value = 1)
    { 
        super(x, y, width, height, 0, -4);

        this.img = new Image;
        this.img.src = 'coin_neki.png';

        this.value = value;
        this.img_w = 191;
        this.img_h = 171;

        this.prevCoin = 0;

        this.sound_collected = new Sound("coin_sound.wav");

        this.collected = 0;

        this.startY = this.y;
    }

    draw()
    {
        this.clear();

        main_ctx.beginPath();
        if(this.count==20)
            this.prevCoin = (this.prevCoin+1) % 5;
        main_ctx.drawImage(this.img, this.img_w*this.prevCoin, 0, this.img_w, this.img_h, this.x, this.y, this.width, this.height);
        main_ctx.closePath();

        this.copyCord();

        this.count = (this.count+1) % 21;
    }

    onCollision(objects, gameObjects)
    {
        let numOfCollisions = 0;
        if(this.collected) return;
        for(let i in objects)
        {
            if(gameObjects.includes(parseInt(i)))
                if(this.checkCollision(objects[i].x, objects[i].y, objects[i].width, objects[i].height))
                {
                    if(this.prevx+this.width <= objects[i].x)
                    {
                        this.right = 0;
                        this.x = objects[i].x-this.width;
                    }

                    else if(this.prevx >= objects[i].x + objects[i].width)
                    {
                        this.left = 0;
                        this.x = objects[i].x+objects[i].width;
                    }
                    else if(this.prevy >= objects[i].y+objects[i].height)
                    {
                        this.y = objects[i].y+objects[i].height;
                        if(this.jump)
                            this.stopJump();
                    }
                    else if(this.prevy+this.height <= objects[i].y)
                    {
                        this.y = objects[i].y-this.height;
                        if(this.fall)
                            this.stopFall();
                        if(Math.round(Math.random()))
                            this.left = 1;
                        else
                            this.right = 1;
                    }
                    numOfCollisions++;
                }
        }
        this.checkFreeFall(numOfCollisions);
        if(this.fall)
        {
            this.right = 0;
            this.left = 0;
        }
    }

    outOfScreen(level, index)
    {
        if(this.collected)
        {
            if(this.y > this.startY)
                level.removeCoin(index);
            return;
        }

        //DESNA STENA
        if(this.x+this.width >= canvasW)
        {
            this.right = 0;
        }
        
        //LEVA STENA
        else if(this.x <= 0)
        {
            this.left = 0;
        }
    
        //STROP
        if(this.y <= 0)
        {
            if(this.jump)
                this.stopJump();
            this.y = 0
        }
    
        //TLA
        else if(this.y+this.height >= canvasH)
        {
            this.y = canvasH-this.height;
            if(this.fall)
                this.fall = 0;
        }
    }
    onCollisionPlayer(player, coinNum, deleteCoins)
    {
        if(this.collected) return;
        if(this.checkCollision(player.x, player.y, player.width, player.height))
        {
            this.sound_collected.play();
            player.onCoinsCollision(this.value);
            //DESPAWN COIN
            
            deleteCoins.push(coinNum);
        }
    }
}