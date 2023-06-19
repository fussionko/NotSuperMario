class Map {
    constructor()
    {
        this.levels = [];
        this.numOfLevels = 0;

        this.currentLevel = 0;

        this.bestTime = null;
        this.score = 0;
    
        this.numOfMaps++;

        this.displayBackgrounndImage = document.createElement("img");
        this.name;
    }

    addLevel(level)
    {
        this.levels[this.numOfLevels] = level;
        this.numOfLevels++;
    }

    nextLevel()
    {
        this.levels[this.currentLevel].clear();
        this.currentLevel++;
        this.levels[this.currentLevel].draw();
    }

    prevLevel()
    {
        this.levels[this.currentLevel].clear();
        this.currentLevel--; 
        this.levels[this.currentLevel].draw();
    }

    checkNextLevel()
    {
        if(this.currentLevel+1 < this.numOfLevels)
            return 1;
        return 0;
    }

    checkPrevLevel()
    {
        if(this.currentLevel-1 >= 0)
            return 1;
        return 0;
    }

    checkFinished(player)
    {
        if(this.currentLevel+1 == this.numOfLevels)
            if(player.y >= this.levels[this.currentLevel].finishY && player.x >= this.levels[this.currentLevel].finishX)
                return 1;     
        return 0;
    }

    updateScore(score)
    {
        this.score = score;
    }

    setDisplayImage(src)
    {
        this.displayBackgrounndImage.src = src;
        this.displayBackgrounndImage.alt = src;
    }

    setName(name)
    {
        this.name = name;
    }
}

