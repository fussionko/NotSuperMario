class Heart {
    constructor(x, y, width, height)
    {
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.img = new Image;
        this.img.src = "images/heart_neki.png";

        this.heartWidth = 275;
        this.heartHeight = 233;

    }

    drawFull()
    {
        main_ctx.beginPath();
        main_ctx.drawImage(this.img, 0, 0, this.heartWidth, this.heartHeight, this.x, this.y, this.width, this.height);
    }

    drawHalf()
    {
        main_ctx.beginPath();
        main_ctx.drawImage(this.img, this.heartWidth, 0, this.heartWidth, this.heartHeight, this.x, this.y, this.width, this.height);
    }

    drawEmpty()
    {
        main_ctx.beginPath();
        main_ctx.drawImage(this.img, this.heartWidth*2, 0, this.heartWidth, this.heartHeight, this.x, this.y, this.width, this.height);
    }

    clear()
    {
        main_ctx.beginPath();
        main_ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}

class Health {
    constructor(numOfHearts)
    {
        this.x = 0;
        this.y = 0;

        this.hearts = [];
        this.numOfHearts = 0;
        for(let x = 0, y = 0;this.numOfHearts < numOfHearts; this.numOfHearts++)
        {
            this.hearts[this.numOfHearts] = new Heart(x, y, 64, 64);
            x+=64;
        }

        this.height = this.hearts[0].height;
        this.width = this.hearts[0].width*numOfHearts;

        this.startHp = 1000;
        this.hp = this.startHp;
        this.perHeart = 100/this.numOfHearts;
    }

    lowerHp(num)
    {
        this.hp -= num;
    }

    increaseHp(num)
    {
        this.hp += num;
    }

    checkZeroHp()
    {
        if(this.hp <= 0)
            return 1;
        return 0;
    }

    redraw()
    {
        this.clear();
        this.draw();
    }

    draw()
    {
        main_ctx.beginPath();
        for(let i = 1, comp = (this.hp*100)/this.startHp; i <= this.numOfHearts; i++)
        {
            if(comp >= this.perHeart*i)
                this.hearts[i-1].drawFull();
            else if(comp >= this.perHeart*i-this.perHeart/2)
                this.hearts[i-1].drawHalf();
            else if(comp < this.perHeart*i)
                this.hearts[i-1].drawEmpty();
        }
    }

    clear()
    {
        main_ctx.beginPath();
        this.hearts.forEach(heart => heart.clear());
    }
}