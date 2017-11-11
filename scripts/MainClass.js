class Main {

    constructor() {
        var textures = TextureManager.getInstance();
        this.key = null;
        this.lastUpdateTime = 0;
        this.acDelta = 0;

        this.board = new Board(10, 10, 0, 0);

        this.mover = [new Mover(0, 5, "blue"),
                      new Mover(9, 9, "red")
                     ];
        canvas.addEventListener('click', this.canvaClick.bind(this), false);

        this.coins = [];
        for (var i = 0; i < 6; i++) {
            this.coins[i] = new Coin(Math.floor(Math.random() * 9), Math.floor(Math.random() * 9), textures.coin);
        }

        this.player = new Player("Name", true, this.mover[0], this);
    }

    start() {
        requestAnimFrame(this.start.bind(this));
        this.input();

        var delta = Date.now() - this.lastUpdateTime;
        if (this.acDelta > INTERVAL) {
            this.acDelta = 0;
            //Dessine un frame    
            this.update();
            this.draw();
        } else {
            this.acDelta += delta;
        }
        this.lastUpdateTime = Date.now();


    }

    input() {}

    update() {


        this.mover.forEach(function (m) {
            m.update();
        });
        this.coins.forEach(function (c) {
            c.update();
        });
    }

    draw() {
        CTX.fillStyle = "white";
        CTX.fillRect(0, 0, WIDTH, HEIGHT);

        this.board.draw();


        this.coins.forEach(function (c) {
            c.draw();
        });
        this.mover.forEach(function (m) {
            m.draw();
        });

        this.player.displayCards();

        this.drawText();
    }



    drawText() {
        //Coins left
        CTX.font = "20px Arial";
        CTX.fillStyle = "#000000";
        CTX.textBaseline = "hanging";
        CTX.textAlign = "left";
        CTX.fillText("Coins left: " + this.coins.length, PADDING, PADDING);
        
        
        //Section titles
        var sectionY = HEIGHT - ACard.h - PADDING - 20;
        //cards
        CTX.textAlign = "center";
        CTX.fillText("Your cards", (4 * ACard.w + PADDING) / 2, sectionY);
        //Selection
        CTX.textAlign = "center";
        CTX.fillText("CurrentRound", WIDTH/2, sectionY);
        
        //Points
        CTX.fillText("Points", WIDTH/6*5, sectionY);
        
    }


    canvaClick(event) {
        var x = event.pageX - canvas.offsetLeft,
            y = event.pageY - canvas.offsetTop;

        var isoDest = screenToIsometric(x, y);
        this.mover[0].destination.x = Math.floor(Math.random() * 9);
        this.mover[0].destination.y = Math.floor(Math.random() * 9);


        //Verif si selection de carte
        if (y >= HEIGHT - (ACard.h + PADDING) && y <= HEIGHT - PADDING && x <= 4 * ACard.w + PADDING && x >= PADDING) {
            var selected = Math.floor((x-PADDING) / ACard.w);
            console.log("selected: ", selected);
            this.player.Cards[selected].toggleSelect();
        }

    }

}
