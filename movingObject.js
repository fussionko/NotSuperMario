class movingObject {
    constructor(x, y, width, height, vX, startVY){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.prevx = x;
        this.prevy = y;
        this.vX = vX;
        this.startVY = startVY;
        this.velocityY = 0;
        this.velocityX = 0;

        this.fall = 0;
        this.jump = 0;
       
        this.left = 0;
        this.right = 0;

        this.gravity = 0.9;

        // Cas v zraku
        this.s = 0;

        this.ignoreCollision = 0;

        this.dir = 1;

        // Za preverjanje padanja
        this.cont = 0;

        this.land = 0;
        this.count = 0;
    }

    // Premakni objekt
    move(secondsPassed)
    {
        if(this.left)
        {
            this.velocityX -= this.vX;
            this.calcVelocityX(secondsPassed);
            this.dir = 0;
        }
        if(this.right)
        {
            this.velocityX += this.vX;
            this.calcVelocityX(secondsPassed);
            this.dir = 1;
        }

        if(this.fall)
        {
            this.s += secondsPassed;
            this.calcVelocityY(secondsPassed);
        }
        if(this.jump)
        {
            this.s += secondsPassed;
            this.calcVelocityY(secondsPassed);
            if(this.velocityY >= 0)
            {
                this.jump = 0;
                this.cont = 0;
                this.startFall();
            }
        }
        if(!this.left && !this.right)
            this.velocityX = 0;
        if(!this.jump && !this.fall)
            this.velocityY = 0;
    }

    randomSound(sound, rand)
    {
        if(Math.floor(Math.random()*rand) == 1)
            sound.play();
    }

    drawDirectionalImage(img_x, img_y, img_w, img_h)
    {
        main_ctx.beginPath();

        if(!this.dir)
        {
            
            main_ctx.translate(this.x + this.width, this.y);
            main_ctx.scale(-1, 1);
            main_ctx.drawImage(this.img, img_x, img_y, img_w, img_h, 0, 0, this.width, this.height);
            main_ctx.setTransform(1,0,0,1,0,0);
        }
        else
            main_ctx.drawImage(this.img, img_x, img_y, img_w, img_h, this.x, this.y, this.width, this.height);

        main_ctx.closePath();
    }

    // Preveri collision z drugim objektom
    checkCollision(x1, y1, width1, height1)
    {
        if(this.x < x1 + width1 && this.x + this.width > x1 &&
            this.y < y1 + height1 && this.y + this.height > y1)
            return 1;
        return 0;
    }

    // Kopiraj kordinate
    copyCord()
    {
        this.prevx = this.x;
        this.prevy = this.y;
    }

    // Izracunaj hitrost X in posodobi x kordinato
    calcVelocityX()
    {
        this.velocityX *= 0.9;
        this.x = Math.round(this.x+this.velocityX);
    }

    // Izracunaj hitrost Y in posodobi y kordinato
    calcVelocityY()
    {
        this.velocityY += this.gravity*this.s //Gravity
        this.y = Math.round(this.y+this.velocityY);  
    }

    // Narisi
    draw()
    {
        main_ctx.beginPath();
        main_ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // Odrisi
    clear()
    {
        main_ctx.beginPath();
        main_ctx.clearRect(this.prevx, this.prevy, this.width, this.height);
    }

    // Ponovno nariši in posodobi kordinate
    redraw()
    {
        this.clear();
        this.draw();
        this.copyCord();
    }

    
    // Zacni skok
    startJump()
    {
        this.velocityY = this.startVY;
        this.jump = 1;
        this.fall = 0;
        this.s = 0;
        this.currentPlat = null;
    }

    // Ustavi skok
    stopJump()
    {
        this.velocityY = 0;
        this.jump = 0;
        player.cont = 0;
        this.startFall();
    }

    //Zacne padanje
    startFall()
    {
        this.velocityY = 0;
        this.fall = 1;
        this.s = 0;
    }

    // Ustavi padanje
    stopFall() 
    {
        this.velocityY = 0;
        this.fall = 0;
        this.land = 1;
    }

    justDontMovePlz()
    {
        this.stopFall();
        this.stopJump();
        this.right = 0;
        this.left = 0;
        this.copyCord();
    }

    // Preveri ce objekt pada
    checkFreeFall(floorCollision)
    {
        if(floorCollision) return;
        if(this.jump) return;
        if(this.y + this.height >= canvasH) return;

        if(!this.fall)
            this.startFall();
    }

    deathAnimation()
    {
        this.startJump();
        this.ignoreCollision = 1;
    }
}