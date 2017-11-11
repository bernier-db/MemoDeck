class Player {
    constructor(name, isHost, character, game){

        this.isHost = isHost;
        this.name = game;
        this.character = character;
        this.points = 0;
        this.game = game;
        this.cards = [];
        this.isPlaying = isHost ? true : false;
        
        for(var i = 0; i < 4; i++){
            this.cards[i] = CardManager.pickCard(this);
        }
        
    }

    get Cards(){return this.cards;}
    
    toggleIsPlaying(){
        this.isPlaying = !this.isPlaging;
    }
    
    win(){}
    
    
    displayCards(){
        this.cards.forEach(function(c, idx){
            c.draw(idx);
        });
    }
}