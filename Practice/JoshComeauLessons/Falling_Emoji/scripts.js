import { random, range, sample } from 'lodash';
import './reset.css';
import './styles.css';

emojiWaterfall = {
  root: document.querySelector("emojiWrapper"),
  
  emoji: {
    confetti: {
      content: "🎉",
      speed: 0.13,
    },
    
    thumbsUp: {
      content: "👍",
      speed: 0.1,
    },
    
    coffeeCup: {
      content: "☕",
      speed: 0.2,
    },
    
    partyBall: {
      content: "🎊",
      speed: 0.15,
    },
    
    cash: {
      content: "💸",
      speed: 0.12,
    }
  },
  
  getWrapperSizeHeight() {
    const wrapperSize = this.root.getBoundingClientRect();
    return wrapperSize.height;
  },
  
  getRandomEmoji() {
    const num = Math.floor(Math.random() * 4);
    let emoji = null;
    switch (num) {
      case 0:
        emoji = "confetti";
        break;
      case 1:
        emoji = "cash";
        break;
      case 2:
        emoji = "partyBall";
        break;
      case 3:
        emoji = "coffeeCup";
        break;
      case 4:
        emoji = "thumbsUp";
        break;
    }
    return emoji;
  }
  
  setEmojiFallSpeed() {
    const emoji = this.getRandomEmoji();
    const speed = this.emoji[emoji].speed;
  }
}