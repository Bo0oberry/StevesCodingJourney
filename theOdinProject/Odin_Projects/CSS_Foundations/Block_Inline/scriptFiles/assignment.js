const assignment = {
  root: document.getElementById("assignment"),
  
  button: {
    
    
    createButton() {
      const button = document.createElement('button');
      
      button.id = "assignment_button";
      this.root.appendChild(button);
    },
    
    timeoutFunc: null,
    
    getDimensions() {
      const rect = document.getElementById("assignment_button").getBoundingClientRect;
      return {
        width: rect.width,
        height: rect.height
      }
    },
    

  },
  
  particle: {
    magnitudeOfTravel: 0.8,
    
    create() {
      
    },
    
    destroy() {
      
    },
    
    randomColor() {
      return `hsl(${Math.floor(Math.random() * 360)}, 80%, 80%)`;
    },
    
    randomPosition() {
      const buttonDimentions = this.button.getDimensions();
      const randomYdistance = Math.
    },
    
  },
  
  getRandomFromRange(a,b) {
    const min = Math.min(a,b);
    const max = Math.max(a,b);
    return Math.floor(Math.random() * (max - min + 1) )+ min;
  }
}