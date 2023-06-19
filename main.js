let player;
let main_canvas, main_ctx, bg_canvas, bg_ctx;

let screenW = window.innerWidth;
let screenH = window.innerHeight;
let canvasW = Math.round(screenW*0.9);
let canvasH = Math.round(screenH*0.9);

let secondsPassed;
let oldTimeStamp = 0;
let fps;

//temp
let holdA, holdD;

let maps = [], current_map;

let updateFrame;

let timer_s = 0;

let theme_song;
let win;

const coin_w = 60;
const coin_h = 60;
const block_w = 60;
const block_h = 60;

document.addEventListener("DOMContentLoaded", function(){

    main_canvas = new Canvas(canvasW, canvasH, document.getElementById("container-canvas"));
    main_ctx = main_canvas.getContext();
    
    player = new Player(0.5, -9);
    initInput();

    loadMaps();


    current_map = 1;

    theme_song = new Sound("theme_song.mp3");
    theme_song.setLoop();

    win = new Sound("level_sound_win.mp3");

    start();
});

function update(timeStamp)
{
    /* TA DEL JE SKOPIRAN */
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    fps = Math.round(1 / secondsPassed);
    // ------------------------------

    timer_s += secondsPassed;

    //TEMP
    maps[current_map].levels[maps[current_map].currentLevel].mobs.forEach(mob => {
        if(Math.round(Math.random()*1000) == 1)
            if(!maps[current_map].levels[maps[current_map].currentLevel].objects[mob].jump && !maps[current_map].levels[maps[current_map].currentLevel].objects[mob].fall)
                maps[current_map].levels[maps[current_map].currentLevel].objects[mob].startJump();
    });
    
    // Premakne premikajoče objekte
    player.move(secondsPassed);
    maps[current_map].levels[maps[current_map].currentLevel].moveMobs(secondsPassed);
    maps[current_map].levels[maps[current_map].currentLevel].moveCoins(secondsPassed);

    //Preveri konec
    if(player.finish)
    {
        if(player.dead == 0)
            finish();
    }

    if(!updateFrame) return;

    // Za to da ce skocis ob collision na levo ali desno stran in drzis levo/desno te ko je konec collision premakne v to smer
    checkKeyHold();

    // Preveri collisione na druge objekte
    player.onCollision(maps[current_map].levels[maps[current_map].currentLevel].objects, maps[current_map].levels[maps[current_map].currentLevel].mobs, maps[current_map].levels[maps[current_map].currentLevel].coins, maps[current_map].levels[maps[current_map].currentLevel]);
    maps[current_map].levels[maps[current_map].currentLevel].mobsCollision(player);
    maps[current_map].levels[maps[current_map].currentLevel].coinsCollision(player);
    maps[current_map].levels[maps[current_map].currentLevel].onFinalCollision(player, !maps[current_map].checkNextLevel(), maps[current_map], maps[current_map].currentLevel);
    

    // Preveri naslednji/prejsni level
    // Preveri ce je kateri izmed premikajocih objektov izven zaslona
    player.outOfScreen();
    maps[current_map].levels[maps[current_map].currentLevel].mobsOutOfScreen();
    maps[current_map].levels[maps[current_map].currentLevel].coinsOutOfScreen();

    // Ponovno nariše premikajoče objekte in jim posodobi prejsne kordinate
    player.drawPlayer();
    maps[current_map].levels[maps[current_map].currentLevel].mobsRedraw();
    maps[current_map].levels[maps[current_map].currentLevel].coinsRedraw();
    maps[current_map].levels[maps[current_map].currentLevel].objectsRedraw();
    maps[current_map].levels[maps[current_map].currentLevel].finalRedraw(!maps[current_map].checkNextLevel(), maps[current_map].currentLevel);

    player.health.redraw();
    player.score.redraw();

    // Ko je brskalnik pripravljen in je vse izverseno se spet klice funkcija update
    if(player.dead)
    {
        if(!player.ignoreCollision)
        {
            player.deathAnimation();
            theme_song.stop();
        }
        if(player.y > canvasH*3)
        {
            stop();
            return;
        }
    }
    window.requestAnimationFrame(update);
}

function loadMap()
{
    maps[current_map].levels[maps[current_map].currentLevel].draw();
    player.draw();
    player.score.draw();
    player.health.draw();
    theme_song.play();
}

function displayMaps()
{
    let parent = document.getElementById("container-all-maps");
    let i = 0;
    maps.forEach(function(map) {
        let container_map = document.createElement("div");
        container_map.classList.add("container-map");
        container_map.id = i;
        i++;

        container_map.appendChild(map.displayBackgrounndImage);

        let name = document.createElement("span");
        name.innerText = 'Ime: ' + map.name;
        container_map.appendChild(name);

        let time = document.createElement("span");
        if(map.bestTime == null)
            time.innerText = 'Najbolši čas: NaN';
        else
            time.innerText = 'Najbolši čas: ' + sec2time(map.bestTime);
        container_map.appendChild(time);

        let score = document.createElement("span");
        score.innerText = 'Rezultat: ' + map.score;
        container_map.appendChild(score);

        container_map.addEventListener("click", function(){
            current_map = this.id;
            startMap();
        });

        parent.appendChild(container_map);
    });
}

