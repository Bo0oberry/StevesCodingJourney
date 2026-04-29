fetch('/theOdinProject/Odin_Projects/CSS_Foundations/nav_cssFoundations.html')
    .then( res => {
        if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.text();
    })
    .then(data => {
        document.getElementById('nav').innerHTML = data;
        
        //add css file
        loadCssFile();
        
        // Add click event to dropdown button 
        // this adds the closed class
         const dropdownButtons = document.querySelectorAll(".dropdown-btn");
        dropdownButtons.forEach((element) => {
            element.addEventListener('click', (event) => {
                event.currentTarget.classList.toggle("closed");
            });
        });
    })
    .catch(error => console.error('Error loading navigation HTML: ', error));



function loadCssFile(){
    const link = document.createElement('link');
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = '/theOdinProject/Odin_Projects/CSS_Foundations/nav_cssFoundations.css';
    document.querySelector('head').appendChild(link);
}