const assignment = {
  dom: {
    liSetup() {
      document.querySelectorAll("#assignment ol > li").forEach((liEle) => {
        this.packageTextIntoDiv(liEle);
        assignment.button.addButton(liEle, "first");
      });
    },

    packageTextIntoDiv(target) {
      const div = document.createElement("div");
      div.append(...target.childNodes);
      target.append(div);
    },

  },

  button: {

    addButton(target, append = "first") {
      const button = this.createButton();

      switch (append) {
        case "first":
          target.prepend(button);
          break;
        case "last":
          target.append(button);
          break;
      }
    },

    createButton() {
      const button = document.createElement('button');

      button.classList.add("button");
      button.innerHTML = '<span></span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e51f1f"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>';
      button.style.setProperty("--rotate", "-90deg");

      button.addEventListener("click", () => {
        const isSelected = button.classList.toggle("selected");

        button.style.setProperty("--rotate", isSelected ? "0deg" : "-90deg");
        assignment.particle.create({ target: button });
      });

      return button;
    },
  },

  particle: {
    defaultParticle: {
      amount: "random",
      color: "random",
      size: "random",
      shape: "circle",
      magnitude: [.8, 1.2],
      animate: "dispersePolar",
      animateTime: 4000,
      target: null
    },

    create(particleStyles = {}) {
      const styles = { ...this.defaultParticle, ...particleStyles };
      const particles = [];

      //Amount of Particles Generated
      if (styles.amount === "random") {
        styles.amount = this.getRandomFromRange(5, 15);
      }

      for (let i = 0; i < styles.amount; i++) {
        const particle = document.createElement("span");
        particle.classList.add("particle");

        particles.push(particle);
      }


      //set Particle property values
      this.setParticleStyles(particles, styles);


      //Set Movement
      if (typeof this[styles.animate] === "function") {
        this[styles.animate](particles, styles);
      }

      //Add Particles to Target
      particles.forEach(particle => styles.target.appendChild(particle));

      //Destroy Particles
      this.destroy(particles,styles);
    },

    setParticleStyles(particles, styles) {

      if (styles.color === "random" || !CSS.supports("color", styles.color)) {
        styles.color = this.randomColor();
      }

      if (styles.size === "random" || typeof styles.size !== "number") {
        styles.size = this.getRandomFromRange(5, 12) + "px";
      }

      particles.forEach(particle => {
        if (CSS.supports("color", styles.color)) {
          particle.style.backgroundColor = styles.color;
        } else {
          particle.style.backgroundColor = this.randomColor();
        }

        if (typeof styles.size === "number") {
          particle.style.height = styles.size;
          particle.style.width = styles.size;
        } else {
          particle.style.height = this.getRandomFromRange(5, 12) + "px";
          particle.style.width = particle.style.height;
        }
      });
    },

    dispersePolar(particles, styles) {
      const angle = 360 / styles.amount;
      const jitter = 15;

      const targetSize = (styles.target.getBoundingClientRect().height + styles.target.getBoundingClientRect().width) / 2;


      for (let i = 0; i < styles.amount; i++) {
        const travelDistance = this.getRandomFromRange(targetSize / 2 * styles.magnitude[0], targetSize / 2 * styles.magnitude[1]);

        const angleRad = ((angle * i) + this.getRandomFromRange(jitter, -jitter)) * ( Math.PI / 180);

        const x = Math.cos(angleRad) * travelDistance;
        const y = Math.sin(angleRad) * travelDistance;

        particles[i].style.setProperty("--x", x + "px");
        particles[i].style.setProperty("--y", y + "px");
        particles[i].style.animationDuration = styles.animateTime + "ms";
        particles[i].classList.add("dispersePolar");

      }
    },

    destroy(particles, styles) {
      window.setTimeout(()=>{
        particles.forEach(particle => particle.remove());
      }, styles.animateTime + 100);
    },

    randomColor() {
      return `hsl(${Math.floor(Math.random() * 360)}, 80%, 80%)`;
    },

    getRandomFromRange(a, b) {
      const min = Math.min(a, b);
      const max = Math.max(a, b);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },

  setup() {
    this.dom.liSetup();
  }
}

assignment.setup();