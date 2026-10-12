const blockVsInline = {
  rootNode: document.getElementById("blockVsInline"),

  highlightWords: {

    words: [
      "display: block",
      "display: inline-block",
      "<a>",
    ],

    highlight() {
      // 1. Escape regex special characters, then make whitespace flexible
      const escapedWords = this.words.map(word =>
        word
          .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          .replace(/\s/g, '\\s+')
      );
      const joinedString = escapedWords.join("|");

      const escapeHtml = (str) => {
        return str.replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      };

      // create a regular expression 
      const highlightRegExPattern = new RegExp(joinedString, "gi");

      // create a tree Walker to look through nodes
      const walker = document.createTreeWalker(
        // root node to look through
        blockVsInline.rootNode,

        // what to show
        NodeFilter.SHOW_TEXT,

        // filter function / object
        (node) => {
          const nodeParent = node.parentNode;
          if (nodeParent.tagName !== "P" && nodeParent.tagName !== "A") {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      );

      // Push text nodes to a modifiable array 
      const textNodes = [];

      while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
      }

      // Modify nodes
      textNodes.forEach(node => {
        const span = document.createElement("span");

        span.innerHTML = node.textContent.replace(highlightRegExPattern, (match) => {
          return `<mark>${escapeHtml(match)}</mark>`;
        });
        node.replaceWith(...span.childNodes);
      });
    },

    removeHighlight() {
      // Select all highlight marks directly and replace them with their text content
      const marks = blockVsInline.rootNode.querySelectorAll("mark");
      marks.forEach(mark => {
        mark.replaceWith(mark.textContent);
      });
    },

    button: {

      createButton() {
        const button = document.createElement("button");

        this.CSSproperties(button);
        button.addEventListener("click", this.clickEvent);
        this.anchorTargetToH2(button);
      },

      CSSproperties(button) {
        button.style.height = "15px";
        button.style.width = "25px";
        button.style.backgroundImage = "url(/Assests/SVG_Icons/utility_highlight.svg)";
        button.style.backgroundRepeat = "no-repeat";
        button.style.backgroundPosition = "center center";
        button.style.backgroundSize = "contain";
        // button.style.

      },

      anchorTargetToH2(button) {
        const target = blockVsInline.rootNode.querySelector("h2");
        if (!target) return;

        target.insertAdjacentElement('beforeend', button);

      },

      clickEvent(event) {
        const isSelected = event.target.classList.toggle("isSelected");

        switch (isSelected) {
          case true:
            //Encase target words in mark elements and style button 
            event.target.style.backgroundImage = "url(/Assests/SVG_Icons/utility_erase.svg)";
            blockVsInline.highlightWords.highlight();
            //Particles
            const markedElements = document.querySelectorAll("#blockVsInline mark");
            markedElements.forEach((ele) => blockVsInline.particle.create(ele));
            blockVsInline.particle.remove()
            break;
          case false:
            // Remove mark elements from target words and style button
            event.target.style.backgroundImage = "url(/Assests/SVG_Icons/utility_highlight.svg)";
            blockVsInline.highlightWords.removeHighlight();
            // Delete Particles
            break;
        }
      }
    }

  },

  particle: {
    ANIME_DURR: 1000,
    magnitudeOfDisplaceMent: 1.2,
    timeOutFunc: null,

    create(targetElement) {
      const parentSize = targetElement.getBoundingClientRect();
      
      const particleCount = blockVsInline.getRandomIntFromRange(8,15);
      for(let i=0 ; i<particleCount ; i++) {

        const particle = document.createElement("span");
        particle.classList.add("particle");
  
        this.styleParticle(particle,parentSize);
  
        targetElement.appendChild(particle);
      };
    },

    styleParticle(particle,parentSize) {
      //Size
      const size = blockVsInline.getRandomIntFromRange(4, 10);
      particle.style.height = size + "px";
      particle.style.width = size + "px";
      //Color
      particle.style.backgroundColor = `hsl(
        ${blockVsInline.getRandomIntFromRange(0, 360)},
        ${blockVsInline.getRandomIntFromRange(80, 100)}%,
        ${blockVsInline.getRandomIntFromRange(40, 60)}%)`;
      //Shpae
      switch (blockVsInline.getRandomIntFromRange(0, 5)) {
        case 0:
          particle.style.clipPath = "polygon(50% 0%, 100% 100%, 0% 100%)";
          break;
        case 1:
          particle.style.clipPath = "circle(50%)";
          break;
        case 2:
          particle.style.clipPath = "clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
          break;
        case 3:
          particle.style.clipPath = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
          break;
        case 4:
          particle.style.clipPath = "polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)";
          break;
      }
      //Position
      const X = blockVsInline.getRandomIntFromRange(parentSize.width  / 2 , parentSize.width  / -2);
      const Y = blockVsInline.getRandomIntFromRange(parentSize.height / 2 , parentSize.height / -2);
      particle.style.translate = `${X * this.magnitudeOfDisplaceMent}px ${Y * this.magnitudeOfDisplaceMent}px`;
      // Animation 
      particle.style.animationDuration = this.ANIME_DURR + "ms";

      // particle.style.
      // particle.style.
    },

    remove() {
      if(this.timeOutFunc !== null) {
        clearTimeout(this.timeOutFunc);
        this.timeOutFunc = null;
      }

      this.timeOutFunc = setTimeout(() => {
        const particles = document.querySelectorAll("#blockVsInline .particle");
        particles.forEach(ele => {ele.remove()});
      }, this.ANIME_DURR + 100);
    }

  },

  getRandomIntFromRange(a, b) {
    const min = Math.min(a, b);
    const max = Math.max(a, b);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  },


};

blockVsInline.highlightWords.button.createButton();

