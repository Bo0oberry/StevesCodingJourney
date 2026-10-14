import { random, range, sample } from 'lodash';
import './reset.css';
import './styles.css';

emojiWaterfall = {
  root: document.querySelector("emojiWrapper"),
  
  emoji: {
    confetti: {
      content: "🎉",
      speed: 0.2 ,
    },
    
    thumbsUp: {
      content: "👍",
      speed: 0.25,
    },
    
    coffeeCup: {
      content: "☕",
      speed: 0.30,
    },
    
    partyBall: {
      content: "🎊" ,
      speed: 0.27,
    },
    
    cash: {
      content: "💸",
      speed: 0.23,
    }
  }

  travelToEnd() {
    
  }
  
}