function loadMaps()
{
    let map1 = new Map();
    map1.setName("Lepa Lepa mapa");
    map1.setDisplayImage("images/background_image_2.jpg");
    let level1_1 = new Level(0, canvasH, canvasW, canvasH,"images/background_image_2.jpg");
        level1_1.addGameObject(100, 600, block_w, block_h, 1);
        level1_1.addGameObject(100+block_w, 600, block_w, block_h, 1);
        level1_1.addGameObject(100+block_w*2, 600, block_w, block_h, 2);
        level1_1.addGameObject(100+block_w*3, 600, block_w, block_h, 2);
        level1_1.addGameObject(100+block_w*4, 600, block_w, block_h, 2);
        level1_1.addGameObject(100+block_w*5, 600, block_w, block_h, 3);
        level1_1.addGameObject(100+block_w*2, 400, block_w, block_h, 2);
        level1_1.addGameObject(100+block_w*3, 400, block_w, block_h, 2);
        level1_1.addGameObject(100+block_w*4, 400, block_w, block_h, 3);
        level1_1.addGameObject(100+block_w*5, 400, block_w, block_h, 2);
        level1_1.addGameObject(100+block_w*6, 400, block_w, block_h, 2);
        level1_1.addGameObject(100+block_w*9, 400, block_w, block_h, 4);
        level1_1.addGameObject(block_w*13, 300, block_w, block_h, 1);
        level1_1.addGameObject(block_w*14, 300, block_w, block_h, 1);
        level1_1.addGameObject(block_w*15, 300, block_w, block_h, 1);
        level1_1.addCoin(block_w*14, 300-coin_h, coin_w, coin_h);

        level1_1.addMob(800, canvasH-100, 100, 100, 0.2, -4);
        level1_1.addMob(100+block_w*3, 500, 100, 100, 0.2, -4);


    let level1_2 = new Level(0, canvasH, canvasW, canvasH,"images/background_image_2.jpg");
        level1_2.addGameObject(50, 600, block_w, block_h, 2);
        level1_2.addGameObject(50+block_w, 600, block_w, block_h, 1);
        level1_2.addGameObject(50+block_w*2, 600, block_w, block_h, 1);
        level1_2.addGameObject(50+block_w*3, 600, block_w, block_h, 3);
        level1_2.addGameObject(50+block_w*4, 600, block_w, block_h, 2);
        level1_2.addGameObject(50+block_w*5, 600, block_w, block_h, 1);
        level1_2.addGameObject(50+block_w*6, 600, block_w, block_h, 4);
        level1_2.addGameObject(120, 300, block_w, block_h, 1);
        level1_2.addGameObject(120+block_w, 300, block_w, block_h, 3);
        level1_2.addGameObject(500, 200, block_w, block_h, 2);
        level1_2.addGameObject(500+block_w, 200, block_w, block_h, 2);
        level1_2.addGameObject(500+block_w*2, 200, block_w, block_h, 2);
        level1_2.addGameObject(500+block_w*3, 200, block_w, block_h, 2);
        level1_2.addGameObject(900, 100, block_w, block_h, 1);

        level1_2.addCoin(120, 300-coin_h, coin_w, block_h);
        level1_2.addCoin(400, canvasH-coin_h, coin_w, block_h);
        level1_2.addCoin(600, canvasH-coin_h, coin_w, coin_h);
        level1_2.addCoin(900, 100-coin_h, coin_w, coin_h);
        level1_2.addMob(300, 700, 80, 80, 0.1, -4);
        level1_2.addMob(700, 700, 80, 80, 0.3, -4);

    let level1_3 = new Level(0, canvasH, canvasW, canvasH,"images/background_image_2.jpg");
        level1_3.addGameObject(450, 600, block_w, block_h, 2);
        level1_3.addGameObject(450+block_w, 600, block_w, block_h, 1);
        level1_3.addGameObject(450+block_w*2, 600, block_w, block_h, 1);
        level1_3.addGameObject(450+block_w*3, 600, block_w, block_h, 3);
        level1_3.addGameObject(450+block_w*4, 600, block_w, block_h, 2);
        level1_3.addGameObject(450+block_w*5, 600, block_w, block_h, 1);
        level1_3.addGameObject(450+block_w*6, 600, block_w, block_h, 4);
        level1_3.addGameObject(200,400, block_w, block_h, 1);
        level1_3.addGameObject(200+block_w, 400, block_w, block_h, 3);
        level1_3.addGameObject(500, 200, block_w, block_h, 2);
        level1_3.addGameObject(100+block_w, 200, block_w, block_h, 2);
        level1_3.addGameObject(100+block_w*2, 200, block_w, block_h, 2);
        level1_3.addGameObject(100+block_w*3, 200, block_w, block_h, 2);
        level1_3.addGameObject(900, 200, block_w, block_h, 1);

        level1_3.addCoin(200, 400-coin_h, coin_w, coin_h);
        level1_3.addCoin(200, canvasH-coin_h, coin_w, coin_h);
        level1_3.addCoin(800, canvasH-coin_h, coin_w, coin_h);
        level1_3.addCoin(900, 100-coin_h, coin_w, coin_h);

        level1_3.addMob(300, 700, 180, 180, 0.1, -4);
        level1_3.addMob(500, 700, 20, 20, 0.5, -4);
        level1_3.addMob(900, 700, 90, 90, 0.2, -4);



    map1.addLevel(level1_1);
    map1.addLevel(level1_2);
    map1.addLevel(level1_3);

    let map2 = new Map();
    map2.setName("Nočni vihar");
    map2.setDisplayImage("images/bg_3.png");
        let level2_1 = new Level(0, 0, canvasW, 150,"images/bg_3.png");
            level2_1.addGameObject(100, 600, block_w, block_h, 1);
            level2_1.addGameObject(100+block_w, 600, block_w, block_h, 1);
            level2_1.addGameObject(100+block_w*2, 600, block_w, block_h, 1);
            level2_1.addGameObject(100+block_w*3, 600, block_w, block_h, 3);
            level2_1.addGameObject(100+block_w*4, 600, block_w, block_h, 1);
            level2_1.addGameObject(600+block_w*2, 300, block_w, block_h, 2);
            level2_1.addGameObject(600+block_w*3, 300, block_w, block_h, 2);
            level2_1.addGameObject(600+block_w*4, 300, block_w, block_h, 2);
            level2_1.addGameObject(550, 200, block_w, block_h, 4);
            level2_1.addGameObject(canvasW-block_w, 2*block_h+30, block_w, block_h, 2);
            level2_1.addGameObject(canvasW-block_w*2, 2*block_h+30, block_w, block_h, 2);
            level2_1.addGameObject(1200, 300, block_w, block_h, 2);
            level2_1.addGameObject(1200+block_w, 300+block_h, block_w, block_h, 2);
            level2_1.addCoin(550, 200-coin_h, coin_w, coin_h);
            level2_1.addCoin(canvasW-coin_w, canvasH-coin_h, coin_w, coin_h);
            level2_1.addMob(500, 700, 50, 50, 0.4, -4);
            level2_1.addMob(800, 700, 250,250, 0.1, -4);

        let level2_2 = new Level(0, 250, canvasW, 150,"images/bg_3.png");
            level2_2.addGameObject(0, 250, block_w, block_h, 1);
            level2_2.addGameObject(block_w, 250, block_w, block_h, 1);
            level2_2.addGameObject(block_w*2, 250, block_w, block_h, 1);

            level2_2.addGameObject(400, 600, block_w, block_h, 2);
            level2_2.addGameObject(400+block_w, 600, block_w, block_h, 2);
            level2_2.addGameObject(400+block_w*2, 600, block_w, block_h, 4);
            level2_2.addGameObject(400+block_w*3, 600, block_w, block_h, 2);
            level2_2.addGameObject(400+block_w*4, 600, block_w, block_h, 2);
            level2_2.addGameObject(400+block_w*5, 600, block_w, block_h, 1);

            level2_2.addGameObject(500, 250, block_w, block_h, 2);
            level2_2.addGameObject(500+block_w, 250, block_w, block_h, 2);

            level2_2.addGameObject(500, 150, block_w, block_h, 2);
            level2_2.addGameObject(500+block_w, 150, block_w, block_h, 3);
            level2_2.addGameObject(500+block_w*2, 150, block_w, block_h, 4);

            level2_2.addGameObject(800, 400, block_w, block_h, 1);
            level2_2.addGameObject(800+block_w, 400, block_w, block_h, 1);
            level2_2.addGameObject(800+block_w*2, 400, block_w, block_h, 1);
            level2_2.addCoin(800+block_w, 400-coin_h, coin_w, coin_h);

            level2_2.addGameObject(1300, 650, block_w, block_h, 2);
            level2_2.addGameObject(1300+block_w, 650, block_w, block_h, 3);
            level2_2.addGameObject(1300+block_w*2, 650, block_w, block_h, 2);
            level2_2.addCoin(1300+block_w, 650-coin_h, coin_w, coin_h);

            level2_2.addGameObject(canvasW-block_w, 150, block_w, block_h, 1);
            level2_2.addGameObject(canvasW-block_w*2, 150, block_w, block_h, 3);
            level2_2.addGameObject(canvasW-block_w*3, 150, block_w, block_h, 2);
            level2_2.addGameObject(canvasW-block_w*4, 150, block_w, block_h, 2);

            level2_2.addGameObject(canvasW-block_w, 500, block_w, block_h, 2);
            level2_2.addGameObject(canvasW-block_w*2, 500, block_w, block_h, 3);
            level2_2.addGameObject(canvasW-block_w*3, 500, block_w, block_h, 2);

            
            level2_2.addGameObject(canvasW-block_w*5, 0, block_w, block_h, 1);
            level2_2.addGameObject(canvasW-block_w*5, block_h, block_w, block_h, 1);
            level2_2.addGameObject(canvasW-block_w*5, block_h*2, block_w, block_h, 1);
            level2_2.addGameObject(canvasW-block_w*5, block_h*5, block_w, block_h, 1);
            level2_2.addGameObject(canvasW-block_w*5, block_h*6, block_w, block_h, 1);
            level2_2.addGameObject(canvasW-block_w*5, block_h*7, block_w, block_h, 1);


            level2_2.addCoin(550, canvasH-coin_h, coin_w, coin_h);
            level2_2.addCoin(0, canvasH-coin_h, coin_w, coin_h);

            level2_2.addMob(300, 700, 150, 150, 0.2, -4);
            level2_2.addMob(300, 700, 150, 150, 0.2, -4);
            level2_2.addMob(600, 700, 20, 20, 0.5, -4);
            level2_2.addMob(300, 700, 40, 40, 0.2, -4);
            level2_2.addMob(600, 700, 40, 40, 0.5, -4);

        let level2_3 = new Level(0, canvasH, canvasW, 500,"images/bg_3.png");
            level2_3.addGameObject(block_w*4, canvasH-block_w, block_w, block_h, 1);
            level2_3.addGameObject(block_w*4, canvasH-block_w*2, block_w, block_h, 1);
            level2_3.addGameObject(block_w*4, canvasH-block_w*3, block_w, block_h, 1);
            level2_3.addGameObject(block_w*4, canvasH-block_w*4, block_w, block_h, 1);
            level2_3.addGameObject(block_w*4, canvasH-block_w*5, block_w, block_h, 1);
            level2_3.addGameObject(block_w*4, canvasH-block_w*6, block_w, block_h, 1);
            level2_3.addGameObject(block_w*4, canvasH-block_w*7, block_w, block_h, 1);
            level2_3.addGameObject(block_w*4, canvasH-block_w*8, block_w, block_h, 1);
            level2_3.addGameObject(block_w*4, canvasH-block_w*9, block_w, block_h, 1);
            level2_3.addGameObject(block_w*4, canvasH-block_w*12, block_w, block_h, 2);
            level2_3.addGameObject(block_w*4, canvasH-block_w*13, block_w, block_h, 2);
            level2_3.addGameObject(0, canvasH-block_w*6, block_w, block_h, 1);
            level2_3.addGameObject(block_w, canvasH-block_w*6, block_w, block_h, 3);
            level2_3.addGameObject(block_w*2, canvasH-block_w*6, block_w, block_h, 1);
            level2_3.addGameObject(block_w*3, canvasH-block_w*6, block_w, block_h, 2);

            level2_3.addGameObject(500, 400, block_w, block_h, 1);
            level2_3.addGameObject(500, 400-block_h, block_w, block_h, 1);
            level2_3.addGameObject(500, 400-block_h*2, block_w, block_h, 1);
            level2_3.addGameObject(500, 400-block_h*3, block_w, block_h, 1);
            level2_3.addGameObject(500, 400-block_h*4, block_w, block_h, 1);

            level2_3.addGameObject(canvasW-block_w, 500, block_w, block_h, 1);
            level2_3.addGameObject(canvasW-block_w*2, 500, block_w, block_h, 1);

            level2_3.addCoin(block_w*4, canvasH-block_w*13-coin_h, coin_w, coin_h);
            level2_3.addCoin(70, canvasH-coin_h, coin_w, coin_h);
            level2_3.addCoin(800, canvasH-coin_h, coin_w, coin_h);
            level2_3.addCoin(140, canvasH-coin_h, coin_w, coin_h);

            level2_3.addGameObject(700, 300, block_w, block_h, 1);
            level2_3.addGameObject(1000, 200, block_w, block_h, 1);
            level2_3.addGameObject(1200, 200, block_w, block_h, 1);

            level2_3.addGameObject(block_w*5, canvasH-block_w*5, block_w, block_h, 1);

            level2_3.addMob(600, 700, 300, 300, 0.5, -4);
            level2_3.addMob(400, 700, 100, 100, 0.4, -4);
            level2_3.addMob(1100, 700, 100, 100, 0.4, -4);
            level2_3.addMob(600, 700, 29, 20, 0.8, -4);
            level2_3.addMob(1100, 700, 500, 500, 0.1, -4);

    map2.addLevel(level2_1);
    map2.addLevel(level2_2);
    map2.addLevel(level2_3);

    maps[0] = map1; 
    maps[1] = map2;
}

