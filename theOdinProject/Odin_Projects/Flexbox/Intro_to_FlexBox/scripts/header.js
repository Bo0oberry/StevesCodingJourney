const header = {
    
    
}

const headerCanvas = {
    canvas: null,
    context: null,
    gameWidth: 480,
    gameHeight: 220,
    
    draw() {
        const randomNum = Math.floor(Math.random() * 360);
        const color = `hsl(${randomNum},80%, 80%)`;
        
        this.context.fillStyle = color;
        this.context.fillRect(225, 175, 200, 150);
    },
    
    reSizeCanvas() {
        const scale = Math.min(
            window.innerHeight / this.gameHeight,
            window.innerWidth / this.gameWidth
        );
        
        const canvasWidth = this.gameWidth * scale;
        const canvasHeight = this.gameHeight * scale;
        
        this.canvas.style.height = canvasHeight + "px";
        this.canvas.style.width = canvasWidth + 'px';
        
    },
    
    load() {
        
        window.addEventListener("load", () => {
            this.canvas = document.getElementById("header-canvas");
            this.context = this.canvas.getContext("2d");
            
            this.reSizeCanvas();
            
            if (this.context) this.draw();
        });
        
        window.addEventListener("resize", () => {this.reSizeCanvas()});
    }
};
