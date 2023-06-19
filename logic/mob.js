class Mob extends movingObject{
    constructor(x, y, width, height, vX, startVY)
    {
        super(x, y, width, height, vX, startVY);


        this.img = new Image;
        this.img.src = "images/mob_neki.png";

        this.img_explosion = new Image;
        this.img_explosion = "images/mob_neki_image_explosion.png";

        this.explosionState = 0;

        //Zacasna resiteve
        this.deleteTable = [];

        this.damage = 160;

        this.prevMob = 0;
        this.img_w = 140;
        this.img_h = 140;


        this.sound_laugh = new Sound("sounds/mob_sound_1.wav");
        this.sound_scream = new Sound("sounds/mob_sound_2.wav");
        this.sound_death = new Sound("sounds/mob_sound_3.wav");

        this.stop = 0;
        this.death = 0;
    }

    draw()
    {
        this.randomSound(this.sound_laugh, 1500);
        this.randomSound(this.sound_scream, 1700);
        this.clear();

        if(this.count == 20)
            this.prevMob = (this.prevMob+1) % 8;
        main_ctx.beginPath();
        if(this.prevMob < 5)
            this.drawDirectionalImage(this.img_w*this.prevMob,0, this.img_w, this.img_h);
        else
            this.drawDirectionalImage(this.img_w*(this.prevMob%5), this.img_h+15, this.img_w, this.img_h);
        
        main_ctx.closePath();

        this.copyCord();

        this.count = (this.count+1) % 21;
    }

    onCollision(objects, coins)
    {
        let floorCollision = 0;
        for(let i in objects)
        {
            if(coins.includes(parseInt(i))) continue;
            if(this.checkCollision(objects[i].x, objects[i].y, objects[i].width, objects[i].height))
            {
                if(this.prevx+this.width <= objects[i].x)
                {
                    this.right = 0;
                    this.left = 1
                    this.x = objects[i].x-this.width;
                }
            
                else if(this.prevx >= objects[i].x + objects[i].width)
                {
                    this.left = 0;
                    this.right = 1;
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
                    floorCollision = 1;
                }
            }
            else if(this.y+this.height == objects[i].y && this.x + this.width >= objects[i].x && this.x <= objects[i].x + objects[i].width)
                floorCollision = 1;
        }
        this.checkFreeFall(floorCollision);
        if(this.fall)
        {
            this.right = 0;
            this.left = 0;
        }
    }


    outOfScreen()
    {
        //DESNA STENA
        if(this.x+this.width >= canvasW)
        {
            this.right = 0;
            this.left = 1;
        }
        
        //LEVA STENA
        else if(this.x <= 0)
        {
            this.left = 0;
            this.right = 1;
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
            if(!this.left && !this.right)
            {
                if(Math.round(Math.random()))
                    this.left = 1;
                else
                    this.right = 1;
            }
        }
    }

    onCollisionPlayer(player, mobNum, deleteMobs)
    {
        if(this.checkCollision(player.x, player.y, player.width, player.height))
        {
            this.sound_death.play();
            player.onMobCollision(this.damage);
            this.death = 1;
            //DESPAWN MOB
            
            deleteMobs.push(mobNum);
            this.deathAnimation();
        }
    }
}