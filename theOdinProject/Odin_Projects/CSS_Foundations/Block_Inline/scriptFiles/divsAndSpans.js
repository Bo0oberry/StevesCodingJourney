const divsAndSpans = {
    root: document.getElementById('divsAndSpans'),
    
    paragraphs: {
      p1: {
        highlightedWords: ["div", "span"],
        
        createRegExPattern() {
          const words = this.highlightedWords.join("|");
          const pattern = `web|${words}`;
          const regExp = new RegExp(pattern, "gi");
          return regExp
        },
        
        particleStyle: {
          size: 8,
          amount: 12,
          color: "red",
          animation: "disperse"
        }
      },
      
      button: {
        event(state, pEle, button) {
          switch (state) {
            case true: // is selected
              divsAndSpans.particle.create(button, divsAndSpans.paragraphs.p1.particleStyle);
              break;
            case false: // not selected
              break;
          }
        },
        
      },
      
      p2: {},
      
      p3: {    },
      
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
      
      highlight(target, targetName) {
        const targetDiv = target.querySelector("div");
        
        const regExPattern = divsAndSpans.paragraphs[targetName].createRegExPattern();
        
        targetDiv.innerHTML = targetDiv.innerHTML.replace(regExPattern, `<mark>$&</mark>`)
      },
      
      setup(paragraphElement, index) {
        const targetName = `p${index}`;
        
        divsAndSpans.button.create(paragraphElement, targetName);
        
        
        paragraphElement.classList.add(targetName);
        
        this.extractTextNodeToDiv(paragraphElement);
        this.highlight(paragraphElement, targetName);
        
      }  
        
      }, //End of Paragraphs
      
      
      particle: {
        
        getRandomNumFromRange(a, b) {
          const max = Math.max(a, b);
          const min = Math.min(a, b);
          
          return Math.floor(Math.random() * (max - min + 1) + min);
        },
        
        create(target, style) {
          let { size = 'random', amount = 'random', color = 'random', animation = "random" } = style;
          
          const targetRect = target.getBoundingClientRect();
          const targetHeight = targetRect.height;
          const targetWidth = targetRect.width;
          
          
          amount = (Number.isFinite(amount) && amount >= 0) ?
            amount :
            this.getRandomNumFromRange(5, 13);
          
          for (let i = 0; i <= amount; i++) {
            size = (Number.isFinite(size) && size >= 0) ?
              size :
              this.getRandomNumFromRange(4, 8);
            
            color = (CSS.supports('color', color)) ?
              color :
              `hsl(${this.getRandomNumFromRange(0,360)}, 80%, 80%)`;
            
            const particle = document.createElement("span");
            particle.classList.add("particle");
            particle.style.height = size + 'px';
            particle.style.width = size + 'px';
            particle.style.color = color;
          }
        },
        
      }, //End of Particle
      
      button: {
        create(pElement, targetName) {
          const button = document.createElement("button");
          
          button.addEventListener("click", (event) => {
            const selected = button.classList.toggle("selected");
            
            divsAndSpans.paragraphs[targetName].button.event(selected, pElement, button);
          });
          
          pElement.insertAdjacentElement("afterbegin", button);
        },
        
      }, //end of button
      
      
      styleSection() {
        const paragraphs = this.root.querySelectorAll("p");
        paragraphs.forEach((ele, index) => {
          this.paragraphs.setup(ele, index + 1);
        });
        
      }
      
    };
    
    
    divsAndSpans.styleSection();