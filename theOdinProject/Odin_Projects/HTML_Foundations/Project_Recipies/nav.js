const navItems = document.querySelectorAll('nav ul li');
let navHoveredItem = null;
let navSetTimout = false;


navItems.forEach(element => {
  element.onmouseenter =
  ()=>{
    if (navHoveredItem != element ) {
      
    }
    
    document.querySelector('h1').innerText="test";
  }; 
});



/*
If an element is hovered om it gets moved above the rest
to prevent the other element that takes it place from immediately being activated 
*/