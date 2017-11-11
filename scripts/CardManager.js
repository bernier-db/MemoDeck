class CardManager{
    constructor(){}
    
    static pickCard(player){
        var distance = Math.floor(Math.random() * 4 + 2);
        var direction = Math.floor(Math.random() * 4);
        return new DirectionCard(player, distance, direction);
        
    }
}