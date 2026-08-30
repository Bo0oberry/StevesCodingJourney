fetch('/theOdinProject/Odin_Projects/CSS_Foundations/nav_cssFoundations.html')
    .then( res => {
        if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.text();
    })
    .then(data => {
        document.getElementById('nav').innerHTML = data;
        
        //add css file
        loadCssFile();

        //findActiveLink
        findActiveLink();
        
        // Add click event to dropdown button 
        // this adds the closed class
         const dropdownButtons = document.querySelectorAll(".dropdown-btn");
        dropdownButtons.forEach((element) => {
            element.addEventListener('click', (event) => {
                event.currentTarget.classList.toggle("open");
            });
        });
        
        const logo = document.querySelector('#logo');
        logo.addEventListener('click', (event) => {
            const open = document.querySelectorAll('#nav_cssFoundations .open');
            
            open.forEach((element) => {
                element.classList.remove('open');
            });
            event.currentTarget.classList.toggle("closed");
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

function findActiveLink(){
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll("#nav_cssFoundations a");

    navLinks.forEach(link => {
        // Parse the link's absolute URL to safely compare pathnames
        const linkPath = new URL(link.href, window.location.origin).pathname;

        if (linkPath === currentPath) {
            link.classList.add('active');
            
            // Optional: If you style the parent <li> instead of the <a> tag directly:
            // link.closest('li')?.classList.add('active');
        }
    });
}