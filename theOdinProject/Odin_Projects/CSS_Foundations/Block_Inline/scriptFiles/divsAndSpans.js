const divsAndSpans = {
  root: document.getElementById('divsAndSpans'),
  
  paragraphs: {
    p1: {
      text: {
        
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
          animation: {
            style: "disperse",
            time: 1000
          },
          timeOut: null
        }
        
      },
      
      button: {
        
        particleStyle: {
          size: "random",
          amount: 13,
          color: "random",
          animation: {
            style: "disperse",
            time: 700
          },
          timeOut: null
        },
        
        event(pEle, button) {
          const slider = document.createElement("input");
          slider.setAttribute("type", "range");
          slider.setAttribute("min", "0");
          slider.setAttribute("max", "130");
          slider.setAttribute("value", "10");
          slider.setAttribute("step", "1");
          
          slider.addEventListener("input", (e) => {
            const currentValue = e.target.value;
            button.style.setProperty("--amount", currentValue + "deg");
          });
          
          button.parentElement.appendChild(slider);
        },
        
        eventDeselected(pEle, button) {
          const slider = button.parentElement.querySelector("input");
          slider.remove();
        },
      },
    },
    
    p2: {
      text: {
        
        highlightedWords: ["div", "block"],
        
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
          animation: {
            style: "disperse",
            time: 500
          }
        }
      },
      
      button: {
        
        event(pEle, button) {
          
        },
        
        eventDeselected(pEle, button) {
          
        },
        
        particleStyle: {
          size: 4,
          amount: 25,
          color: "red",
          animation: {
            style: "dispersePolar",
            time: 1000
          }
        }
      },
    },
    
    p3: {
      text: {
        
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
          animation: {
            style: "disperse",
            time: 1000
          }
        }
        
      },
      
      button: {
        particleStyle: {
          size: 15,
          amount: 3,
          color: "cyan",
          animation: {
            style: "disperse",
            time: 600
          }
        },
        
        event(pEle, button) {
          if (!this.eventTriggered) {
            this.eventTriggered = true;
            
            // Bind persistent references so we can cleanly remove them later
            this._boundKeyDown = (e) => this.keyboardKeyPress(e, button);
            this._boundKeyUp = (e) => this.keyboardKeyUp(e, button);
            
            window.addEventListener("keydown", this._boundKeyDown);
            window.addEventListener("keyup", this._boundKeyUp);
          }
        },
        
        eventDeselected(pEle, button) {
          this.player.x = 0;
          this.player.y = 0;
          button.style.translate = `${this.player.x}px ${this.player.y}px`;
          
          if (this._boundKeyDown) {
            window.removeEventListener("keydown", this._boundKeyDown);
            window.removeEventListener("keyup", this._boundKeyUp);
            this.eventTriggered = false;
          }
        },
        
        keys: {
          ArrowUp: false,
          ArrowDown: false,
          ArrowLeft: false,
          ArrowRight: false,
          w: false,
          s: false,
          a: false,
          d: false
        },
        
        player: {
          x: 0,
          y: 0,
          speed: 5
        },
        
        eventTriggered: false,
        
        keyboardKeyPress(event, button) {
          if (event.key in this.keys) {
            this.keys[event.key] = true;
            event.preventDefault()
            this.updatePosition(button);
          }
        },
        
        keyboardKeyUp(event, button) {
          if (event.key in this.keys) {
            this.keys[event.key] = false;
          }
        },
        
        updatePosition(button) {
          if (this.keys.ArrowUp || this.keys.w) this.player.y -= this.player.speed;
          if (this.keys.ArrowDown || this.keys.s) this.player.y += this.player.speed;
          if (this.keys.ArrowLeft || this.keys.a) this.player.x -= this.player.speed;
          if (this.keys.ArrowRight || this.keys.d) this.player.x += this.player.speed;
          
          button.style.translate = `${this.player.x}px ${this.player.y}px`;
        },
        
      },
    },
    
    p4: {
      
    },
    
    p5: {
      
    },
    
    setup(paragraphElement, index) {
      const pObjectKey = `p${index}`;
      this.genericSetup(pObjectKey);
      
      //Create button
      divsAndSpans.button.create(paragraphElement, pObjectKey);
      
      //Style paragragh Element
      paragraphElement.classList.add(pObjectKey);
      
      //Highlight Text
      divsAndSpans.highlight.extractTextNodeToDiv(paragraphElement);
      divsAndSpans.highlight.highlight(paragraphElement, pObjectKey);
      
    },
    
    genericSetup(pObjectKey) {
      this[pObjectKey] = { ...this.test, ...this[pObjectKey] }
    },
    
    test: {
      text: {
        
        highlightedWords: ["div", "span"],
        
        createRegExPattern() {
          const words = this.highlightedWords.join("|");
          const pattern = `web|${words}`;
          const regExp = new RegExp(pattern, "gi");
          return regExp
        },
        
        particleStyle: {
          size: "random",
          amount: "random",
          color: "white",
          animation: {
            style: "disperse",
            time: 1000
          },
          timeOut: null
        }
        
      },
      
      button: {
        
        particleStyle: {
          size: "random",
          amount: "random",
          color: "white",
          animation: {
            style: "disperse",
            time: 500
          },
          timeOut: null
        },
        
        event(pEle, button) {},
        
        eventDeselected(pEle, button) {},
      },
    },
    
    
  }, //End of Paragraphs
  
  highlight: {
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
      
      const regExPattern = divsAndSpans.paragraphs[targetName].text.createRegExPattern();
      
      targetDiv.innerHTML = targetDiv.innerHTML.replace(regExPattern, `<mark>$&</mark>`)
    },
  }, //End of Highlight
  
  button: {
    create(pElement, targetName) {
      const button = document.createElement("button");
      
      button.addEventListener("click", (event) => {
        const selected = button.classList.toggle("selected");
        
        switch (selected) {
          case true: // is selected
            //Create particles around button when clicked
            const buttonArgs = {
              target: button,
              particleStyle: divsAndSpans.paragraphs[targetName].button.particleStyle
            };
            divsAndSpans.particle.create(buttonArgs);
            
            //Run custom button event
            divsAndSpans.paragraphs[targetName].button.event(pElement, button);
            break;
          case false: // not selected
            divsAndSpans.particle.destroy(button);
            
            //Run custom button event
            divsAndSpans.paragraphs[targetName].button.eventDeselected(pElement, button);
            break;
        }
      });
      
      pElement.insertAdjacentElement("afterbegin", button);
    },
    
  }, //end of button
  
  
  particle: {
    
    getRandomNumFromRange(a, b) {
      const max = Math.max(a, b);
      const min = Math.min(a, b);
      
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    
    create(particleArgs) {
      const { target, particleStyle } = particleArgs;
      let { size = 'random', amount = 'random', color = 'random', animation = { style: "random", time: 500 } } = particleStyle;
      
      const targetRect = target.getBoundingClientRect();
      
      const targetStats = {
        target: target,
        tHeight: targetRect.height,
        tWidth: targetRect.width
      }
      
      const particlesArray = [];
      
      //get Number of partices to create
      amount = (Number.isFinite(amount) && amount >= 0) ?
        amount :
        this.getRandomNumFromRange(5, 13);
      
      
      for (let i = 0; i < amount; i++) {
        const particle = document.createElement("span");
        particle.classList.add("particle");
        target.appendChild(particle);
        particlesArray.push(particle);
      };
      
      //Set Size
      if (Number.isFinite(size) && size >= 0) {
        particlesArray.forEach(ele => {
          ele.style.height = size + "px";
          ele.style.width = size + "px";
        });
      } else {
        particlesArray.forEach(ele => {
          let Rsize = this.getRandomNumFromRange(4, 8);
          ele.style.height = Rsize + "px";
          ele.style.width = Rsize + "px";
        });
      }
      
      //Set BG Color
      if (CSS.supports('color', color)) {
        particlesArray.forEach(ele => {
          ele.style.backgroundColor = color;
        });
      } else {
        particlesArray.forEach(ele => {
          ele.style.backgroundColor = `hsl(${this.getRandomNumFromRange(0, 360)}, 80%, 80%)`;
        });
      }
      
      //Set Animation
      let animStyle = animation.style;
      let animTime = animation.time ?? 500;
      
      if (animation.style === "random") {
        const numOfAnimations = this.animations.length - 1;
        const randomAnimation = this.getRandomNumFromRange(0, numOfAnimations);
        animStyle = this.animations[randomAnimation];
      }
      
      switch (animStyle) {
        case "disperse":
          target.querySelectorAll(".particle").forEach((ele) => {
            this.disperse(targetStats, ele, animTime);
          });
          break;
      }
      
      //Set timeOut
      window.setTimeout(() => {
        particlesArray.forEach((particle) => {
          particle.remove();
        });
        
      }, animTime + 100);
    },
    
    destroy(target) {
      if (!target) return;
      target.querySelectorAll('.particle').forEach(ele => ele.remove());
    },
    //Animation Protocols
    
    disperse(targetStats, particle, animationTime) {
      const { target, tHeight, tWidth } = targetStats;
      const x = this.getRandomNumFromRange(tWidth / 2, tWidth / -2);
      const y = this.getRandomNumFromRange(tHeight / 2, tHeight / -2);
      
      particle.style.setProperty("--x", x + "px");
      particle.style.setProperty("--y", y + "px");
      particle.style.animationName = "disperse";
      particle.style.animationDuration = animationTime + "ms";
      particle.style.animationFillMode = "forwards";
    },
    
    
    dispersePolar(targetStats, particle, animationTime) {
      const particleRangeAsPercentOfParentSize = [0.8, 1.2];
      const { target, tHeight, tWidth } = targetStats;
      
      const distance = this.getRandomNumFromRange(
        tHeight * particleRangeAsPercentOfParentSize[0],
        tHeight * particleRangeAsPercentOfParentSize[1]);
      
      const angle = this.getRandomNumFromRange(0, 360);
      
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      particle.style.setProperty("--x", x + "px");
      particle.style.setProperty("--y", y + "px");
      particle.style.animationName = "disperse";
      particle.style.animationDuration = animationTime + "ms";
      particle.style.animationFillMode = "forwards";
    },
    
    animations: ["disperse", "dispersePolar"]
    
  }, //End of Particle
  
  
  styleSection() {
    const paragraphs = this.root.querySelectorAll("p");
    paragraphs.forEach((ele, index) => {
      this.paragraphs.setup(ele, index + 1);
    });
    
  }
  
};


divsAndSpans.styleSection();