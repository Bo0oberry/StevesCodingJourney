const FLEXBOX_MENU = {
  
  async insertNav() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    //load Css File 
    this.addNavCssToHead();
    
    // Wait for fetchNav() to finish getting the text and insert it
    const navHtml = await this.fetchNav();
    nav.innerHTML = navHtml;
    
    // Run declareActive only AFTER the links exist in the DOM
    this.declareActive();
    
  },
  
  async fetchNav() {
    try {
      const response = await fetch("/theOdinProject/Odin_Projects/Flexbox/_flexbox_menu/menu.html");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      console.error("Could not load navigation:", error);
      return "";
    }
  },
  
  declareActive() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll("nav a");
    
    links.forEach((link) => {
      // Extract the pathname safely from the link's absolute URL
      const linkPath = new URL(link.href, window.location.origin).pathname;
      
      // Compare pathnames and toggle the active class
      if (linkPath === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  },
  
  addNavCssToHead() {
    const cssFliePath = "/theOdinProject/Odin_Projects/Flexbox/_flexbox_menu/menu.css";
    const link = document.createElement("link");
    link.href = cssFliePath;
    link.rel = "stylesheet";
    
    const head = document.querySelector('head');
    head.append(link);
  },
  
  pathNames: []
};

// Initialize the menu
FLEXBOX_MENU.insertNav();