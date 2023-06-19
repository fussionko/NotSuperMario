class Score{
    constructor(x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.font = "20px Courier New";

        this.score = 0;
        this.scoreString = 'Score: 000';
    
        
        main_ctx.font = this.font;
        this.width = main_ctx.measureText(this.scoreString).width;
        this.height = 15;

    }

    lowerScore(num)
    {
        this.score -= num;
        this.computeString();
    }

    increaseScore(num)
    {
        this.score += num;
        this.computeString();
    }

    computeString()
    {
        this.scoreString = 'Score: ';
        let temp = this.score.toString();
        if(temp.length == 2)
            temp = '0' + temp;
        else if(temp.length == 1)
            temp = '00' + temp;
        this.scoreString += temp;
    }

    redraw()
    {
        this.clear();
        this.draw();
    }

    draw()
    {
        main_ctx.beginPath();
        main_ctx.font = this.font;
        main_ctx.fillText(this.scoreString, this.x, this.y);
    }

    clear()
    {
        main_ctx.beginPath();
        main_ctx.clearRect(this.x, this.y-13, this.width, this.height);
    }
}