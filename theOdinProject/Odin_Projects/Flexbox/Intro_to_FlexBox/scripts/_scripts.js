function loadAssets() {
  const stylesFolderPath = 
  "/theOdinProject/Odin_Projects/Flexbox/Intro_to_FlexBox/styles";
  
  const scriptsFolderPath = "/theOdinProject/Odin_Projects/Flexbox/Intro_to_FlexBox/scripts";
  
 const pathNames = [
   "_style",
   'header',
   "introduction",
   "lesson_overview",
   "before_we_get_started",
   "lets_flex",
   'knowledge_check'
 ];
 
 pathNames.forEach((file) => {
   const stylesFullPath = `${stylesFolderPath}/${file}.css`;
   
   const cssLink = document.createElement('link');
   cssLink.rel = "stylesheet";
   cssLink.href = stylesFullPath;
   
   const scriptsFullPath = `${scriptsFolderPath}/${file}.js`;
   const jsLink = document.createElement("script");
   jsLink.src = scriptsFullPath;
   jsLink.defer = true;
   
   document.head.append(cssLink, jsLink);
 });
}

loadAssets();