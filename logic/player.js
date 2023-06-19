class Player extends movingObject {
    constructor(vX, startVY)
    {
        super(0, 0, 50, 50, vX, startVY);

        this.width = 80;
        this.height = 90;

        this.mobCollision = 0; 
        this.kickForceX = 0;

        this.img = new Image;
        this.img.src = "images/player_neki.png";

        this.health = new Health(3);
        this.score = new Score(30, this.health.y + this.health.height+15, 100, 20);

        this.dead = 0;

        this.wStand = 80;
        this.hStand = 110;
        this.wRun = 105;
        this.hRun = 105;
        this.hFall_Jump = 110;
        this.prevPlayerImageStand = 0;
        this.prevPlayerImageRun = 0;

        this.first = 0;

        this.sound_death = new Sound("sounds/player_sound_1.mp3");

        this.finish = 0;

        this.startFall();
    }


    drawPlayer()
    {
        this.clear();

        if(this.land)
        {
            this.drawDirectionalImage(this.wRun*2, this.hFall_Jump*3 + 85, this.wRun, this.hFall_Jump);
            if(!this.first)
            {
                this.first = 1;
                this.count = 0;
            }
            if(this.count == 20)
            {
                this.land = 0;
                this.first = 0;
            }
        }
        else if(this.velocityY < 0)
            this.drawDirectionalImage(0, this.hFall_Jump*3 + 85, this.wRun, this.hFall_Jump);
        else if (this.velocityY > 0)
            this.drawDirectionalImage(this.wRun, this.hFall_Jump*3 + 85, this.wRun, this.hFall_Jump);
        else if(this.velocityX == 0)
            this.standDraw();
        else
            this.runDraw();

        this.count = (this.count+1) % 21;
        
        this.copyCord();
    }

    standDraw()
    {
        if(this.count == 20)
            this.prevPlayerImageStand = (this.prevPlayerImageStand+1) % 4;

        if(this.prevPlayerImageStand==0)
            this.drawDirectionalImage(this.wStand*this.prevPlayerImageStand+5, 0, this.wStand, this.hStand);
        else
            this.drawDirectionalImage(this.wStand*this.prevPlayerImageStand+10, 0, this.wStand, this.hStand);
    }

    runDraw()
    {
        if(this.count == 5)
            this.prevPlayerImageRun = (this.prevPlayerImageRun+1) % 3;

        if(this.prevPlayerImageRun < 3)
            this.drawDirectionalImage(this.wRun*this.prevPlayerImageRun, this.hRun+35, this.wRun, this.hRun);
        else
            this.drawDirectionalImage(this.wRun*(this.prevPlayerImageRun%3), this.hRun*2+50, this.wRun, this.hRun);
    }

    onCollision(objects, mobs, coins, level)
    {
        let floorCollision = 0;
        if(this.ignoreCollision) return;
        for(let i in objects)
        {
            if(mobs.includes(parseInt(i))) continue;
            if(coins.includes(parseInt(i))) continue;
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

                    if(level.checkSpecialObject(i))
                    {
                        objects[i].state++;
                        if(objects[i].spawn==1)
                        {
                            level.addCoin(objects[i].x, objects[i].y-coin_h, coin_w, coin_h);
                            level.objects[level.coins[level.coins.length-1]].collected = 1;
                            level.objects[level.coins[level.coins.length-1]].startJump();
                            level.objects[level.coins[level.coins.length-1]].sound_collected.play();
                            objects[i].spawn = 0;
                            this.score.increaseScore(level.objects[level.coins[level.coins.length-1]].value);
                        }
                        if(objects[i].stateOver())
                            level.removeSpecialObject(i);
                    }
                    if(level.checkDestroyObject(i))
                    {
                        objects[i].state++;
                        if(objects[i].stateOver())
                            level.removeDestroyObject(i);
                    }
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
    }
    
    outOfScreen()
    {
        if(this.ignoreCollision || this.dead) return;

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
            this.y = 0
            if(this.jump)
                this.stopJump(); 
        }
    
        //TLA
        if(this.y+this.height == canvasH)
        {
            this.y = canvasH-this.height;
            return;
        }
        else if(this.y+this.height > canvasH)
        {
            this.y = canvasH-this.height;
            if(this.fall)
            {
                this.stopFall();
            }
                
        }
    }

    onMobCollision(mobDamage)
    {
        this.health.lowerHp(mobDamage);
        if(this.health.checkZeroHp() && !this.dead)
        {
            this.dead = 1;
            this.sound_death.play();
        }
    }

    onCoinsCollision(coinValue)
    {
        this.score.increaseScore(coinValue);
    }
}