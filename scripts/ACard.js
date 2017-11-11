class ACard{
    constructor(player){
        this.texture = TextureManager.getInstance().cards;        
        this.x;
        
        this.ownwer = player;
        this.y = HEIGHT - ACard.h;
        this.selected = false;
        
        
    }   
    
    toggleSelect(){
        this.selected = !this.selected;
    }
    select(){this.selected = true;}
    unselect(){this.selected = false;}
    
}

ACard.w = 81*0.7;
ACard.h = 107*0.7;
ACard.origH = 107;
ACard.origW = 81;