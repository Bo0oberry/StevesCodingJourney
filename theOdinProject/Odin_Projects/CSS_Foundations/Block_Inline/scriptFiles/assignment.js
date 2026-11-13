const assignment = {
  root: document.getElementById("assignment"),

  packageTextIntoSpan(){
    document.querySelectorAll()
  },
  
  button: {
    
    createButton() {
      const button = document.createElement('button');
      
      button.classList.add("button");
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>';
      
      button.addEventListener("click", () => {
        const isSelected = button.classList.toggle("selected");
        const parent = button.parentElement;

        isSelected ? parent.style.display = "auto" : parent.style.display = "none";
      });

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
      // const randomYdistance = Math.
    },

    getRandomFromRange(a,b) {
    const min = Math.min(a,b);
    const max = Math.max(a,b);
    return Math.floor(Math.random() * (max - min + 1) )+ min;
  }
  },
}