const FLEXBOX_MENU = {
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
  
  async insertNav() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    // Wait for fetchNav() to finish getting the text
    const navHtml = await this.fetchNav();
    nav.innerHTML = navHtml;
  },
  
  declareActive() {
    const currentWindow = window.locaction.pathname;
    const match = /(?<=\/)\W*(?=\.html)/gi;
    const fileNames = document.querySelectorAll("nav a");
    
    fileNames.forEach((file) => {
      const link = file.href;
      if ()
    });
    
  },
  
  pathNames: []
};

FLEXBOX_MENU.insertNav();
