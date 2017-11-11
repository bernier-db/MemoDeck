class DirectionCard extends ACard {
    constructor(player, distance, direction){
        super(player);
        
        this.distance = distance;
        //0: N, 1: S, 2: W, 3: E
        this.direction = direction;
    }
    
    
    draw(pos) {
        this.x = pos * ACard.w;
        var sprite_x = this.direction * ACard.origW,
            sprite_y = (this.distance-2) * ACard.origH;
        
        CTX.drawImage(this.texture, sprite_x, sprite_y, ACard.origW, ACard.origH, this.x+PADDING, this.y-PADDING, ACard.w, ACard.h);     
        
        if(this.selected){
            CTX.beginPath();
            CTX.strokeStyle = "blue";
            CTX.lineWidth = 2;
            CTX.rect(this.x+1+PADDING, this.y-PADDING, ACard.w-2, ACard.h);
            CTX.stroke();
            CTX.closePath();
        }
    }
    
    
}