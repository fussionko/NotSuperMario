class Level {
    constructor(pStartX, pStartY, pBackX, pBackY, bg_src){
        this.reset();

        this.playerStartX = pStartX;
        this.playerStartY = pStartY;

        this.playerBackX = pBackX;
        this.playerBackY = pBackY;

        this.bg = new Background(0, 0, canvasW, canvasH, bg_src);

        this.img_flag = new Image;
        this.img_flag.src = "flag_image.png";
        this.flag_x = pBackX-block_w;
        this.flag_y = pBackY-block_h*2;
        this.flag_w = block_w;
        this.flag_h = block_h*2;

        this.img_door_next = new Image;
        this.img_door_next.src = "door_image.png";
        this.door_next_x = pBackX-block_w;
        this.door_next_y = pBackY-block_h*2;
        this.door_next_w = block_w;
        this.door_next_h = block_h*2;
        
        this.img_door_prev = new Image;
        this.img_door_prev.src = "door_image.png";
        this.door_prev_x = pStartX;
        this.door_prev_y = pStartY-block_h*2;
        this.door_prev_w = block_w;
        this.door_prev_h = block_h*2;

        this.finishX = pBackX-block_w;
        this.finishY = pBackY-block_h*2;
    }

    onFinalCollision(player, lastLevel, map, first)
    {
        if(lastLevel)
        {
            if(player.checkCollision(this.flag_x, this.flag_y, this.flag_w, this.flag_h))
                player.finish = 1;
        }
        else if(player.checkCollision(this.door_next_x, this.door_next_y, this.door_next_w, this.door_next_h))
        {
            if(map.checkNextLevel())
            {
                player.clear();
                map.nextLevel();
                map.levels[map.currentLevel].setPlayerStart(player);
            }
            else
                player.x = canvasW-player.width;
        }
        if(first==0) return;
        if(player.checkCollision(this.door_prev_x, this.door_prev_y, this.door_prev_w, this.door_prev_h))
        {
            if(map.checkPrevLevel())
            {
                player.clear();
                map.prevLevel();
                map.levels[map.currentLevel].setPlayerBack(player);
            }
            else
                player.x = 0;
        }
    } 

    finalRedraw(lastLevel, first)
    {
        
        main_ctx.beginPath();
        if(lastLevel)
        {
            main_ctx.clearRect(this.flag_x, this.flag_y, this.flag_w, this.flag_h);
            main_ctx.clearRect(this.img_door_prev, this.door_prev_x, this.door_prev_y, this.door_prev_w, this.door_prev_h);
            main_ctx.drawImage(this.img_flag, this.flag_x, this.flag_y, this.flag_w, this.flag_h);
            main_ctx.drawImage(this.img_door_prev, this.door_prev_x, this.door_prev_y, this.door_prev_w, this.door_prev_h);
        }  
        else
        {
            main_ctx.clearRect(this.door_next_x, this.door_next_y, this.door_next_w, this.door_next_h);
            main_ctx.drawImage(this.img_door_next, this.door_next_x, this.door_next_y, this.door_next_w, this.door_next_h);  
            if(first!=0)
            {
                main_ctx.clearRect(this.img_door_prev, this.door_prev_x, this.door_prev_y, this.door_prev_w, this.door_prev_h);
                main_ctx.drawImage(this.img_door_prev, this.door_prev_x, this.door_prev_y, this.door_prev_w, this.door_prev_h);
            }
        }        
        main_ctx.closePath();
    }


    // Popravi indekse
    changeObjectMetaData(num)
    {
        for(let i in this.gameObjects)
            if(this.gameObjects[i] > num)
                this.gameObjects[i]--;
        for(let i in this.mobs)
            if(this.mobs[i] > num)
                this.mobs[i]--;
        for(let i in this.coins)
            if(this.coins[i] > num)
                this.coins[i]--;
        for(let i in this.specialObject)
            if(this.specialObject[i] > num)
                this.specialObject[i]--;
        for(let i in this.destroyObject)
            if(this.destroyObject[i] > num)
                this.destroyObject[i]--;
    }

    moveMobs(secondsPassed)
    {
        this.mobs.forEach(mobNum => this.objects[mobNum].move(secondsPassed));
    }

    mobsCollision(player)
    {
        this.deleteMobs = [];
        this.mobs.forEach(mobNum => {
            this.objects[mobNum].onCollision(this.objects, this.coins);
            this.objects[mobNum].onCollisionPlayer(player, mobNum, this.deleteMobs);
        });
        
        if(this.deleteMobs.length > 0)
        {
            this.deleteMobs.forEach(mobNum => {
                this.deleteMobs.sort(function(a, b){return b - a}); // Obsezno sortiranje od vecjega proti manjsemu za pravilno brisanje
                this.removeMob(mobNum)
            });
            this.deleteMobs = [];
        }
    }

    mobsOutOfScreen()
    {
        this.mobs.forEach(mobNum => this.objects[mobNum].outOfScreen());
    }

    mobsRedraw()
    {
        this.mobs.forEach(mobNum => this.objects[mobNum].redraw());
    }
    
    coinsOutOfScreen()
    {       
        this.coins.forEach(coinNum => this.objects[coinNum].outOfScreen(this, coinNum));
    }

    moveCoins(secondsPassed)
    {
        this.coins.forEach(coinNum => this.objects[coinNum].move(secondsPassed));
    }

    objectsRedraw()
    {
        this.specialObject.forEach(specialObjectNum => this.objects[specialObjectNum].redraw());
        this.destroyObject.forEach(destroyObjectNum => this.objects[destroyObjectNum].redraw());
    }

    coinsCollision(player)
    {
        this.deleteCoins = [];
        this.coins.forEach(coinNum => {
            this.objects[coinNum].onCollision(this.objects, this.gameObjects);
            this.objects[coinNum].onCollisionPlayer(player, coinNum, this.deleteCoins);
        });
        
        if(this.deleteCoins.length > 0)
        {
            this.deleteCoins.forEach(coinNum => {
                this.deleteCoins.sort(function(a, b){return b - a}); // Obsezno sortiranje od vecjega proti manjsemu za pravilno brisanje
                this.removeCoin(coinNum)
            });
            this.deleteCoins = [];
        }
    }

    checkSpecialObject(index)
    {
        for(let i = 0; i < this.numOfSpecialObject; i++)
            if(this.specialObject[i] == index)
                return 1;
        return 0;  
    }

    checkDestroyObject(index)
    {
        for(let i = 0; i < this.numOfDestroyObject; i++)
            if(this.destroyObject[i] == index)
                return 1;
        return 0;  
    }


    coinsRedraw()
    {
        this.coins.forEach(coinNum => this.objects[coinNum].redraw());
    }

    addObject(object)
    {
        this.objects[this.numOfObjects] = object;
        this.numOfObjects++;
    }

    removeObject(num)
    {
        this.objects[num].clear();
        this.objects.splice(num, 1);
        this.numOfObjects--;
    }

    addGameObject(x, y, width, height, type_of_object)
    {
        switch(type_of_object)
        {
            case 1: this.addObject(new GameObject_Solid(x, y, width, height)); break;
            case 2: this.destroyObject[this.numOfDestroyObject] = this.numOfObjects;
                    this.numOfDestroyObject++;
                    this.addObject(new GameObject_Destroy(x, y, width, height)); 
                break;
            case 3: this.specialObject[this.numOfSpecialObject] = this.numOfObjects;
                    this.numOfSpecialObject++;
                    this.addObject(new GameObject_Special(x, y, width, height)); 
                break;
            case 4: this.destroyObject[this.numOfDestroyObject] = this.numOfObjects;
                    this.numOfDestroyObject++;
                    this.addObject(new GameObject_Cracked(x, y, width, height)); break;
            default: case 1: this.addObject(new GameObject_1(x, y, width, height));
        }
        this.gameObjects[this.numOfGameObjects] = this.numOfObjects-1;
        this.numOfGameObjects++;
    }

    addMob(x, y, width, height, vX, startVY)
    {   
        this.addObject(new Mob(x, y, width, height, vX, startVY));
        this.mobs[this.numOfMobs] = this.numOfObjects-1;
        this.numOfMobs++;
    }

    removeMob(num)
    {
        this.removeObject(num);
        this.mobs.splice(this.mobs.indexOf(num, 0), 1);
        this.numOfMobs--;
        this.changeObjectMetaData(num);
    }

    addCoin(x, y, width, height)
    {
        this.addObject(new Coin(x, y, width, height));
        this.coins[this.numOfCoins] = this.numOfObjects-1;
        this.numOfCoins++;
    }

    removeCoin(num)
    {
        this.removeObject(num);
        this.coins.splice(this.coins.indexOf(num, 0), 1);
        this.numOfCoins--;
        this.changeObjectMetaData(num);
    }

    removeSpecialObject(num)
    {
        this.removeObject(num);
        this.specialObject.splice(this.specialObject.indexOf(num, 0), 1);
        this.numOfSpecialObject--;
        this.changeObjectMetaData(num);
    }

    removeDestroyObject(num)
    {
        this.removeObject(num);
        this.destroyObject.splice(this.destroyObject.indexOf(num, 0), 1);
        this.numOfDestroyObject--;
        this.changeObjectMetaData(num);
    }

    draw()
    {
        main_ctx.beginPath();
        this.objects.forEach(obj => obj.draw());
        this.bg.draw();
    }

    clear()
    {
        main_ctx.beginPath();
        this.objects.forEach(obj => obj.clear());
        main_ctx.clearRect(this.flag_x, this.flag_y, this.flag_w, this.flag_h);
        main_ctx.clearRect(this.door_prev_x, this.door_prev_y, this.door_prev_w, this.door_prev_h);
        main_ctx.clearRect(this.door_next_x, this.door_next_y, this.door_next_w, this.door_next_h);
        this.bg.clear();
    }

    setPlayerStart(player)
    {
        player.justDontMovePlz();
        player.x = this.door_prev_x+this.door_prev_w+20;
        player.y = this.door_prev_y;
    }

    setPlayerBack(player)
    {
        player.justDontMovePlz();
        player.x = this.door_next_x-this.door_next_w-20;
        player.y = this.door_next_y;
    }

    reset()
    {
        this.objects = [];
        this.numOfObjects = 0;

        this.gameObjects = [];
        this.numOfGameObjects = 0;

        this.mobs = [];
        this.numOfMobs = 0;

        this.coins = [];
        this.numOfCoins = 0;

        this.specialObject = [];
        this.numOfSpecialObject = 0;

        this.destroyObject = [];
        this.numOfDestroyObject = 0;
    }
}