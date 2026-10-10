const intro_markTextArray = [
  "box-sizing",
  "block",
  "inline",
  "display"
]
const introElement = document.getElementById("introduction");

const intro_btn = {
  id: "intro_btn",
  isCreated: false,


  particle: {
    FADE_DURATION: 2500, // ms
    FROM_CENTER_DURATION: 500, // ms
    dispersionMagnitude: 1.5, // % Value
    timeOut: null
  },

  targetSelf() {
    if (this.isCreated) {
      return document.getElementById(this.id);
    }
  },

  createSelf(targetParentElement) {
    if (!this.isCreated) {
      this.isCreated = true;
      const newBtn = document.createElement('button');
      newBtn.id = this.id;
      targetParentElement.appendChild(newBtn);
    }
  },

  markText() {
    //join arry words together
    const intro_arrayJoined = intro_markTextArray.join("|");
    //create a regEx Pattern
    const intro_patternString = `\\b(${intro_arrayJoined})\\b`;
    const intro_patternRegEx = new RegExp(intro_patternString, "gi");

    // Create a TreeWalker to recursively find ALL text nodes
    const walker = document.createTreeWalker(
      introElement,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Ignore text inside the button or already marked elements
          const parentTag = node.parentElement.tagName;
          if (parentTag === "BUTTON" || parentTag === "MARK") {
            return NodeFilter.FILTER_REJECT;
          }
          return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
      }
    );

    // Collect text nodes into an array first (modifying DOM during walk can break iteration)
    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    // Replace matched text nodes
    textNodes.forEach(node => {
      if (intro_patternRegEx.test(node.textContent)) {
        const span = document.createElement("span");
        span.innerHTML = node.textContent.replace(intro_patternRegEx, "<mark>$&</mark>");
        node.replaceWith(...span.childNodes);
      }
    });
  },

  unmarkText() {
    //find all marked elements 
    const markedElements = document.querySelectorAll("#introduction mark");

    //remove marked node but keep text node
    markedElements.forEach(mark => {
      mark.replaceWith(...mark.childNodes);
    });
  },

  generateParticles() {
    const randomParticleAmount = Math.floor(Math.random() * 8) + 8;
    const buttonHeight = this.targetSelf().getBoundingClientRect().height;
    const buttonWidth = this.targetSelf().getBoundingClientRect().width;

    for (let i = 0; i < randomParticleAmount; i++) {
      const particle = document.createElement("span");
      particle.classList.add("particle");
      const size = Math.floor(Math.random() * 5) + 5;
      particle.style.height = size + "px";
      particle.style.width = size + "px";
      particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 80%)`;
      particle.style.animationDuration = `${this.particle.FADE_DURATION}ms, ${this.particle.FROM_CENTER_DURATION}ms`;

      const x = this.getRandomInt((buttonWidth -  size) / 2, (buttonWidth  - size) / -2) * this.particle.dispersionMagnitude;
      const y = this.getRandomInt((buttonHeight - size) / 2, (buttonHeight - size) / -2) * this.particle.dispersionMagnitude;
      particle.style.transform = `translate(${x}px, ${y}px)`;

      this.targetSelf().appendChild(particle);
    }
  },

  destroyParticles() {
    //click btn
    // generate particles when btn is selected 
    // particles fade after FADE_DURAION and then are removed from dom
    //
    if (this.particle.timeOut != null) {
      clearTimeout(this.particle.timeOut);
      this.particle.timeOut = null;
    }

    const particles = document.querySelectorAll("#introduction .particle");
    particles.forEach(ele => ele.remove());

    this.particle.timeOut = setTimeout(() => {
      const particles = document.querySelectorAll("#introduction .particle");
      particles.forEach(ele => ele.remove());
    }, this.particle.FADE_DURATION + 100);
  },

  getRandomInt(a, b) {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    // Math.random() gives 0 to <1
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}

// Create & append Button inside #introduction
intro_btn.createSelf(document.getElementById("introduction"));
intro_btn.targetSelf().textContent = "Highlight Key Terms"


intro_btn.targetSelf().addEventListener("click", () => {

  intro_btn.targetSelf().classList.toggle("selected");


  if (intro_btn.targetSelf().classList.contains("selected")) {
    console.log("test: selected");
    intro_btn.markText();
    intro_btn.generateParticles();
  } else {
    console.log("test: deselected");
    intro_btn.unmarkText();
    intro_btn.destroyParticles();
  }


});



