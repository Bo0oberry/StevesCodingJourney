const emojiWrapper = {
  root: document.querySelector(".emojiWrapper"),
  rootSize: null,
  transformOffset: 50,
  test: document.getElementById("test"),

  emojiStats: {
    confetti: {
      content: "🎉",
      speed: 38, // px/s
      animationDuration: 5000,
    },
    thumbsUp: {
      content: "👍",
      speed: 35, // px/s
      animationDuration: 5000,
    },
    coffeeCup: {
      content: "☕",
      speed: 50, // px/s
      animationDuration: 5000,
    },
    partyBall: {
      content: "🎊",
      speed: 25, // px/s
      animationDuration: 5000,
    },
    cash: {
      content: "💸",
      speed: 30, // px/s
      animationDuration: 5000,
    },
  },

  getRandomEmoji() {
    const keys = Object.keys(this.emojiStats);
    return keys[Math.floor(Math.random() * keys.length)];
  },

  setEmojiFallSpeed() {
    if (!this.root) return;

    const wrapperRect = this.root.getBoundingClientRect();
    document.documentElement.style.setProperty("--emojiWrapper-height", wrapperRect.height + "px");
    this.rootSize = wrapperRect.height + this.transformOffset;

    for (const [key, stats] of Object.entries(this.emojiStats)) {
      stats.animationDuration = this.rootSize / stats.speed;
    }
  },

  setAnimation(target) {
    target.style.animation = "none";
    
    // Trigger reflow to restart the animation cleanly
    void target.offsetWidth;

    const emoji = this.getRandomEmoji();
    const duration = this.emojiStats[emoji].animationDuration;

    // --- PROPORTIONAL FADE CONFIGURATION ---
    // Change 0.25 to make the fade longer (e.g., 0.4 for 40%) or shorter (e.g., 0.15 for 15%)
    const fadePercentage = 0.25; 
    const fadeDuration = duration * fadePercentage;

    target.innerHTML = this.emojiStats[emoji].content;
    target.style.animationName = "fallToBottom, fadeToTransparent";
    target.style.animationDuration = `${duration}s, ${fadeDuration}s`;
    target.style.animationDelay = `0s, ${duration - fadeDuration}s`;
    target.style.animationTimingFunction = "linear"
  },

  cycleAnimation() {
    const emojiBlocks = document.querySelectorAll(".emojiWrapper .emoji");

    emojiBlocks.forEach(element => {
      this.setAnimation(element);

    
      if (!element.dataset.listenerAttached) {
        element.addEventListener("animationend", (event) => {
          if (event.animationName === "fallToBottom") {
            this.setAnimation(event.target);
          }
        });
        element.dataset.listenerAttached = "true";
      }
    });
  }
};

window.addEventListener("load", () => {
  emojiWrapper.setEmojiFallSpeed();
  emojiWrapper.cycleAnimation();
});

window.addEventListener("resize", () => {
  emojiWrapper.setEmojiFallSpeed();
});