function startMap()
{
    clear();
    loadMap();
    updateFrame = 1;
    timer_s = 0;
    window.requestAnimationFrame(update);
}

function clear()
{
    let remove = document.getElementById("container-canvas").getElementsByTagName("div");
    let remove2 = document.getElementById("container-canvas").getElementsByTagName("span");
    while(remove.length != 0)
        remove[0].remove();
    while(remove2.length != 0)
        remove2[0].remove();
}

function start()
{
    win.stop();
    clear();

    let container_canvas = document.getElementById("container-canvas");
    container_canvas.style.width = canvasW+'px';
    container_canvas.style.height = canvasH+'px';

    let name = document.createElement("div");
    name.id = 'main-name';
    name.innerText = 'NOT SUPER MARIO';
    container_canvas.appendChild(name);

    let sign = document.createElement("div");
    sign.id = 'sign';
    sign.innerText = 'Naredil: Sebastjan Vidergar';
    container_canvas.appendChild(sign);

    let container_maps = document.createElement("div");
    container_maps.id = "container-all-maps";
    container_canvas.appendChild(container_maps);
    
    displayMaps();
}

function stop()
{
    notWork();

    let container_canvas = document.getElementById("container-canvas");

    let name = document.createElement("div");
    name.id = 'main-name';
    name.innerText = 'DEATH';
    container_canvas.appendChild(name);

    let reset = document.createElement("div");
    reset.id = 'reset';
    reset.innerText = 'RESET';
    reset.addEventListener("click", () => start());
    container_canvas.appendChild(reset);

    let sign = document.createElement("div");
    sign.id = 'sign';
    sign.innerText = 'Naredil: Sebastjan Vidergar';
    container_canvas.appendChild(sign);

    let container_maps = document.createElement("div");
    container_maps.id = "container-all-maps";
    container_canvas.appendChild(container_maps);

}

function notWork()
{
    updateFrame = 0;
    maps[current_map].levels[maps[current_map].currentLevel].clear();
    player.health.clear();
    player.score.clear();
    player.clear();
    maps[current_map].currentLevel = 0;
    

    let statBuffer = [];
    copyStats(maps, statBuffer)
    maps = [];
    current_map = 0;
    loadMaps();
    pasteStats(maps, statBuffer);

    player = new Player(0.5, -9);
}

function copy()
{
    maps[current_map].score = player.score.score;
    maps[current_map].bestTime = timer_s;
}

function finish()
{
    if(maps[current_map].bestTime != null)
    {
        if(maps[current_map].bestTime > timer_s)
            copy();
        else if(maps[current_map].bestTime == timer_s)
            if(maps[current_map].score < player.score.score)
                copy();
    }
    else
        copy();


    theme_song.stop();
    win.play();
    notWork();

    let container_canvas = document.getElementById("container-canvas");

    let name = document.createElement("div");
    name.id = 'main-name';
    name.innerText = 'ZMAGA';
    container_canvas.appendChild(name);

    let reset = document.createElement("div");
    reset.id = 'reset';
    reset.innerText = 'Nazaj na menu';
    reset.addEventListener("click", () => start());
    container_canvas.appendChild(reset);

    let time = document.createElement("div");
    time.id = 'time';
    time.innerText = sec2time(timer_s);
    container_canvas.appendChild(time);

    let score = document.createElement("span");
    score.innerText = 'Rezultat: ' + maps[current_map].score;
    container_canvas.appendChild(score);

    let sign = document.createElement("div");
    sign.id = 'sign';
    sign.innerText = 'Naredil: Sebastjan Vidergar';
    container_canvas.appendChild(sign);

    let container_maps = document.createElement("div");
    container_maps.id = "container-all-maps";
    container_canvas.appendChild(container_maps);
}

function copyStats(copy, paste)
{
    for(let i = 0; i < copy.length; i++)
    {
        if(copy[i].bestTime != null)
            paste[i] = {"score":copy[i].score, "bestTime":copy[i].bestTime}
        else
            paste[i] = {"score":0, "bestTime":null}
    }
}

function pasteStats(paste, copy)
{
    for(let i = 0; i < paste.length; i++)
    {
        paste[i].score = copy[i]["score"];
        paste[i].bestTime = copy[i]["bestTime"];
    }
}


// Skopirano z neta
function sec2time(timeInSeconds) {
    var pad = function(num, size) { return ('000' + num).slice(size * -1); },
    time = parseFloat(timeInSeconds).toFixed(3),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60),
    milliseconds = time.slice(-3);

    return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) + ',' + pad(milliseconds, 3);
}
