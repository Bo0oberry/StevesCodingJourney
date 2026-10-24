const divsAndSpans = {
  root: document.getElementById('divsAndSpans'),
  
  p1: {
    style(p) {
      p.classList.add("p1");
    },
    setup(p1) {
      this.style(p1);
      divsAndSpans.extractTextNodeToDiv(p1);
      divsAndSpans.button.create(p1);
    }
  },
  
  particle: {
    generateParticleStyle(particle) {
      particle.style.height = this.getRandomNumFromRange(5, 8);
      particle.style.width = this.getRandomNumFromRange(5, 8);
      
      particle.style.backgroundColor = `hsl(${this.getRandomNumFromRange(0,160)}, 80%, 80%)`;
    },
    
    getRandomNumFromRange(a, b) {
      const max = Math.max(a, b);
      const min = Math.min(a, b);
      
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
  }, //end of particle
  
  button: {
    create(target) {
      const button = document.createElement("button");
      button.style.height = "30px";
      button.style.width = "30px";
      
      button.addEventListener("click", () => {
        const selected = button.classList.toggle("selected");
        
        if (selected) {
          
        } else {
          
        }
      });
      
      p.insertAdjacentElement("afterbegin", button);
    },
  }, //end of button
  
  extractTextNodeToDiv(p) {
    const treeWalker = document.createTreeWalker(
      // Root node
      p,
      //What to show
      NodeFilter.SHOW_TEXT,
      // Mode filter function
      (node) => {
        const nodeParent = node.parentElement.tagName;
        if (nodeParent === "BUTTON") {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    );
    
    let pNodes = [];
    while (treeWalker.nextNode()) {
      pNodes.push(treeWalker.currentNode);
    };
    
    pNodes.forEach(node => {
      const span = document.createElement("span");
      span.innerHTML = `<div class="div">${node.textContent}</div>`;
      node.replaceWith(...span.childNodes);
    });
  },
  
  
  animationPattern: {
    loadanimations() {},
  }, //end of animation pattern 
  
  
  styleSection() {
    const paragraphs = this.root.querySelectorAll("p");
    this.p1.setup(paragraphs[0]);
    
  }
  
};


divsAndSpans.styleSection();