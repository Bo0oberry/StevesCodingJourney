const lessonOverview = {
  root: document.getElementById("lesson_overview"),

  highlightWords: {
    words: ["block", "inline"],

    highlight() {
      const container = lessonOverview.root;
      if (!container) return;

      // Fixed: use this.words instead of this.hightlight.words
      const string = `\\b(?:${this.words.join("|")})\\b`;
      const regExPattern = new RegExp(string, "gi");

      const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
      const textNodes = [];

      while (walker.nextNode()) {
        if (walker.currentNode.textContent.trim()) {
          textNodes.push(walker.currentNode);
        }
      }

      textNodes.forEach(node => {
        if (regExPattern.test(node.textContent)) {
          const span = document.createElement("span");

          const safeText = node.textContent
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

          span.innerHTML = safeText.replace(regExPattern, "<mark>$&</mark>");
          node.replaceWith(...span.childNodes);
        }
      });
    }
  },

  practiceHtml: {
    root: null,

    content: `
      <p>
        Shortbread jelly-o sugar plum sweet I love cookie cotton candy shortbread liquorice. Macaroon sesame snaps candy ice cream carrot cake. Marzipan jelly beans apple pie bear claw carrot cake jelly I love. Dragée liquorice carrot cake chocolate jelly-o halvah. Pastry marzipan jelly beans bonbon jelly beans sweet roll. Chocolate ice cream wafer sweet chocolate. Dragée dessert toffee pudding I love lollipop macaroon cupcake.
      </p>
      <p>
        Cake sesame snaps croissant powder cake chocolate bar biscuit ice cream. Gummi bears pastry sweet roll tart toffee apple pie cake. Oat cake ice cream oat cake I love liquorice tiramisu marzipan. Sesame snaps cake caramels cake icing tootsie roll sesame snaps bonbon. Cheesecake pastry bonbon liquorice marshmallow macaroon. Topping muffin sugar plum gummies tootsie roll I love cake I love. Lollipop apple pie marzipan shortbread shortbread candy canes bonbon I love tart. Chocolate bar cake marshmallow marzipan chupa chups tiramisu. Marshmallow brownie oat cake jujubes I love tootsie roll gummi bears cake. Chocolate cake cheesecake dessert ice cream I love.
      </p>
      <p>
        Biscuit cake cotton candy gummi bears caramels cake wafer halvah. Tootsie roll halvah gummi bears I love donut donut toffee. I love brownie marshmallow candy fruitcake jelly. Caramels soufflé jelly-o sweet roll cupcake cake bear claw I love I love. Chocolate lemon drops apple pie carrot cake macaroon cake. Wafer jelly marzipan pie gingerbread. Donut sesame snaps gummies jujubes jujubes shortbread jelly beans I love. Danish tart topping pastry sugar plum tootsie roll chocolate cake.
      </p>`,

    createContainer() {
      const div = document.createElement("div");
      div.id = "lessonOverview_practiveHTML_container";
      div.innerHTML = this.content;
      div.style.display = "none";
      div.style.flexDirection = "column";

      // Fixed: Assign directly to this.root instead of using getElementById on unattached elements
      this.root = div;
      return div;
    },

    practiceRegExp() {
      const target = this.root;
      if (!target) return;
      
      let html = target.innerHTML;

      const regExPattern1 = /\bsugar\b/gi;
      html = html.replace(regExPattern1, `<mark>$&</mark>`);

      const regExPattern2 = /\b(candy|plum)\b/gi;
      html = html.replace(regExPattern2, `<span style="background-color:white">thicc thighed & $& femboys</span>`);

      const regExPattern3 = /\bCake/gim;
      html = html.replace(regExPattern3, `<span style="background-color:pink">phat dumpy</span>`);

      const regExPattern4 = /\w+(?=\s\w*bar\w*)/gi;
      html = html.replace(regExPattern4, `<span style="background-color:teal">$&</span>`);

      const regExPattern5 = /\bca(n|r)\w*/gi;
      html = html.replace(regExPattern5, `<span style="background-color:gold">$&</span>`);

      target.innerHTML = html;
    },

    createPracticeHTML() {
      const wrapper = this.createContainer();
      this.practiceRegExp(); // Run regex after the container root is initialized

      const button = lessonOverview.button.createButton(wrapper);

      if (lessonOverview.root) {
        lessonOverview.root.appendChild(button);
        lessonOverview.root.appendChild(wrapper);
      }
    },
  },

  button: {
    root: null,
    isSelected: false,

    createButton(wrapper) {
      const button = document.createElement("button");
      button.id = "lessonOverview_practiveHTML_button";
      button.textContent = "Practice";
      button.style.width = "100px";
      button.style.marginLeft = "60px";
      button.style.position = "relative";

      this.root = button;
      this.clickEvent(button, wrapper);

      return button;
    },

    clickEvent(button, wrapper) {
      button.addEventListener("click", () => {
        this.isSelected = !this.isSelected;
        button.classList.toggle("selected", this.isSelected);

        if (wrapper) {
          wrapper.style.display = this.isSelected ? "flex" : "none";
          wrapper.style.padding = "0 30px"; // Fixed: removed invalid .root property reference
        }

        button.setAttribute("aria-expanded", String(this.isSelected)); // Fixed: using this.isSelected

        lessonOverview.particle.createParticle(button);
        lessonOverview.particle.destroyParticle(button, this.isSelected);
      });
    },
  },

  particle: {
    animationDuration: 2000 /* MS */,
    animationDuration2: 1100 /* MS */,
    animationDelay2: 1800,
    dispertionMagnitude: 0.8,
    timeOutFunc: null,

    createParticle(particleParent) {
      const parentRect = particleParent.getBoundingClientRect();
      const particleParentWidth = parentRect.width;
      const particleParentHeight = parentRect.height;

      const randomNum = Math.floor(Math.random() * 5) + 10;
      for (let i = 0; i <= randomNum; i++) {
        const particle = document.createElement("span");
        particle.classList.add("particle");

        const size = lessonOverview.getRandomInt(3, 8) + "px";
        particle.style.height = size;
        particle.style.width  = size;

        particle.style.backgroundColor = `hsl(${lessonOverview.getRandomInt(0,360)}, 80%, 50%)`;

        const displaceY = lessonOverview.getRandomInt(particleParentWidth / 2, particleParentWidth / -2) * this.dispertionMagnitude; 
        const displaceX = lessonOverview.getRandomInt(particleParentHeight / 2, particleParentHeight / -2) * this.dispertionMagnitude; 
        particle.style.transform = `translate(
          ${displaceY}px,
          ${displaceX}px)`;
        particle.style.animationDuration = `${this.animationDuration}ms, ${this.animationDuration2}ms`;
        particle.style.animationDelay = `0s, ${this.animationDelay2}ms`;

        particleParent.appendChild(particle);
      }
    },

    destroyParticle(particleParent, isSelected) {
      if (this.timeOutFunc !== null) {
        clearTimeout(this.timeOutFunc);
        this.timeOutFunc = null;
      }

      const particles = particleParent.querySelectorAll(".particle");

      if (!isSelected) { 
        particles.forEach(particleElement => { particleElement.remove(); }); 
      }

      const totalAnimationTime = this.animationDelay2 + this.animationDuration2;

      this.timeOutFunc = setTimeout(() => {
        particles.forEach(particleElement => { particleElement.remove(); });
      }, totalAnimationTime + 100);
    },

  },

  getRandomInt(a, b) {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};

// Execute functions safely
if (lessonOverview.root) {
  lessonOverview.highlightWords.highlight();
  lessonOverview.practiceHtml.createPracticeHTML();
}