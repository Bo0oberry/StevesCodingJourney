const divsAndSpans = {
  root: document.getElementById('divsAndSpans'),

  paragraphs: {
    p1: {
      highlightedWords: ["div","span"],
      
      createRegExPattern() {
        const words = this.highlightedWords.join("|");
        const pattern = `web|${words}`;
        const regExp = new RegExp(pattern, "gi");
        return regExp
      },

      buttonEvent(state) {

      }
    },

    p2: {
    },

    p3: {

    },

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

    higlight(target,targetName) {
      const targetDiv = target.querySelector("div"); 
    
      const regExPattern = this[targetName].createRegExPattern();

      targetDiv.innerHTML = targetDiv.innerHTML.replace(regExPattern, `<mark>$&</mark>`)
    },

    setup(paragraphElement,index) {
        const targetName = `p${index}`;

        divsAndSpans.button.create(paragraphElement,targetName);

      
        paragraphElement.classList.add(targetName);

        this.extractTextNodeToDiv(paragraphElement);
        this.higlight(paragraphElement,targetName)


      }
  },//End of Paragraphs


  particle: {
    generateParticleStyle(particle) {
      particle.style.height = this.getRandomNumFromRange(5, 8);
      particle.style.width = this.getRandomNumFromRange(5, 8);

      particle.style.backgroundColor = `hsl(${this.getRandomNumFromRange(0, 160)}, 80%, 80%)`;
    },

    getRandomNumFromRange(a, b) {
      const max = Math.max(a, b);
      const min = Math.min(a, b);

      return Math.floor(Math.random() * (max - min + 1) + min);
    },


    create(target,amount ="random", size = "random", color = "random") {

      const count = (Number.isFinite(amount) && amount >= 0)
        ? amount
        :this.getRandomNumFromRange(5,13);
      
      

      for (let i=0; i<=count ; i++ ) {
        const particle = document.createElement("span");
        particle.classList.add("particle");
      }
    }

  }, //End of Particle

  button: {
    create(target,targetName) {
      const button = document.createElement("button");

      button.addEventListener("click", (event) => { 
        const selected = button.classList.toggle("selected");

        divsAndSpans.paragraphs[targetName].buttonEvent(selected);
      });

      target.insertAdjacentElement("afterbegin", button);
    },

  }, //end of button


  styleSection() {
    const paragraphs = this.root.querySelectorAll("p");
    paragraphs.forEach((ele,index) => {
      this.paragraphs.setup(ele,index +1);
    });

  }

};


divsAndSpans.styleSection();